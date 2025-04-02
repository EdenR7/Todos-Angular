import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCreatedBy',
  standalone: true,
})
export class FormatCreatedByPipe implements PipeTransform {
  transform(
    username: string | undefined,
    loggedInUsername: string | undefined
  ): string {
    if (!username || !loggedInUsername) return username || '';
    return username === loggedInUsername ? 'You' : username;
  }
}

// <p>Created by: {{ todo.user.username | createdBy:loggedInUser.username }}</p>
