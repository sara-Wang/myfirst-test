import LoginPage from "./page/loginpage";

context("登录测试", () => {
    // it("输入错误的用户名和密码，提示密码错误", () => {
    //     const loginPage = new LoginPage();
    //     loginPage.visit();
    //     loginPage.login("13000000001", "000000");
    //     cy.contains("密码错误").should("exist");
    // });

    it("输入正确的用户名和密码，登录成功", () => {
        const loginPage = new LoginPage();
        loginPage.visit();
        loginPage.login("13000000001", "000001");
        cy.title().should("include", "镝数图表");
    });

    it("滚动", () => {
        cy.visit("https://dycharts.com/appv2/#/pages/home/index");
        cy.viewport(1920, 1080);
        cy.contains("h1", "简历", { timeout: 10000 }).scrollIntoView();
        cy.wait(3000);

        cy.scrollTo("top", { ensureScrollable: false });
        cy.wait(3000);

        cy.scrollTo(0, 1000, { ensureScrollable: false });
        cy.wait(3000);

        cy.scrollTo("0%", "50%", { ensureScrollable: false });
        cy.wait(3000);
    });

    // it("接口-输入正确的用户名和密码，请求成功", () => {
    //     cy.request({
    //         url: "https://dycharts.com/vis/auth/login",
    //         method: "post",
    //         form: true,
    //         body: {
    //             username: "13000000001",
    //             password: "000001",
    //         },
    //     }).then((response) => {
    //         expect(response.body).to.have.property("resultCode", 1000);
    //     });
    // });
});

// context("登录测试", () => {
//     it("输入正确的用户名和密码，登录成功", () => {
//         cy.visit("https://dycharts.com/appv2/#/pages/home/index");
//         cy.wait(8000);
//         cy.viewport(1920, 1080);
//         //请求镝数首页后，点击登录按钮
//         cy.get(".login").should("be.visible").click({ force: true });
//         //点击登录弹窗中的切换为账号登录
//         cy.get(".corner > .tip").should("be.visible").click();
//         //点击登录弹窗中的切换为密码登录
//         cy.get(".change-type").should("be.visible").click();
//         //输入账号和密码后点击弹窗底部登录按钮
//         cy.get("[name='username']").type("13000000001");
//         cy.get("[name='password']").type("000001");
//         cy.wait(3000);
//         cy.get("div.submit-btn").should("be.visible").click();
//     });

// });
