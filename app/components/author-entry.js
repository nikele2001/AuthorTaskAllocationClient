import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class AuthorEntryComponent extends Component {
  @service toast;
  @tracked isEditing = false;
  newAuthorName = "";

  @action
  toggleForm() {
    this.isEditing = !this.isEditing;
  }

  @action
  async deleteAuthor(authorId) {
    const response = await fetch(
      `http://localhost:3000/api/Authors/${authorId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      // Handle successful deletion
      window.location.reload();
      console.log(`Author with ID ${authorId} deleted successfully`);
    } else {
      // Handle error
      console.error("An error occurred while deleting the author");
    }
  }

  @action
  updateAuthorName(event) {
    this.newAuthorName = event.target.value;
  }

  @action
  async saveChanges(authorId) {
    event.preventDefault();

    if (this.newAuthorName === "") {
      this.toast.error("Please enter a name.");
      return;
    }

    const response = await fetch(
      `http://localhost:3000/api/Authors/updateAuthor`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: {
            id: authorId,
            name: this.newAuthorName,
          },
        }),
      }
    );

    await response.json();

    if (response.ok) {
      this.isEditing = false;
      this.newAuthorName = "";
      window.location.reload();
      // Handle successful update
    } else {
      // Handle error
      this.toast.error("Duplicate author name. Please try again.");
    }
  }
}
