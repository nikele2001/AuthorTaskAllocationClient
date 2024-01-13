import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class AddTaskButtonComponent extends Component {
  @tracked showForm = false;
  title = "";
  description = "";
  status = "Pending";
  dueDate = "";
  authorId = this.args.authorId;

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
  async addTask(event) {
    event.preventDefault();
    // Add code here to add the task
    const response = await fetch(`http://localhost:3000/api/Tasks/createTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: this.title,
        description: this.description,
        status: this.status,
        dueDate: this.dueDate.substring(0, 10),
        authorId: this.authorId,
      }),
    });

    await response.json();

    if (response.ok) {
      window.location.reload();
    } else {
      this.toggleForm();
    }
  }
}
