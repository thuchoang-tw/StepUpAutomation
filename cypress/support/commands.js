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

  Cypress.Commands.add('signup', (username, password) => {
    cy.visit(Cypress.env('baseUrl') + '/SignUp/');
    cy.get('div[id="consent-checkbox"]').click();
    cy.get('button[id="btnNext"]').click();
    cy.get('input[name="Input.Email"]').type(username);
    cy.get('input[name="Input.Password"]').type(password);

    cy.get('button[id="btnLogin"]').click();
});

Cypress.Commands.add('fillProxyInfo', (data) => {
  cy.get(`input[id="Gender_0"][value="${data.gender}"]`).dblclick({ force: true });
  cy.get(`input[id="SameAddress_0"][value="${data.sameAddress}"]`).dblclick({ force: true });
  cy.get(`input[id="PrimaryContact_0"][value="${data.primaryContact}"]`).dblclick({ force: true });

  cy.get('input[name="Title"]').type(data.title);
  cy.get('input[name="FirstName"]').type(data.firstName);
  cy.get('input[name="Surname"]').type(data.surname);
  cy.get('input[id="DateOfBirth"]').type(data.dateOfBirth);
});

Cypress.Commands.add('fillVolunteerInfo', (data) => {
  cy.get(`input[id="Gender_0"][value="${data.gender}"]`).dblclick({ force: true });

  cy.get('input[name="Title"]').type(data.title);
  cy.get('input[name="FirstName"]').type(data.firstName);
  cy.get('input[name="Surname"]').type(data.surname);
  cy.get('input[id="DateOfBirth"]').type(data.dateOfBirth);
  cy.get('#TelephoneNumber').type(data.telephone);
  cy.get('#MobileNumber').type(data.mobile);
  
});

  Cypress.Commands.add('fillAddressInfo', (data) => {
    cy.get('#ContactAddress_Line1').type(data.line1);
    cy.get('#ContactAddress_Line2').type(data.line2);
    cy.get('#ContactAddress_City').type(data.city);
    cy.get("div[id='dropdown-state'] div[class='dropdown__selected']").click({ force: true });
    cy.get('.dropdown__option').contains(data.state.trim()).click({ force: true });
    cy.get('#ContactAddress_Postcode').type(data.postcode);
    
 
  });

  Cypress.Commands.add('fillAccountDetails', (data) => {
    cy.get('#Email').type(data.email);
    cy.get('#ConfirmEmail').type(data.email);
    cy.get('#Password').type(data.password);
    cy.get('#ConfirmPassword').type(data.password);
    cy.get(".dropdown__selected").click({ force: true });
    cy.get('.dropdown__option').contains(data.security_question.trim()).click({ force: true });
    cy.get('#SecurityAnswer').type(data.security_answer);
    
 
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
