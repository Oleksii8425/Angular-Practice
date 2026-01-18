import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { routes as userRoutes } from './users/users.routes';
import {
  resolveUsername,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();

  if (shouldGetAccess < 0.5) {
    return true;
  }

  return new RedirectCommand(router.parseUrl('/unathorized'));
};

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    canMatch: [dummyCanMatch],
    data: {
      // Static data
      message: 'Hello',
    },
    resolve: {
      // Dynamic (resolved) data
      username: resolveUsername,
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
