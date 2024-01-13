import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class TaskEntryComponent extends Component {
  @tracked isEditing = false;

  @action
  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  @action
  async deleteTask(taskId) {
    const response = await fetch(`http://localhost:3000/api/Tasks/${taskId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Handle successful deletion
      window.location.reload();
      console.log(`Task with ID ${taskId} deleted successfully`);
    } else {
      // Handle error
      console.error("An error occurred while deleting the task");
    }
  }
}
