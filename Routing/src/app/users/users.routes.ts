import { Routes } from '@angular/router';

import { TasksComponent, resolveUserTasks } from '../tasks/tasks.component';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from '../tasks/new-task/new-task.component';
import { resolveTitle } from './user-tasks/user-tasks.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
    title: 'No task selected',
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    component: TasksComponent,
    // by default, resolvers are only executed when params change
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks,
    },
    title: resolveTitle,
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    // A guard to make sure that unintended changes are prevented before they're initialized
    canDeactivate: [canLeaveEditPage],
  },
];
