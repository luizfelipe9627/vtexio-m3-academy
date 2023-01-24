describe("empty spec", () => {
    before(() => {
        cy.setVtexIdCookie();
    });

    it("passes", () => {
        cy.visit("/");
        cy.visit("/login")

    });
});
