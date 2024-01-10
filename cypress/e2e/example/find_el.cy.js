//cypress是行为驱动 且是有测试套和测试用例的
it("element location", () => {
    cy.visit("https://example.cypress.io/commands/querying");
    cy.get("div.panel-head:nth-child(9) h1").should("be.visible");
    cy.contains("h1", "简历").should("be.visible");
    cy.get("div.panel-head h1").last().should("be.visible");

    cy.get("div.panel-head").children("子集元素");
    let resume = cy
        .get("div.panel-head")
        .parents("你的父级元素选择器")
        .find("h1")
        .should("be.visible");
    //同胞元素上下都行siblings
    let resume_else = resume.siblings(".panel");
    //找上面一个元素 下面一个元素 然后点击
    resume_else.prev(".click");
    resume_else.next(".click");

    //滚动条 滚动到页面元素位置并输入hello
    cy.get("#inputEmail").scrollIntoView().type("hello");
    //滚动到最顶端和最底部 以及指定位置 或者页面百分比
    cy.scrollTo("top");
    cy.scrollTo("bottom");
    cy.scrollTo(0, 250);
    cy.scrollTo("0%", "50%");
    //当前窗口当中的子窗口 滚动条
    cy.get("#scrollable-horizontal").scrollIntoView().scrollTo("right");

    //找到元素位置并滚动到对应位置,在 cy.scrollTo() 命令中添加 { ensureScrollable: false } 选项，这会让 Cypress 尝试滚动即使它认为元素不可滚动。
    cy.get("#scrollable-vertical").scrollTo("center");
    cy.get("#scrollable-vertical").scrollTo("0", "80%");

    cy.get(".query-form").within(($form) => {
        cy.get("input:first").type("username");
        cy.get("input:last").type("123456");
        cy.contains("Submit").click();
        //或者使用submit()函数 submit一定是form表单元素才能调用
        // cy.get(".action-form").submit();
        //.dbclick 双击  .rightclick 右键单击
        //选择所有多选项
        cy.get('.action-checkboxes [type="checkbox"]')
            .not("[disabled]")
            .check();
        cy.get('.action-multiple-checkboxes [type="checkbox"]').check({
            force: true,
        });
        //取消选择所有多选项
        cy.get('.action-checkboxes [type="checkbox"]')
            .not("[disabled]")
            .uncheck();
        cy.get('.action-multiple-checkboxes [type="checkbox"]').uncheck({
            force: true,
        });
        //只选择某个或者多个 则输入value值
        cy.get('.action-checkboxes [type="checkbox"]').check(
            "checkbox3",
            "checkbox2"
        );
        //单选
        cy.get('.action-checkboxes [type="radio"]').check("radio2");
        //下拉框 通过文本定位并选择
        cy.get(".action-select").select("oranges");
        //或者下拉框 通过元素属性定位并多项选择
        cy.get(".action-select").select(["fr-oranges"], ["fr-banners"]);
        //命令行工具
        // npx  cypress open可以打开浏览器选择脚本后进行执行脚本 或者run指定文件路径 npx cypress run --spec'\cypress\e2e\index.cy.js'结束后会生成测试报告
        // 添加上headed会打开浏览器图形界面  npx cypress run --spec "cypress\e2e\index.cy.js" --headed
        //后面还可添加浏览器类型npx cypress run --spec "cypress\e2e\index.cy.js" --headed --browser=chrome
        //或者让它一直运行 npx json-server --watch cypress/e2e/example/mock/data.json
    });
});
