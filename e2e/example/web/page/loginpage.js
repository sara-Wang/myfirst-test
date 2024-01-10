import locator from "./locator.json";
export default class LoginPage {
    constructor() {
        this.url = "https://dycharts.com/appv2/#/pages/home/index";
    }
    //封装页面对象
    visit() {
        cy.visit(this.url);
        cy.wait(8000);
        cy.viewport(1920, 1080);
    }
    get homepageLoginButton() {
        return cy
            .get(locator.loginPage.homepageLoginButton)
            .should("be.visible");
    }
    get accountLogin() {
        return cy.get(locator.loginPage.accountLogin).should("be.visible");
    }
    get passwordLogin() {
        return cy.get(locator.loginPage.passwordLogin).should("be.visible");
    }
    get username() {
        return cy.get(locator.loginPage.username).should("be.visible");
    }
    get password() {
        return cy.get(locator.loginPage.password).should("be.visible");
    }
    get submitLogin() {
        return cy.get(locator.loginPage.submitLogin).should("be.visible");
    }
    //封装常见业务流
    login(username, password) {
        this.homepageLoginButton.click({ force: true });
        this.accountLogin.click();
        this.passwordLogin.click();
        this.username.type(username);
        this.password.type(password);
        this.submitLogin.click();
    }
}
