// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import Papa from 'papaparse';

  // cypress/support/commands.js

  Cypress.Commands.add('login', (username, password) => {
    cy.visit(Cypress.env('baseUrl') + '/Account/Login');
    cy.get('input[name="Input.Email"]').type(username);
    cy.get('input[name="Input.Password"]').type(password);

    cy.get('button[id="btnLogin"]').click();
});

  Cypress.Commands.add('fillPersonalInfo', (data) => {
    cy.get(`input[id="Gender_0"][value="${data.gender}"]`).dblclick({ force: true });
    cy.get(`input[id="SameAddress_0"][value="${data.sameAddress}"]`).dblclick({ force: true });
    cy.get(`input[id="PrimaryContact_0"][value="${data.primaryContact}"]`).dblclick({ force: true });
  
    cy.get('input[name="Title"]').type(data.title);
    cy.get('input[name="FirstName"]').type(data.firstName);
    cy.get('input[name="Surname"]').type(data.surname);
    cy.get('input[id="DateOfBirth"]').type(data.dateOfBirth);
  });

Cypress.Commands.add('answerQuestionsFromCSV', (csvFileName) => {
  cy.readFile(`cypress/fixtures/${csvFileName}`).then((csvContent) => {
    const rows = Papa.parse(csvContent, { header: true });
    console.log(JSON.stringify(rows));
    rows.data.forEach((row) => {
      const question = row.question;
      const type = row.type;
      const answer = row.answer;

      cy.get('h2.subheading')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const cleanText = text.replace(/\u00A0/g, ' ').trim(); 
        expect(cleanText).to.equal(question.trim());
      })

      if (type.trim() === 'segment') {
        cy.get('.segmented-control__label')
          .contains(answer.trim())
          .click({ force: true });
      }
      else if(type.trim() === 'radio'){
        cy.get('.radio-button')
          .contains(answer.trim())
          .click({ force: true });
      }
      else if (type.trim() === 'checkbox') {
        cy.contains('label.question', answer.trim())  
          .should('exist')  
          .should('be.visible')  
          .click();  
      }
      else if (type.trim() === 'dropdown') {
        cy.get('div[class="dropdown__options"]').click({ force: true });
        cy.get('.dropdown__option').contains(answer.trim()).click({ force: true });
      }

      // Click the Next button
      cy.get('button[id="btnNext"]').click();
    });
  });
});
