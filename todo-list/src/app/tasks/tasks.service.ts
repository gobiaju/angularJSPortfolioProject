import { Injectable } from '@angular/core';
import { NewTask } from './New-task.dto';
import { TaskItem } from './Task-item.dto';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//create a variable to hold the url...kind of makes the code cleaner
const resourceURL = 'http://localhost:3001/tasks';
@Injectable() //an angular decorator to make the httpClient work
export class TasksService {
  constructor(private httpClient: HttpClient) {}

  private tasks = new BehaviorSubject<TaskItem[]>([]);
  //Observable makes the getAllTasks method run asynchronously so that we dont lose the reference memory address
  getAllTasks(date: Date): Observable<TaskItem[]> {
    this.httpClient
      .get<TaskItem[]>(`${resourceURL}/${date}`)
      .pipe(map(TasksService.mapTaskItems))
      .subscribe((t) => this.tasks.next(t));
    return this.tasks;
  }
  //what the mapTaskItem does is that it maps items that has json  format in the server, maps each item in the items such that each item is a new task item
  private static mapTaskItems(items: { title: string }[]) {
    return items.map((item) => new TaskItem(item.title));
  }
  addTask(date: Date, newTask: NewTask) {
    //using .concat() we append a new item to the tasks array
    var unpdatedTasks = this.tasks.value.concat(new TaskItem(newTask.title));
    this.httpClient
      .post(`${resourceURL}/${newTask.date}`, newTask)
      .subscribe(() => this.tasks.next(unpdatedTasks));
  }
  removeTask(date: Date, existingTask: TaskItem) {
    var updatedTasks = this.tasks.value.filter((task) => task != existingTask);
    this.httpClient
      .delete(`${resourceURL}/${date}/${existingTask.title}`)
      .subscribe(() => this.tasks.next(updatedTasks));
  }
}
