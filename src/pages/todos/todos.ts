import { ListModel } from './../../shared/list-model';
import { TodoModel } from './../../shared/todo-model';
import { TodoServiceProvider } from './../../shared/todo-service';
import { AddTaskModalPage } from '../add-task-modal/add-task-modal';
import { Component } from '@angular/core';
import { IonicPage, ModalController, Platform, NavParams, LoadingController} from 'ionic-angular';


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

  private toogleTodoTimeout = null;
  private list:ListModel;  

  constructor(
     private modalCtrl:ModalController,
    private todoServiceProvider : TodoServiceProvider,
    private platform : Platform,
    private navParams :NavParams,
    private loadingCtrl : LoadingController
  ) {
      this.list = this.navParams.get('list');
      this.todoServiceProvider.loadFromList(this.list.id);
    }

  ionViewDidLoad() {}

  ionViewWillUnload() {
    this.todoServiceProvider.saveLocally(this.list.id);
  }

    
  setTodoStyles(item:TodoModel){

    let styles = {
      'text-decoration': item.isDone ? 'line-through' : 'none',
      'font-weight': item.isImportant ? '600' : 'normal'
    }
      return styles;
  }

  toogleTodo(todo:TodoModel){
    if(this.toogleTodoTimeout)
      return;

    this.toogleTodoTimeout = setTimeout(()=>{
      this.todoServiceProvider.toogleTodo(todo);
      this.toogleTodoTimeout = null;
    },this.platform.is('ios') ? 0 : 300); 
  }

  removeTodo(todo:TodoModel){
    this.todoServiceProvider.removeTodo(todo);
  }

  AddTodo(todo:TodoModel){
    let loader = this.loadingCtrl.create();
    loader.present();
    this.todoServiceProvider.addTodo(todo)
    .subscribe(()=> loader.dismiss(), ()=>loader.dismiss());
  }

  showEditTodo(todo: TodoModel){
    let modal = this.modalCtrl.create(AddTaskModalPage, {todo});
    modal.present();

    modal.onDidDismiss(data=>{
      if(data){
        this.updateTodo(todo, data);
      }
    });
  }

  updateTodo(originalTodo:TodoModel, modifiedTodo:TodoModel){
    let loader = this.loadingCtrl.create();
    loader.present();
    this.todoServiceProvider.updateTodo(originalTodo, modifiedTodo)
    .subscribe(()=>loader.dismiss(), ()=>loader.dismiss());    
  }

  showAddTodo(){
    let modal = this.modalCtrl.create(AddTaskModalPage, {listId:this.list.id});
    modal.present();

    modal.onDidDismiss(data=>{
      if(data){
        this.AddTodo(data);
      }
    });
  }
}
