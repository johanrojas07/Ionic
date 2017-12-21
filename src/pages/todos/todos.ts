import { TodoModel } from './../../shared/todo-model';
import { TodoServiceProvider } from './../../shared/todo-service';
import { AddTaskModalPage } from '../add-task-modal/add-task-modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the TodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html'  
})
export class TodosPage {

  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl:ModalController,
    public todoServiceProvider : TodoServiceProvider) {}

  ionViewDidLoad() {}

    
  setTodoStyles(item:TodoModel){

    let styles = {
      'text-decoration': item.isDone ? 'line-through' : 'none',
      'font-weight': item.isImportant ? '600' : 'normal'
    }
      return styles;
  }

  toogleTodo(todo:TodoModel){
    this.todoServiceProvider.toogleTodo(todo);
  }

  removeTodo(todo:TodoModel){
    this.todoServiceProvider.removeTodo(todo);
  }

  showEditTodo(todo: TodoModel){
    let modal = this.modalCtrl.create(AddTaskModalPage, {todo});
    modal.present();

    modal.onDidDismiss(data=>{
      if(data){
        this.todoServiceProvider.updateTodo(todo, data);

      }
    });
  }
  showAddTodo(){
    let modal = this.modalCtrl.create(AddTaskModalPage);
    modal.present();
    modal.onDidDismiss(data=>{
      if(data){
        this.todoServiceProvider.addTodo(data);
      }
    });
  }
}
