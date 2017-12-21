import { NgModule } from '@angular/core';
import { PrioritizedTodosPiPePipe } from './prioritized-todos-pi-pe/prioritized-todos-pi-pe';
import { DoneTodosPipe } from './done-todos/done-todos';

@NgModule({
	declarations: [PrioritizedTodosPiPePipe,
    DoneTodosPipe],
	imports: [],
	exports: [PrioritizedTodosPiPePipe,
    DoneTodosPipe]
})
export class PipesModule {}
