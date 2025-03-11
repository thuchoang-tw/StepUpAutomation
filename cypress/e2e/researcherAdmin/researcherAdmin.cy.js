describe('Researcher Admin testing', () => {
    it('Create a new study', () => {
  
      const researcher_admin = Cypress.env('users').researcher_admin;
      cy.login(researcher_admin.username,researcher_admin.password);
      cy.get('.button').contains('Study Management').click();
      cy.get('.button').contains('Create new Study').click();
      cy.fixture('study').then(data => {
        cy.fillStudyInfo(data);
      });
      cy.get('button[id="btnNext"]').click();
    })
    it('Create a site', () => {
      const researcher_admin = Cypress.env('users').researcher_admin;
      cy.login(researcher_admin.username,researcher_admin.password);
      cy.get('.button').contains('Study Management').click();
      cy.fixture('study').then(data => {
        cy.get('.tablerow-link').contains(data.name).click();
        cy.get('.button').contains('Site').click();
        cy.get('.button').contains('Add Site').click();
        cy.get('#Name').type("Site1");
        cy.get('#AutoCompleteResearcher').type(data.delegate);
        cy.get('.ui-menu-item').should('be.visible');
        cy.contains('.ui-menu-item-wrapper', data.delegate).click();
      });
      cy.get('#btnAddResearcher').dblclick();
      cy.get('button[id="siteSaveBtn"]').click();
      
    })
    it('Set Criteria', () => {
      const researcher_admin = Cypress.env('users').researcher_admin;
      cy.login(researcher_admin.username,researcher_admin.password);
      cy.get('.button').contains('Study Management').click();
      cy.fixture('study').then(data => {
        cy.get('.tablerow-link').contains(data.name).click();
        cy.get('.button').contains('Site').click();
        cy.get('.button--primary').contains('Criteria').click();
        cy.get('#dropdown-source').eq(0).find('.dropdown').click();
        cy.get('.dropdown__option').contains("Diagnosis Details").click({ force: true });
        cy.get('#btnNext').click();
        cy.contains('label', "Yes - Mild Cognitive Impairment").find('input[type="checkbox"]').check();
        cy.get('#btnNext').click();
        cy.get('#matchVolunteers').click();
      });

      
    })
  })
  