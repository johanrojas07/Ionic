import { ListModel } from './../../shared/list-model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { TodosPage } from '../todos/todos';
import { ListServiceProvider } from './../../shared/list-service';

/**
 * Generated class for the ListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',

})
export class ListsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl:AlertController,
public listsService:ListServiceProvider,
    private loadingCtrl:LoadingController
) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListsPage');
  }

  goToList(list:ListModel){
    this.navCtrl.push(TodosPage, {list});
  }

  addNewList(name:string){
    let loader = this.loadingCtrl.create();
    loader.present();
    this.listsService.addList(name)
    .subscribe(list => {
      this.goToList(list);
      loader.dismiss();
    }, error => {loader.dismiss();});
        
  }

  showAddList(){
    let addListAlert = this.alertCtrl.create({
      title: 'New List',
      message: 'Give a name to the new list',
      inputs: [
        {
         name: 'name',
         placeholder: 'Name' 
        }
      ],
      buttons:[
        {
        text: 'Cancel',
        handler: data => {}
        },
        {
          text: 'Add',
          handler: data =>{
            let navTransition = addListAlert.dismiss();
            console.log("!!!!!!");
            navTransition.then(()=>{this.addNewList(data.name)});
          }
        }
      ]

    });

    addListAlert.present();

  }

}
