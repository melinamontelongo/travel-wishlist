import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsListComponent } from "./bookings-list/bookings-list.component" 
import { BookingsDetailsComponent } from "./bookings-details/bookings-details.component";
const routes: Routes = [
  {path: "bookings", component: BookingsListComponent},
  {path: "bookings/:id", component: BookingsDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
