describe('Create volunteer', () => {
    beforeEach(function () {
      cy.fixture('volunteer').as('personData');
    });
  
    it('Create an account', () => {
  
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

    it('Register a volunteer', () => {
  
      const volunteer = Cypress.env('users').volunteer;
      cy.login(volunteer.username,volunteer.password)
  
      cy.get('#volunteer-registration').click();
      cy.get('div[id="consent-checkbox"]').click();
      cy.get('button[id="btnNext"]').click();
      cy.answerQuestionsFromCSV('question_volunteer.csv');
      cy.get('button[id="btnNext"]').click();
    })
    
  })
  