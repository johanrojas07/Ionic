import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListModel } from './list-model';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { AppSettings } from './app-settings'

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
    let list = new ListModel(name, this.lists.length);
    this.lists = [...this.lists, list];
    return list;
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
    .map(response => {return response.json()})
    .map((lists:Object[]) =>{
      return lists.map(item => ListModel.fromJson(item));
    })
    .subscribe(
      (result:ListModel[]) =>{
        this.lists = result;
        this.saveLocally();
      },
      error => {
        console.log("Error", error);
      }
    )
  }

  public saveLocally(){
    this.local.set('lists', JSON.stringify(this.lists));
  }

}
