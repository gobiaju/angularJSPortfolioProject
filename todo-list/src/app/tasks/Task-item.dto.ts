//The Task class has a constructor that has an argument title of tyoe string
//It also has a property isDone that is set to false this is used to convert the status of all tasks to true when marked as done
export class TaskItem {
  constructor(public title: string) {}
  //The markAsDone method takes in a variable task of type Task and sets the isDone property of the Task clas to true
  //it also alerts the user that the task is done
  toggleIsDone() {
    alert('the task: ' + this.title + ' is done');
    this.isDone = !this.isDone; //this toggles the done button to set it to what ever status it is
  }
  public isDone = false;
}
