import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListModel } from './list-model';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { AppSettings } from './app-settings'
import { Observable } from 'rxjs/Rx';




/*
  Generated class for the ListServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListServiceProvider {

  public lists:ListModel[] = [];

  constructor(public http: HttpClient, public local:Storage) {
    this.getLists();
  }

  private getLists(){
    this.getFromLocal()
    .then(()=> {this.getFromServer()}, 
          ()=> {this.getFromServer()});
  }

  public addList(name:string){
    let observable = this.postNewListToServer(name);

    observable.subscribe(
      (list: ListModel) =>{
        this.lists = [...this.lists, list];
        this.saveLocally();
      },
      error => console.log("Errxor trying to post a new list to the serve")
    );

    return observable;
  }

  public getFromLocal(){     
       return this.local.get('lists').then(
        data => {
          let localList:ListModel[]=[];
          if(data){
            data = JSON.parse(data);
            for(let list of data){
              localList.push(new ListModel(list.name, list.id));
            }
          }
          this.lists = localList;
        }
          
    );
  } 

  private getFromServer(){
    this.http.get(`${AppSettings.API_ENDPOINT}/lists`)
    // .map((response: any) => {return response.json()})
    // .map((lists:Object[]) =>{
    //  return lists.map(item => ListModel.fromJson(item));
    // })
    .subscribe(
      (result:ListModel[]) =>{
        console.log("result", result);
        this.lists = result;
        this.saveLocally();
      },
      error => {
        console.log("Error loading lists from server", error);
      }
    )
  }

  private postNewListToServer(name): Observable<ListModel> {
    let observable = this.http.post(`${AppSettings.API_ENDPOINT}/lists`,{name})
    .share()
    
    //.map(response => response.json())
    .map(list => ListModel.fromJson(list));

    observable.subscribe(()=>{}, ()=>{});
    return observable;
    
  }

  private deleteListFromServer(id:number){
    let observable = this.http.delete(`${AppSettings.API_ENDPOINT}/lists/${id}`)
      //.map(response => response.json())
      .share();

      return observable;
  }

  public saveLocally(){
    this.local.set('lists', JSON.stringify(this.lists));
  }

  public removeList(list:ListModel){
    this.deleteListFromServer(list.id).subscribe(
      ()=>{
        let index = this.lists.indexOf(list);
        this.lists = [...this.lists.slice(0,index), ...this.lists.slice(index+1)];
        this.saveLocally();
      },
      (error) => {console.log(`an error ocurred while triying: ${list.name}`);}
    )
  }

}
