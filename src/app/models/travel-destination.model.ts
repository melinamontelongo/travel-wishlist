export class TravelDestination{
    private selected!: boolean;
    public services: string[];
    constructor(public name: string, public url: string, public description: string){
        this.services = ['Swimming pool', 'Lunch']
    }
    isSelected(): boolean {
        return this.selected;
    } 
    setSelected(s: boolean){
        this.selected = s;
    }
}