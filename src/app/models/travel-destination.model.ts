import { v4 as uuidv4 } from 'uuid';

export class TravelDestination{
    private selected!: boolean;
    public services: string[];
    public id: string;
    constructor(public name: string, public url: string, public description: string, public votes: number = 0){
        this.services = ['Swimming pool', 'Lunch']
        this.id = uuidv4();
    }
    isSelected(): boolean {
        return this.selected;
    } 
    setSelected(s: boolean){
        this.selected = s;
    }
    voteUp(){
        this.votes++;
    }
    voteDown(){
        this.votes--;
    }
}