import LoginPage from "./page/loginpage";
import "cypress-file-upload";

describe("demo", () => {
    it("输入正确的用户名和密码，登录成功", () => {
        const loginPage = new LoginPage();
        loginPage.visit();
        loginPage.login("13000000003", "000003");
        cy.wait(5000);
        cy.reload();
        cy.wait(2000);
        cy.get(".data > a").click();
        cy.contains("span", "导入数据").click();
        cy.get(".datafile.ng-star-inserted", { timeout: 10000 })
            .should("exist")
            .attachFile("example.json");
        cy.title().should("include", "镝数图表");
    });
});
