import { AddTaskModalPage } from '../add-task-modal/add-task-modal';
import { TodoModel } from '../../shared/todo-model';
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
  templateUrl: 'todos.html',
})
export class TodosPage {

  public todos: TodoModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
    this.todos = [
      new TodoModel("This es my 1element"),
      new TodoModel("This es my 2element"),
      new TodoModel("This es my 3element"),
      new TodoModel("This es my 4element", true),
      new TodoModel("This es my 5element"),
      new TodoModel("This es my 6element", true),
      new TodoModel("This es my 7element", true),
      new TodoModel("This es my 8element", false, true),
      new TodoModel("This es my 9element", false, true),
      new TodoModel("This es my 10element", false, true),
      new TodoModel("This es my 11element", false),
      new TodoModel("This es my 12element", false, true),
      new TodoModel("This es my 13element", false, true),
      new TodoModel("This es my 14element", false),
      new TodoModel("This es my 15element", false, true),
      new TodoModel("This es my 16element", true),
      new TodoModel("This es my 17element", false, true)
    ]
  }

    
  setTodoStyles(item:TodoModel){

    let styles = {
      'text-decoration': item.isDone ? 'line-through' : 'none',
      'font-weight': item.isImportant ? '600' : 'normal'
    }
      return styles;
  }

  toogleTodo(todo:TodoModel){
    todo.isDone = ! todo.isDone;
  }

  addTodo(todo:TodoModel){
    this.todos.push(todo);
  }

  showAddTodo(){
    let modal = this.modalCtrl.create(AddTaskModalPage);
    modal.present();
    modal.onDidDismiss(data=>{
      if(data){
        this.addTodo(data);
      }
    });
  }
}
