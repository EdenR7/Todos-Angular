import {
  checklistFormAtt,
  stdTaskFormAtt,
} from '../components/create-todo-form/create-todo-form.component';

export interface NewTodoI {
  title: string;
  tasks: stdTaskFormAtt[];
  checklists: checklistFormAtt[];
}
