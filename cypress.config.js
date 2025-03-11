const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  e2e: {
    reporter: "junit",
    reporterOptions: {
    mochaFile: "cypress/results/results-[hash].xml",
    toConsole: true,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
