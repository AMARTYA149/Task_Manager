import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  lists: List[];
  tasks: Task[];
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    });

    this.route.params.subscribe((params: Params) => {
      // console.log(params);
      this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    });
  }

  onTaskClick(task: Task) {
    //we want to set the task to complete
    this.taskService.complete(task).subscribe(() => {
      console.log('completed success');
    });
  }
}
