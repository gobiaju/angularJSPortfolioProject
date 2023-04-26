//creating a task only for the purpose of creating a new task
export class NewTask {
  constructor(public title: string = '', public date: Date = new Date()) {}
}
