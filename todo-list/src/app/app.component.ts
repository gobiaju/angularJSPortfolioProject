import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-list';
  tasks = [
    "program in kotlin",
    "program in python",
    "program in C-sharp",
    "program in C++",
   "learn data structures and algorithms"
  ]

  add(newTask: string){
    alert(newTask)
  }
}
