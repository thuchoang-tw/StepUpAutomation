describe('Volunteer Testing', () => {
    it('Create an account', () => {
        const user = Cypress.env('users').helpdesk;
        cy.login(user.username, user.password)
        cy.visit(Cypress.env('baseUrl') + '/SignUp/');
        cy.get('.checkmark').click();
        cy.get('button[id="btnNext"]').click();
        cy.fixture('volunteer').then(data => {
            cy.fillVolunteerInfo(data);
          });
        cy.fixture('address').then(data => {
            cy.fillAddressInfo(data);
          });
        cy.get("div[id='dropdown-source'] div[class='dropdown__selected']").click({ force: true });
        cy.get('.dropdown__option').contains("A friend told me about it").click({ force: true });
        cy.get('button[id="btnNext"]').click();
        cy.fixture('account_details').then(data => {
            cy.fillAccountDetails(data);
          });
        cy.get('button[id="btnNext"]').click();

      })
      it('Create an account with helpdesk', () => {
        const user = Cypress.env('users').helpdesk;
        cy.login(user.username, user.password)
        cy.get('#createVolunteer').click();
        cy.get('.checkmark').click();
        cy.get('button[id="btnNext"]').click();
        cy.fixture('volunteer').then(data => {
            cy.fillVolunteerInfo(data);
          });
        cy.fixture('address').then(data => {
            cy.fillAddressInfo(data);
          });
        cy.get("div[id='dropdown-source'] div[class='dropdown__selected']").click({ force: true });
        cy.get('.dropdown__option').contains("A friend told me about it").click({ force: true });
        cy.get('button[id="btnNext"]').click();
        cy.fixture('account_details').then(data => {
            cy.fillAccountDetails(data);
          });
        cy.get('button[id="btnNext"]').click();

      })
    it('Register a volunteer', () => {
  
      const user = Cypress.env('users').volunteer;
      cy.login(user.username,user.password)
  
      cy.get('#volunteer-registration').click();
      cy.get('div[id="consent-checkbox"]').click();
      cy.get('button[id="btnNext"]').click();
      cy.answerQuestionsFromCSV('question_volunteer.csv');
      cy.get('button[id="btnNext"]').click();
    })

  })
  