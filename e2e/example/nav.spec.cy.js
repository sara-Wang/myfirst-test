describe("", () => {
    it("导航", () => {
        cy.visit("https://useai.fun/");
        cy.visit("https://useai.fun/lesson/ai-chatbots-competition1");
        cy.wait(3000);
        cy.go("back");
        cy.wait(3000);
        cy.go("forward");
        cy.wait(3000);
        cy.reload();
        console.log(cy.url());
        console.log(cy.title());
    });
});
