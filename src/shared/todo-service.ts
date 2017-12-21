import { Platform } from 'ionic-angular';
import { TodoModel } from './todo-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoServiceProvider {
  private todos: TodoModel[];

  constructor(public http: HttpClient,
  private platform:Platform) {
     this.getTodos();
  }

  getTodos(){
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
    ];
  }

  addTodo(todo:TodoModel){
    this.todos = [...this.todos, todo];
  }

  removeTodo(todo:TodoModel){
    const index= this.todos.indexOf(todo);
    this.todos = [
      ...this.todos.slice(0, index),
      ...this.todos.slice(index+1)];
  }

  updateTodo(originalTodo:TodoModel, modifiedTodo:TodoModel){
    const index = this.todos.indexOf(originalTodo);
    this.todos=[
      ...this.todos.slice(0,index),
      modifiedTodo,
      ...this.todos.slice(index+1)];
  }

  toogleTodo(todo:TodoModel){
    setTimeout(()=>{
      let isDone = !todo.isDone;
      const todoIndex = this.todos.indexOf(todo);
      let updateTodo = new TodoModel(todo.description, todo.isImportant, isDone);
      this.todos = [
        ...this.todos.slice(0, todoIndex),
        updateTodo,
        ...this.todos.slice(todoIndex+1)
      ];
    },this.platform.is('ios') ? 0 : 300);    
  }

}
