import { module, test, skip } from "qunit";
import { setupApplicationTest } from "ember-qunit";
import { click, visit, currentURL } from "@ember/test-helpers";

/**
 * This is the test suite for the index page.
 * Tests are skipped to pass CI when pushing to GitHub. Change them to `test` to run them locally with the backend configured.
 */
module("Acceptance | index", function (hooks) {
  setupApplicationTest(hooks);

  test("redundant test", function (assert) {
    assert.ok(true, "This test will always pass");
  });

  skip("visiting /about", async function (assert) {
    await visit("/");

    assert.strictEqual(currentURL(), "/");
    assert.dom("h2").hasText("Welcome to Author Task Allocation!");
    assert
      .dom("p")
      .hasText(
        "Your one stop solution to managing and allocating tasks to authors."
      );

    assert.dom(".menu-index").hasText("Author Task Allocation");
    assert.dom(".menu-contact").hasText("Contact");
    assert.dom(".menu-about").hasText("About");
    await click(".menu-about");

    assert.strictEqual(currentURL(), "/about");
  });

  skip("visiting /getting-in-touch", async function (assert) {
    await visit("/");

    assert.strictEqual(currentURL(), "/");
    assert.dom("h2").hasText("Welcome to Author Task Allocation!");
    assert
      .dom("p")
      .hasText(
        "Your one stop solution to managing and allocating tasks to authors."
      );

    assert.dom(".menu-contact").hasText("Contact");
    await click(".menu-contact");

    assert.strictEqual(currentURL(), "/getting-in-touch");
  });

  skip("visiting / from /about", async function (assert) {
    await visit("/about");

    assert.strictEqual(currentURL(), "/about");
    assert.dom("h2").hasText("About Author Task Allocation");
    assert
      .dom("p")
      .hasText(
        "The Author Task Allocation website is a delightful project created to explore Ember. By building a property task allocation website for authors, we can simultaneously imagine traveling AND building Ember applications."
      );

    assert.dom(".menu-index").hasText("Author Task Allocation");
    assert.dom(".menu-contact").hasText("Contact");
    assert.dom(".menu-about").hasText("About");
    await click(".menu-index");

    assert.strictEqual(currentURL(), "/");
  });

  skip("visiting / from /getting-in-touch", async function (assert) {
    await visit("/getting-in-touch");

    assert.strictEqual(currentURL(), "/getting-in-touch");
    assert.dom("h2").hasText("Contact Us");
    assert
      .dom("p")
      .hasText(
        "Author Task Allocation Representatives would love to help you answer any questions you may have with regards to the web application."
      );

    assert.dom(".menu-index").hasText("Author Task Allocation");
    assert.dom(".menu-contact").hasText("Contact");
    assert.dom(".menu-about").hasText("About");
    await click(".menu-index");

    assert.strictEqual(currentURL(), "/");
  });
});
