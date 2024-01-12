import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class EditTaskButtonComponent extends Component {
  @tracked showForm = false;
  id = this.args.task.id;
  title = this.args.task.title || '';
  description = this.args.task.description || '';
  status = 'Pending';
  dueDate = this.args.task.dueDate.substring(0, 10);
  authorId = this.args.task.authorId;

  @action
  toggleForm() {
    this.showForm = !this.showForm;
  }

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }

  @action
  updateDescription(event) {
    this.description = event.target.value;
  }

  @action
  updateStatus(event) {
    this.status = event.target.value;
  }

  @action
  updateDueDate(event) {
    this.dueDate = event.target.value;
  }

  @action
  async updateTask(taskId) {
    event.preventDefault();

    const response = await fetch(`http://localhost:3000/api/Tasks/updateTask`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: taskId,
        title: this.title,
        description: this.description,
        status: this.status,
        dueDate: this.dueDate.substring(0, 10),
      }),
    });

    if (response.ok) {
      // Handle successful update
      window.location.reload();
      console.log(`Task with ID ${taskId} updated successfully`);
    } else {
      // Handle error
      console.error('An error occurred while updating the task');
    }
  }
}
