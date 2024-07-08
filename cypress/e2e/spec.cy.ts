describe('Home page initial display', () => {
  beforeEach(() =>{
    cy.visit('/');
  })
  it('Visits the initial project page', () => {
    cy.contains('Liste des pokemons :');
  })

  it('Shows some well known pokemons', () => {
    cy.contains('Magmar');
    cy.contains('Charmander');
    cy.contains('Carnivine');
    cy.contains('Togekiss');
  })

})
describe('Add a pokemon', () => {
  beforeEach(() =>{
    cy.visit('/');
  })
  it('Should add new pokemon to list', () => {

    cy.get('[ng-reflect-name="name"]').type("YUMYUM");
    cy.get('[ng-reflect-name="imageUrl"]').type("https://ibb.co/Bw3YZyr");
    cy.get('[ng-reflect-name="supertype"]').type("Pokemon");
    cy.get('[type="submit"]').click();
    cy.contains("YUMYUM").should('exist');
    
  })

  it('Should forbid pokemon creation if no image', () => {
    cy.get('[ng-reflect-name="name"]').type("YUMYUM");
    cy.get('[ng-reflect-name="supertype"]').type("Pokemon");
    cy.get('[type="submit"]').click();
    
    cy.contains("ATTENTION VALEURS INVALIDES").should("be.visible");
    cy.contains("YUMYUM").should('not.exist');

  })
  it('Should forbid pokemon creation if lower case name', () => {
    cy.get('[ng-reflect-name="name"]').type("lowercasename");
    cy.get('[ng-reflect-name="imageUrl"]').type("https://ibb.co/Bw3YZyr");
    cy.get('[ng-reflect-name="supertype"]').type("Pokemon");
  

    cy.get('[type="submit"]').click();
    
    cy.contains("ATTENTION VALEURS INVALIDES").should("be.visible");
    cy.contains("lowercasename").should('not.exist');

  })

})
