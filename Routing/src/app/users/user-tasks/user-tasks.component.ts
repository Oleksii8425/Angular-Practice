import { Component, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import {
  RouterOutlet,
  RouterLinkWithHref,
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLinkWithHref],
})
export class UserTasksComponent {
  userId = input.required<string>();
  message = input.required<string>();
  private usersService = inject(UsersService);

  username = computed(
    () => this.usersService.users.find((u) => u.id === this.userId())?.name,
  );

  // Dynamic data
  // username = input.required<string>();

  // Observables approach
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  // username = '';

  // ngOnInit() {
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.username =
  //         this.usersService.users.find((u) => u.id === paramMap.get('userId'))
  //           ?.name || '';
  //     },
  //   });
  //
  //   this.destroyRef.onDestroy(() => subscription.unsubscribe(););
  // }
}

export const resolveUsername: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  const usersService = inject(UsersService);
  const username =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId'),
    )?.name || '';
  return username;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  routerState,
) => {
  return resolveUsername(activatedRoute, routerState) + "'s Tasks";
};
