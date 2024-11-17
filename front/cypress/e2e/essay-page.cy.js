describe("/app/redacao logged on behavior", () => {
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
      "#weekly-essays > div.header-section > h2"
    ).contains("redação da semana", { matchCase: false });
    cy.get(
      "#weekly-essays > div.slide > div.slide__content > h1"
    ).should("not.contain.text", "{{");

    cy.get(
      "#weekly-essays > div.slide > div.slide__content > div > a > span"
    )
      .should("have.attr", "href")
      .and("include", "/redp-propostas-de-redacao");
    cy.get(
      "#weekly-essays > div.slide > div.slide__content > div > a > span"
    ).contains("ver o tema", { matchCase: false });
  });
  it("loads the send essay and show past essays card", () => {
    cy.get(
      "#essay-panel"
    ).contains("painel de reda", { matchCase: false });
    cy.get(
      "#essay-panel"
    )
      .get("#send-essay")
      .should("have.attr", "href")
      .and("include", "/redacao/enviar");
    cy.get(
      "#essay-panel"
    )
      .get("#my-essays")
      .should("have.attr", "href")
      .and("include", "/redacao/minhas-redacoes");
  });
  it("loads the pdf section", () => {
    cy.get(
      "#essay-papers"
    ).contains("folhas", { matchCase: false });
    cy.get(
      "#essay-papers > div.grid.grid--growing"
    )
      .children()
      .should("have.length.at.least", 2);
  });
  it("loads the help card", () => {
    cy.get(
      "#essay-help li"
    )
      .children()
      .should("have.length", 2);
    cy.get(
      "#essay-help"
    )
      .find("li:nth-child(1)")
      .contains("como enviar", { matchCase: false });
    cy.get(
      "#essay-help"
    )
      .find("li:nth-child(2)")
      .contains("veja um exemplo", { matchCase: false });
  });
  it("loads the essay styles and topics card", () => {
    cy.get(
      "#essay-styles"
    ).contains("temas de redação", { matchCase: false });
    cy.get(
      "#essay-styles > div.grid.grid--growing"
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
      "#sem-acesso-a-redacao-e-deslogado"
    )
      .get(
        "#sem-acesso-a-redacao-e-deslogado > div > div:nth-child(1) > h4"
      )
      .should("contain.text", "Assine seu Plano");
    cy.get(
      "#sem-acesso-a-redacao-e-deslogado"
    )
      .contains("ver planos de correção", { matchCase: false })
      .should("have.attr", "href")
      .and("include", "/planos");
  });
  it("loads the weekly essays card and subject", () => {
    cy.get(
      "#weekly-essays > div.header-section > h2"
    ).contains("redação da semana", { matchCase: false });
    cy.get(
      "#weekly-essays > div.slide > div.slide__content > h1"
    ).should("not.contain.text", "{{");

    cy.get(
      "#weekly-essays > div.slide > div.slide__content > div > a"
    )
      .should("have.attr", "href")
      .and("include", "/redp-propostas-de-redacao");
    cy.get(
      "#weekly-essays > div.slide > div.slide__content > div > a"
    ).contains("ver o tema", { matchCase: false });
  });
  it("loads the send essay and show past essays card", () => {
    cy.get(
      "#essay-panel"
    ).contains("painel de reda", { matchCase: false });
    cy.get(
      "#essay-panel"
    )
      .get("#send-essay")
      .should("have.attr", "href")
      .and("include", "/redacao/enviar");
    cy.get(
      "#essay-panel"
    )
      .get("#my-essays")
      .should("have.attr", "href")
      .and("include", "/redacao/minhas-redacoes");
  });
  it("loads the pdf section", () => {
    cy.get(
      "#essay-papers"
    ).contains("folhas", { matchCase: false });
    cy.get(
      "#essay-papers > div.grid.grid--growing"
    )
      .children()
      .should("have.length.at.least", 2);
  });
  it("loads the help card", () => {
    cy.get(
      "#essay-help li"
    )
      .children()
      .should("have.length", 2);
    cy.get(
      "#essay-help"
    )
      .find("li:nth-child(1)")
      .contains("como enviar", { matchCase: false });
    cy.get(
      "#essay-help"
    )
      .find("li:nth-child(2)")
      .contains("veja um exemplo", { matchCase: false });
  });
  it("loads the essay styles and topics card", () => {
    cy.get(
      "#essay-styles"
    ).contains("temas de redação", { matchCase: false });
    cy.get(
      "#essay-styles > div.grid.grid--growing"
    )
      .children()
      .should("have.length.at.least", 10);
  });
});
