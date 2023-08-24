describe('Enter New Customer Transaction', () => {

    beforeEach(() => {
        cy.visit(`/new`)
        cy.get('#new-customer').click();
        cy.get('[data-testid="region-selector"]').select('AU');
        cy.get('[data-testid="create-hosted-checkout"]').click();
        cy.get('[data-testid="Mock Bank"]').click();
    });

    it('should accept complete form', () => {

        cy.get('[data-testid="ACCOUNT_NAME"]').type('test name');
        cy.get('[data-testid="BSB_NUMBER"]').type('111114');
        cy.get('[data-testid="ACCOUNT_NUMBER"]').type('12345678');
        cy.get('[data-testid="supplemental-attr-form-submit"]').click().should('not.exist');
        cy.location().should((loc) => {
            expect(loc.host).to.eq('checkout.banked.com')
        });
    })

    it('should not accept incomplete form, name', () => {

        cy.get('[data-testid="BSB_NUMBER"]').type('111114');
        cy.get('[data-testid="ACCOUNT_NUMBER"]').type('12345678');
        cy.get('[data-testid="supplemental-attr-form-submit"]').should('be.disabled');
    })

    it('should not accept incomplete form, bsb number', () => {

        cy.get('[data-testid="ACCOUNT_NAME"]').type('test name');
        cy.get('[data-testid="ACCOUNT_NUMBER"]').type('12345678');
        cy.get('[data-testid="supplemental-attr-form-submit"]').should('be.disabled');
    })

    it('should not accept incomplete form, account number', () => {
        cy.get('[data-testid="ACCOUNT_NAME"]').type('test name');
        cy.get('[data-testid="BSB_NUMBER"]').type('111114');
        cy.get('[data-testid="supplemental-attr-form-submit"]').should('be.disabled');
    })
})
