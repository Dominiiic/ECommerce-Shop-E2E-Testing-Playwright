import { faker } from '@faker-js/faker';

class CheckoutPage {
    constructor(page) {
        this.page = page;
    }

    async fillOutContactInformation() {
        await this.page.getByRole('textbox', { name: 'Name * (min 2 characters)', exact: true }).fill(faker.person.firstName());
        await this.page.getByRole('textbox', { name: 'Lastname * (min 2 characters)' }).fill(faker.person.lastName());
        await this.page.getByRole('textbox', { name: 'Phone number * (min 10 digits)' }).fill(faker.phone.number());
        await this.page.getByRole('textbox', { name: 'Email address *' }).fill(faker.internet.email());

    }

    async fillOutShippingAddress() {
        await this.page.getByRole('textbox', { name: 'Company *' }).fill(faker.company.name());
        await this.page.getByRole('textbox', { name: 'Address *', exact: true }).fill(faker.location.streetAddress());
        await this.page.getByRole('textbox', { name: 'Apartment, suite, etc. * (' }).fill(faker.buildingNumber());
        await this.page.getByRole('textbox', { name: 'City *' }).fill(faker.location.city());
        await this.page.getByRole('textbox', { name: 'Country *' }).fill(faker.location.country());
        await this.page.getByRole('textbox', { name: 'Postal code *' }).fill(faker.location.zipCode());
    }
}

export { CheckoutPage };