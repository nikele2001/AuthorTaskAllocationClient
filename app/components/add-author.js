import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AddAuthorComponent extends Component {
  @tracked showForm = false;
  authorName = '';

  @action
  toggleForm() {
    this.showForm = !this.showForm;
  }

  @action
  updateAuthorName(event) {
    this.authorName = event.target.value;
  }

  @action
  async addAuthor(event) {
    event.preventDefault();
    // Add code here to add the author
    const response = await fetch(
      `http://localhost:3000/api/Authors/createAuthor`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.authorName,
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      window.location.reload();
    } else {
      this.toggleForm();
    }
  }
}
