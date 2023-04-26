import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { NewTask } from './New-task.dto';
import { TaskItem } from './Task-item.dto';
import { TasksService } from './tasks.service';
@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
//always remember to add the implements OnInit and others
export class TaskListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private taskService: TasksService //add this to the constuctor makes it possible for the instance of the task service to be shared by angular
  ) {}

  tasks = this.taskService.getAllTasks(this.route.snapshot.params['date']);
  newTask: NewTask = new NewTask();

  //ngOnInit taps into the interface of the lifecycle of a comoponent
  //ngOnInit is called once after the component has been initialized
  //to learn more: https://angular.io/guide/lifecycle-hooks
  ngOnInit(): void {
    var strDate = this.route.snapshot.params['date'];
    this.newTask = new NewTask(this.newTask.title, new Date(strDate));
  }

  // the add method takes in an argument of newTask and pushes it to the task array. The push method takes in an argument of type Task
  add(taskNgForm: NgForm) {
    //NgForm is a container for multiple form contols for input to track its values
    if (taskNgForm.touched == false) return;
    // if (taskNgForm.valid == false)
    //  return;
    this.taskService.addTask(this.newTask.date, this.newTask);
    alert(this.newTask.title + ' added to list of tasks');

    taskNgForm.reset({ date: this.newTask.date });
  }
  remove(existingTask: TaskItem) {
    var userConfirmed = confirm(
      `are you sure that you want to remove the following task? \n " ${existingTask.title}"`
    );
    //in the if statment, we are saying that if the the user confrimed that they want to remove the task,
    //then we use the filter method to filter the selected task (saved in the existingTask variable) and save the filtered array back into the task array
    if (userConfirmed) {
      this.taskService.removeTask(this.newTask.date, existingTask);
    }
  }
}
