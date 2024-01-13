import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AddAuthorComponent extends Component {
  @service toast;
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

    if (this.authorName === '') {
      this.toast.error('Please enter a name.');
      return;
    }
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
      }
    );

    await response.json();

    if (response.ok) {
      window.location.reload();
    } else {
      this.toast.error('Duplicate author name. Please try again.');
    }
  }
}
