import { APP_INITIALIZER, Injectable, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TravelDestinationComponent } from './components/travel-destination/travel-destination.component';
import { DestinationsListComponent } from './components/destinations-list/destinations-list.component';
import { DestinationDetailComponent } from './components/destination-detail/destination-detail.component';
import { TravelDestinationFormComponent } from './components/travel-destination-form/travel-destination-form.component';
/* import { DestinationsApiClient } from './models/destinations-api-client.model'; */
import { initializeTravelDestinationState, InitMyDataAction, TravelDestinationEffects, TravelDestinationReducer, TravelDestinationState } from './models/travel-destination-state.model';
import { ActionReducerMap, StoreModule as NgRxStoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from "@angular/common/http";
import Dexie from "dexie";
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core/public_api';
import { NgxMapboxGLModule } from "ngx-mapbox-gl"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { LoggedUserGuard } from './guards/logged-user/logged-user.guard';
import { AuthService } from './services/auth.service';
import { FlightsComponentComponent } from './components/flights/flights-component/flights-component.component';
import { FlightsMainComponentComponent } from './components/flights/flights-main-component/flights-main-component.component';
import { FlightsInfoComponentComponent } from './components/flights/flights-info-component/flights-info-component.component';
import { FlightsDetailsComponentComponent } from './components/flights/flights-details-component/flights-details-component.component';
import { BookingsModule } from './bookings/bookings.module';
import { TravelDestination } from './models/travel-destination.model';
import { flatMap, from, Observable } from 'rxjs';
import { EspiameDirective } from './espiame.directive';
import { TrackClickDirective } from './track-click.directive';

//init routing
export const childrenRoutesFlights: Routes = [
  { path: "", redirectTo: "main", pathMatch: "full" },
  { path: "main", component: FlightsMainComponentComponent },
  { path: "info", component: FlightsDetailsComponentComponent },
  { path: ":id", component: FlightsDetailsComponentComponent }
]

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DestinationsListComponent },
  { path: 'destination', component: DestinationDetailComponent },
  { path: "login", component: LoginComponent },
  { path: "protected", component: ProtectedComponent, canActivate: [LoggedUserGuard] },
  { path: "flights", component: FlightsComponentComponent, canActivate: [LoggedUserGuard], children: childrenRoutesFlights }
]
//end routing

//dexie db init
export class Translation {
  key: any;
  constructor(public id: number, public lang: string, public value: string) { }
}

@Injectable({ providedIn: "root" })
export class MyDatabase extends Dexie {
  destinations: Dexie.Table<TravelDestination, number>;
  translations: Dexie.Table<Translation, number>;
  constructor() {
    super("MyDatabase");
    this.version(1).stores({
      destinations: "++id, name, desc"
    });
    //migración o versionado de bases de datos
    this.version(2).stores({
      destinations: "++id, name, desc",
      translation: "++id, lang, key, value"
    });
  }
}
export const db = new MyDatabase();
//end dexie db

//i18n init
class TranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {
    const promise = db.translations
      .where("lang")
      .equals(lang)
      .toArray()
      .then(results => {
        if (results.length === 0) {
          return this.http
            .get<Translation[]>(APP_CONFIG_VALUE.apiEndpoint + "/api/translation?lang=" + lang)
            .toPromise()
            .then(apiResults => {
              db.translations.bulkAdd(apiResults);
              return apiResults;
            });
        }
        return results;
      }).then((translations) => {
        console.log("loaded translations: ");
        console.log(translations);
        return translations;
      }).then((translations) => {
        return translations.map((t) => ({ [t.key]: t.value }))
      });
    return from(promise).pipe(flatMap((elems) => from(elems)));
  }
}

function HttpLoaderFactory(http: HttpClient) {
  return new TranslationLoader(http);
}

//i18n end

//app config start
export interface AppConfig {
  apiEndpoint: String;
};
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: "http://localhost:3000"
};
export const APP_CONFIG = new InjectionToken<AppConfig>("app.config");
//end app config

//Redux init start
export interface AppState {
  destinations: TravelDestinationState;
}

const reducers: ActionReducerMap<AppState> = {
  destinations: TravelDestinationReducer
}

const reducersInitialState = {
  destinations: initializeTravelDestinationState()
}
//Redux init end

//app init
export function init_app(appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.initializeTravelDestinationState();
}
@Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>, private http: HttpClient) { }
  async initializeTravelDestinationState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({ "X-API-TOKEN": "security-token" });
    const req = new HttpRequest("GET", APP_CONFIG_VALUE.apiEndpoint + "/my", { headers: headers });
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}
//app init end

@NgModule({
  declarations: [
    AppComponent,
    TravelDestinationComponent,
    DestinationsListComponent,
    DestinationDetailComponent,
    TravelDestinationFormComponent,
    LoginComponent,
    ProtectedComponent,
    FlightsComponentComponent,
    FlightsMainComponentComponent,
    FlightsInfoComponentComponent,
    FlightsDetailsComponentComponent,
    EspiameDirective,
    TrackClickDirective,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState }),
    EffectsModule.forRoot([TravelDestinationEffects]),
    StoreDevtoolsModule.instrument(),
    BookingsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    NgxMapboxGLModule,
    BrowserAnimationsModule
  ],
  providers: [
    /* DestinationsApiClient, */
    AuthService,
    LoggedUserGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    /* app initializer es un injection token provisto por angular para vincular codigo al inicio de una app */
    AppLoadService, { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
    MyDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
