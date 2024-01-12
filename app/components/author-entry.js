import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthorEntryComponent extends Component {
  @tracked isEditing = false;
  newAuthorName = '';

  @action
  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  @action
  async deleteAuthor(authorId) {
    const response = await fetch(
      `http://localhost:3000/api/Authors/${authorId}`,
      {
        method: 'DELETE',
      },
    );

    if (response.ok) {
      // Handle successful deletion
      window.location.reload();
      console.log(`Author with ID ${authorId} deleted successfully`);
    } else {
      // Handle error
      console.error('An error occurred while deleting the author');
    }
  }

  @action
  updateAuthorName(event) {
    this.newAuthorName = event.target.value;
  }

  @action
  async saveChanges(authorId) {
    event.preventDefault();

    const response = await fetch(
      `http://localhost:3000/api/Authors/updateAuthor`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: {
            id: authorId,
            name: this.newAuthorName,
          },
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      this.isEditing = false;
      this.newAuthorName = '';
      window.location.reload();
      // Handle successful update
    } else {
      // Handle error
      this.isEditing = false;
      console.error('An error occurred while updating the author');
    }
  }
}
