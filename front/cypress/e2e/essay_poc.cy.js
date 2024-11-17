describe("/app/mesalva logged on behavior", () => {
  beforeEach("logs on the essays page", () => {
    cy.visit("http://localhost:3000/app/redacao");
    cy.get("#event-auth-signin").click();
    cy.get("#email").type("testemesalva2023@gmail.com");
    cy.get("#password").type("Mesalva@2023morango");
    cy.get("#sign-in-button").click();
    cy.url().should("eq", "http://localhost:3000/app/redacao");
  });
  it("loads the sidebar", () => {
    cy.get("#__next > div.header.header--is-going-up > div > button").click();
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.sidebar-manager > aside"
    )
      .children()
      .should("have.length", 8);
  });
  it("loads the page's title and the info button", () => {
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section.section-title > div"
    )
      .children()
      .contains("Redações");
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section.section-title > div"
    )
      .children()
      .get(
        "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section.section-title > div > button"
      );
  });
  it("loads the weekly essays card and subject", () => {
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(2) > div.header-section > h2"
    ).contains("redação da semana", { matchCase: false });
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(2) > div.slide > div.slide__content > h1"
    ).should("not.contain.text", "{{");

    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(2) > div.slide > div.slide__content > div > a"
    )
      .should("have.attr", "href")
      .and("include", "/redp-propostas-de-redacao");
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(2) > div.slide > div.slide__content > div > a"
    ).contains("ver o tema", { matchCase: false });
  });
  it("loads the send essay and show past essays card", () => {
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(3)"
    ).contains("painel de reda", { matchCase: false });
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(3)"
    )
      .get("#send-essay")
      .should("have.attr", "href")
      .and("include", "/redacao/enviar");
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(3)"
    )
      .get("#my-essays")
      .should("have.attr", "href")
      .and("include", "/redacao/minhas-redacoes");
  });
  it("loads the pdf section", () => {
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > div.grid.grid--growing > section.card.card--elevation-lw.section-card.section-card--with-header"
    ).contains("folhas", { matchCase: false });
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > div.grid.grid--growing > section.card.card--elevation-lw.section-card.section-card--with-header > div.grid.grid--growing"
    )
      .children()
      .should("have.length.at.least", 2);
  });
  it("loads the help card", () => {
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > div.grid.grid--growing > section:nth-child(2) li"
    )
      .children()
      .should("have.length", 2);
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > div.grid.grid--growing > section:nth-child(2)"
    )
      .find("li:nth-child(1)")
      .contains("como enviar", { matchCase: false });
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > div.grid.grid--growing > section:nth-child(2)"
    )
      .find("li:nth-child(2)")
      .contains("veja um exemplo", { matchCase: false });
  });
  it("loads the essay styles and topics card", () => {
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(5)"
    ).contains("temas de redação", { matchCase: false });
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(5) > div.grid.grid--growing"
    )
      .children()
      .should("have.length.at.least", 10);
  });
});

describe("/app/redacao logged off behavior", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/app/redacao");
  });
  it("loads the sidebar", () => {
    cy.get("#__next > div.header.header--is-going-up > div > button").click();
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.sidebar-manager > aside"
    )
      .children()
      .should("have.length", 8);
  });
  it("loads the essays page", () => {
    cy.url().should("eq", "http://localhost:3000/app/redacao");
  });

  it("loads the page's title and the info button", () => {
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section.section-title > div"
    )
      .children()
      .contains("Redações");
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section.section-title > div"
    )
      .children()
      .get(
        "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section.section-title > div > button"
      );
  });

  it("loads the marketing card", () => {
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > div:nth-child(2) > div"
    )
      .get(
        "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > div:nth-child(2) > div > div > div > div:nth-child(1) > h4"
      )
      .should("contain.text", "Assine seu Plano");
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > div:nth-child(2) > div"
    )
      .contains("ver planos de correção", { matchCase: false })
      .should("have.attr", "href")
      .and("include", "/planos");
  });
  it("loads the weekly essays card and subject", () => {
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(3) > div.header-section > h2"
    ).contains("redação da semana", { matchCase: false });
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(3) > div.slide > div.slide__content > h1"
    ).should("not.contain.text", "{{");

    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(3) > div.slide > div.slide__content > div > a"
    )
      .should("have.attr", "href")
      .and("include", "/redp-propostas-de-redacao");
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(3) > div.slide > div.slide__content > div > a"
    ).contains("ver o tema", { matchCase: false });
  });
  it("loads the send essay and show past essays card", () => {
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(4)"
    ).contains("painel de reda", { matchCase: false });
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(4)"
    )
      .get("#send-essay")
      .should("have.attr", "href")
      .and("include", "/redacao/enviar");
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(4)"
    )
      .get("#my-essays")
      .should("have.attr", "href")
      .and("include", "/redacao/minhas-redacoes");
  });
  it("loads the pdf section", () => {
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > div.grid.grid--growing > section.card.card--elevation-lw.section-card.section-card--with-header"
    ).contains("folhas", { matchCase: false });
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > div.grid.grid--growing > section.card.card--elevation-lw.section-card.section-card--with-header > div.grid.grid--growing"
    )
      .children()
      .should("have.length.at.least", 2);
  });
  it("loads the help card", () => {
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > div.grid.grid--growing > section:nth-child(2) li"
    )
      .children()
      .should("have.length", 2);
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > div.grid.grid--growing > section:nth-child(2)"
    )
      .find("li:nth-child(1)")
      .contains("como enviar", { matchCase: false });
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > div.grid.grid--growing > section:nth-child(2)"
    )
      .find("li:nth-child(2)")
      .contains("veja um exemplo", { matchCase: false });
  });
  it("loads the essay styles and topics card", () => {
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(6)"
    ).contains("temas de redação", { matchCase: false });
    cy.get(
      "#__next > div.page-template.app-template.app-template--lg > div.app-template__content.app-template__protected-area > section:nth-child(6) > div.grid.grid--growing"
    )
      .children()
      .should("have.length.at.least", 10);
  });
});
