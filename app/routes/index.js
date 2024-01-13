import Route from "@ember/routing/route";

export default class IndexRoute extends Route {
  async model() {
    let response = await fetch(
      "http://localhost:3000/api/Authors/getAuthorsWithTaskCount"
    );
    let data = await response.json();

    data.authors.sort((a, b) => a.name.localeCompare(b.name));

    return {
      authors: data.authors,
    };
  }
}
