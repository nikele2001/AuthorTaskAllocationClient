import Route from "@ember/routing/route";

/**
 * This route is responsible for fetching the data for the author page. It displays the tasks for a given author.
 */
export default class AuthorRoute extends Route {
  async model(params) {
    let response = await fetch(
      `http://localhost:3000/api/Tasks/getTasksByAuthorId?authorId=${params.author_id}`
    );
    let data = await response.json();

    data = data.data;
    data.tasks.sort((a, b) => a.title.localeCompare(b.title));

    return data; // return the data object from the response
  }
}
