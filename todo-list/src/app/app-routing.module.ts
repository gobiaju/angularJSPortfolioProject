import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderComponent } from './calender/calender.component';
import { TaskListComponent } from './tasks/task-list.component';

const routes: Routes = [
  { component: CalenderComponent, path: '' },
  { component: TaskListComponent, path: 'task-list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
