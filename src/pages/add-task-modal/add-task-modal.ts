
import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import {TodoModel} from '../../shared/todo-model';
/**
 * Generated class for the AddTaskModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-task-modal',
  templateUrl: 'add-task-modal.html',
})
export class AddTaskModalPage {

  public model = new TodoModel('');
  public title:string = "Add new task";
  public buttonText:string = "ADD";

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    if(this.navParams.get('todo')){
      this.model = TodoModel.clone(this.navParams.get('todo'));
      this.title = "Edit task";
      this.buttonText = "Save changes";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskModalPage');
  }

  submit(){
    this.viewCtrl.dismiss(this.model);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
