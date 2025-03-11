describe('Proxy testing', () => {

  it('Register a poroxy', () => {

    const volunteer = Cypress.env('users').volunteer;
    cy.login(volunteer.username,volunteer.password)

    cy.get('a[id="proxy-registration"]').click();
    cy.answerQuestionsFromCSV('proxy_confrim_question.csv');
    cy.get('div[id="consent-checkbox"]').click();

    cy.get('button[id="btnNext"]').click();
    cy.fixture('proxy').then(data => {
      cy.fillProxyInfo(data);
    })
    cy.get('input[name="__RequestVerificationToken"]').then(($input) => {
      const token = $input.val();
      cy.wrap(token).as('csrfToken'); 
      cy.get('input[name="__RequestVerificationToken"]').eq(0).type(token, { force: true });
      cy.get('button.button--next[type="submit"]').click({ force: true });
      cy.answerQuestionsFromCSV('question_proxy.csv');
      cy.get('button[id="btnNext"]').click();

    })
  })
})
