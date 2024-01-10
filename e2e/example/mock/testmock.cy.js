describe("自动化测试", () => {
    it("get", () => {
        cy.request({ url: "http://localhost:3000/user", method: "get" })
            .its("body")
            .should("include", "思段");
    });
    // let item = {
    //     name: "镝数聚",
    //     jobTitle: "Group Director",
    //     email: "思源_余@gmail.com",
    // };

    // it("post", () => {
    //     cy.request({
    //         method: "post",
    //         url: "http://localhost:3000/user",
    //         body: item,
    //         headers: { "Content-Type": "application/json" },
    //     });
    // });
});

// let item= {
//     "id": 1,
//     "city": "济 昊强",
//     "streetName": "黄 中心"
// },
