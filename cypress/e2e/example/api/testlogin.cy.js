describe("接口登录", () => {
    it("输入错误的密码，提示密码错误", () => {
        cy.request({
            url: "https://dycharts.com/vis/auth/login",
            method: "post",
            form: true,
            body: {
                username: "13000000008",
                password: "000001",
            },
        }).then((response) => {
            expect(response.body).to.have.property("message", "password_error");
        });
    });

    it("输入正确的用户名和密码，可以登录成功", () => {
        cy.request({
            url: "https://dycharts.com/vis/auth/login",
            method: "post",
            form: true,
            body: {
                username: "13000000008",
                password: "000008",
            },
        }).then((response) => {
            expect(response.body).to.have.property("message", "success");
            // .its("body")
            // .should("have.property", "message", "success");
        });
    });
});
