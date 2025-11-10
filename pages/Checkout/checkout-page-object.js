class CheckoutPage {
    constructor(page) {
        this.page = page;
    }

    async fillOutCheckoutForm() {
        await this.page.getByRole('textbox', { name: 'Name * (min 2 characters)', exact: true }).fill('John Doe');
        await this.page.getByRole('textbox', { name: 'Lastname * (min 2 characters)' }).fill('Smith');
        await this.page.getByRole('textbox', { name: 'Phone number * (min 10 digits)' }).fill('1234567890');
        await this.page.getByRole('textbox', { name: 'Email address *' }).fill('test@email.com');

    }
}

export { CheckoutPage };