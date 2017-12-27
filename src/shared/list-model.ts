export class ListModel{
    constructor(
        public name:string,
        public id:number
    ){}

    static fromJson(data:any){
        if(!data.name || ! data.id)
        throw(new Error("Invalid arguments"));

        return new ListModel(data.name, data.id);
    }
}