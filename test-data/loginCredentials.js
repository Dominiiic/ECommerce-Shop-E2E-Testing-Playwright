import { faker } from '@faker-js/faker';

const loginCredentials = {
   validEmail: 'test@email.com',
   validPassword: 'taylorslow',
   invalidEmail: faker.internet.email(),
   invalidPassword: faker.internet.password(),
}

export { loginCredentials }; 