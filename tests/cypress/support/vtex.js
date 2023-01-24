function setVtexIdCookie() {
    const cookieOptions = {
        domain: `.${new URL(Cypress.config().baseUrl).hostname}`,
    };
    const token = Cypress.env("authToken");
    return cy.setCookie("VtexIdclientAutCookie", token, cookieOptions);
}

Cypress.Commands.add("setVtexIdCookie", setVtexIdCookie);
