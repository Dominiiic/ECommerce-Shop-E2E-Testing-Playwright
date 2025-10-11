
class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Email address' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.errorMessage = page.getByText('Invalid email or password').last();
    }

    async loginWithInvalidEmailValidPassword(invalidEmail, validPassword) {
        await this.invalidLogin(invalidEmail, validPassword);
    }

    async loginWithValidEmailInvalidPassword(validEmail, invalidPassword) {
        await this.invalidLogin(validEmail, invalidPassword);
    }

    async loginWithInvalidEmailInvalidPassword(invalidEmail, invalidPassword) {
        await this.invalidLogin(invalidEmail, invalidPassword);
    }

    // Helper method for all invalid login
    async invalidLogin(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}

export { LoginPage };