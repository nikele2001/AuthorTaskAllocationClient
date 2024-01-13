"use strict";

const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
  });

  // Import jQuery
  app.import("node_modules/jquery/dist/jquery.min.js");

  // Import toastr
  app.import("node_modules/toastr/build/toastr.min.js");

  return app.toTree();
};
