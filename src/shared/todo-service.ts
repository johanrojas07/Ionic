import { TodoModel } from './todo-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoServiceProvider {
  private todos: TodoModel[] = [];

  constructor(public http: HttpClient,
    public local :Storage) {
  }

  public loadFromList(id:number){
    this.getFromLocal(id);    
  }

  private getFromLocal(id:number){
    return this.local.ready().then(()=>{
      return this.local.get(`list/${id}`).then(
        data => {
          if (!data){
            this.todos = [];
            return;
          }
          let localTodos:TodoModel[] =[];
          for(let todo of data){
            localTodos.push(new TodoModel(todo.description,todo.isImportant, todo.isDone));
          }
          this.todos = localTodos;
        }
      )
    })
  }

  public saveLocally(id:number){
    this.local.ready().then(()=>{
      this.local.set(`list/${id}`, this.todos);
    })
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
  
      let isDone = !todo.isDone;
      const todoIndex = this.todos.indexOf(todo);
      let updateTodo = new TodoModel(todo.description, todo.isImportant, isDone);
      this.todos = [
        ...this.todos.slice(0, todoIndex),
        updateTodo,
        ...this.todos.slice(todoIndex+1)
      ];
       
  }

}
