import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export function createDebouncer<T>(debounceMs = 300) {
  const subject = new Subject<T>();

  const debounced$ = subject.pipe(debounceTime(debounceMs));

  return {
    next: (value: T) => subject.next(value),
    stream: debounced$,
  };
}
