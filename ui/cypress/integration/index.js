let random_number = Math.floor(Math.random() * 10000);
let cypress_test_new_region = "cypress_test_new_region_" + random_number;
let cypress_test_new_city = "cypress_test_new_city_" + random_number;

describe("Romania Map Application", () => {

    it("Test the DOM", () => {
      cy.visit("http://localhost:3000/");
      cy.get("h1")
        .should("have.text", "Romania Map");
      cy.get("h2")
        .should("have.text", "RegionsCities");
      cy.get('#newregion')
        .should('exist');
      cy.get('#newcity')
        .should('exist');
      cy.get("button#btn_saveregion")
        .should("exist")
        .should("have.text", "Save Region");
      cy.get("button#btn_savecity")
        .should("exist")
        .should("have.text", "Save City");
      cy.get("select#regionselectbox")
        .should("exist");
    });

    /*
    it("Add new region", () => {
        cy.visit("http://localhost:3000/");
        cy.get('input#newregion')
            .type(cypress_test_new_region);
        cy.get('button#btn_saveregion').click();
        cy.wait(5000);
        cy.get('ul#regions_list li').last()
            .should('have.text', cypress_test_new_region);
        cy.get("select#regionselectbox")
            .select(cypress_test_new_region)
            .should("have.value", cypress_test_new_region);        
      });
      */
      it("Add new region and city", () => {
        cy.visit("http://localhost:3000/");
        //new region
        cy.get('input#newregion')
            .type(cypress_test_new_region);
        cy.get('button#btn_saveregion').click();
        cy.wait(5000);
        cy.get('ul#regions_list li').last()
            .should('have.text', cypress_test_new_region);
        cy.get("select#regionselectbox")
            .select(cypress_test_new_region)
            .should("have.value", cypress_test_new_region);
        //new city
        cy.get('input#newcity')
            .type(cypress_test_new_city);
        cy.get('button#btn_savecity').click();
        cy.wait(5000);
        cy.get('ul#regions_city_list li').last()
            .should('have.text', cypress_test_new_city);

      });
  
  });