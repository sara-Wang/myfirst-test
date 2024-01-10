const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        // baseUrl: 'http://localhost:8080',

        reporter: "mochawesome",
        reporterOptions: {
            reportDir: "cypress/reports",
            overwrite: false,
            html: false,
            json: true,
        },

        pageLoadTimeout: 100000,
    },
});
