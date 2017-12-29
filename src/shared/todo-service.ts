import { TodoModel } from './todo-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppSettings } from './app-settings';

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
    this.getFromLocal(id).then(()=>{
      this.loadFromServer(id);
    }) 
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
            localTodos.push(TodoModel.clone(todo));
          }
          this.todos = localTodos;
        }
      )
    })
  }

  private loadFromServer(id:number){
    this.http.get(`${AppSettings.API_ENDPOINT}/lists/${id}/todos`)
    // .map(todos:Object[] => {
    //   return todos.map(item => TodoModel.fromJson(item));
    // } )
    .subscribe(
      (result:TodoModel[]) =>{
        this.todos = result;
        this.saveLocally(id);
      },
      error =>{ console.log("Error loading lists from serve"),error}
    )
  }

  private postNewTodoToServer(todo:TodoModel): Observable<TodoModel>{
    let observable = this.http.post(`${AppSettings.API_ENDPOINT}/lists/${todo.listId}/todos`, 
  {
    description: todo.description,
    isImportant: todo.isImportant,
    isDone: todo.isDone
  })
    .map(todo => TodoModel.fromJson(todo))
    .share();

    return observable;
  }

  private updateTodoInServer(todo:TodoModel): Observable<TodoModel>{
    let observable = this.http.put(`${AppSettings.API_ENDPOINT}/todos/${todo.id}`, 
  {
    description: todo.description,
    isImportant: todo.isImportant,
    isDone: todo.isDone,
    listId: todo.listId
  })
    .map(todo => TodoModel.fromJson(todo))
    .share();

    return observable;
  }

  private deleteTodoFromServer(id:number){
    let observable = this.http.delete(`${AppSettings.API_ENDPOINT}/todos/${id}`)
    .share();

    return observable;
  }
  public saveLocally(id:number){
    this.local.set(`list/${id}`, JSON.stringify(this.todos));

    /*this.local.ready().then(()=>{
      this.local.set(`list/${id}`, this.todos);
    })*/
  }

  addTodo(todo:TodoModel){
    let observable = this.postNewTodoToServer(todo);

    observable.subscribe(
      (todo:TodoModel) =>{
        this.todos = [...this.todos, todo];
        this.saveLocally(todo.listId);
      },
      error => console.log("Error trying to post a new list")
    );

    return observable;
  }

  removeTodo(todo:TodoModel){
    this.deleteTodoFromServer(todo.id).subscribe(
      ()=>{
        const index= this.todos.indexOf(todo);
        this.todos = [
      ...this.todos.slice(0, index),
      ...this.todos.slice(index+1)];
      this.saveLocally(todo.listId);
      },
      error => console.log("An error ocurred while triying to remove the todo", todo)
    );
    
  }

  updateTodo(originalTodo:TodoModel, modifiedTodo:TodoModel):Observable<TodoModel>{
    let observable = this.updateTodoInServer(modifiedTodo);

    observable.subscribe((todo:TodoModel) => {
      const index = this.todos.indexOf(originalTodo);
      this.todos=[
        ...this.todos.slice(0,index),
        todo,
        ...this.todos.slice(index+1)];
    },
  error => console.log("Error trying to update todo item")
  );

    return observable;
  }

  toogleTodo(todo:TodoModel){
      let updateTodo = TodoModel.clone(todo);
      updateTodo.isDone = ! todo.isDone;
      
      return this.updateTodo(todo, updateTodo).subscribe(
        ()=>{}, 
        ()=>{this.loadFromList(todo.listId)}
    )       
  }

}
