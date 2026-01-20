import { Routes } from '@angular/router';

import { resolveUserTasks } from '../tasks/tasks.component';
import {
  NewTaskComponent,
  canLeaveEditPage,
} from '../tasks/new-task/new-task.component';
import { TasksService } from '../tasks/tasks.service';

export const routes: Routes = [
  {
    path: '',
    // TasksService is loaded lazily since the whole route is loaded lazily in app.routes.ts file
    providers: [TasksService],
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks',
        // eager loading
        // component: TasksComponent,
        loadComponent: () =>
          // lazy loading
          import('../tasks/tasks.component').then(
            (module) => module.TasksComponent,
          ),
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage],
      },
    ],
  },
];
