import { TodoModel } from './../../shared/todo-model';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PrioritizedTodosPiPePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'prioritizedTodosPiPe'
})
export class PrioritizedTodosPiPePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(todos: TodoModel[]) {
    console.log("prioritizedTodosPiPe todos pipe");
    return todos.filter(todo=>!todo.isDone).sort((a, b) => (b.isImportant && !a.isImportant) ? 1 : -1);
  }
}

