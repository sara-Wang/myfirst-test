// const { describe } = require("mocha");

describe("首页", () => {
    it("首页点击登录", () => {
        cy.visit("https://dycharts.com/appv2/#/pages/home/index");
        cy.wait(5000);
        cy.get(".login-btns").click({ force: true });
        cy.url().should("include", "home");
        cy.title().should("include", "镝数图表");
    });
});
