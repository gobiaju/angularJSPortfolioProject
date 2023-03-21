import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
//always remember to add the implements OnInit and others
export class TaskListComponent implements OnInit {    
  constructor(private route: ActivatedRoute) {}
  newTaskTitle: string = ""
  date: Date = new Date()
  //ngOnInit taps into the interface of the lifecycle of a comoponent
  //ngOnInit is called once after the component has been initialized
  //to learn more: https://angular.io/guide/lifecycle-hooks
  ngOnInit(): void {
    this.date = new Date(this.route.snapshot.params['date'])
  }

  tasks: Task [] = [
    new Task("program in kotlin"),
    new Task("program in python"),
    new Task("program in C-sharp"),
    new Task("program in C++"),
   new Task("learn data structures and algorithms")
  ]

  // the add method takes in an argument of newTask and pushes it to the task array. The push method takes in an argument of type Task
  add(taskNgForm: NgForm){  //NgForm is a container for multiple form contols for input to track its values
    if (taskNgForm.touched == false)
      return;
   // if (taskNgForm.valid == false)
   //  return;
    this.tasks.push(new Task(this.newTaskTitle))
    alert(this.newTaskTitle + " added to list of tasks") 
    taskNgForm.reset({date: this.date})
    
  }
  remove(existingTask: Task){
   var userConfirmed = confirm(`are you sure that you want to remove the following task? \n " ${existingTask.title}"`)
   //in the if statment, we are saying that if the the user confrimed that they want to remove the task, 
   //then we use the filter method to filter the selected task (saved in the existingTask variable) and save the filtered array back into the task array
   if(userConfirmed){
    this.tasks = this.tasks.filter(task => task != existingTask)
   }
  }

}
//The Task class has a constructor that has an argument title of tyoe string
//It also has a property isDone that is set to false this is used to convert the status of all tasks to true when marked as done
class Task{
  constructor(public title: string){

  }
  //The markAsDone method takes in a variable task of type Task and sets the isDone property of the Task clas to true
  //it also alerts the user that the task is done
  toggleIsDone(){
    alert('the task: ' + this.title + ' is done')
    this.isDone = !this.isDone //this toggles the done button to set it to what ever status it is
  }
  public isDone = false
}
