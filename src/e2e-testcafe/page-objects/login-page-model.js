import { Selector, t } from "testcafe"

class LoginPageModel{
        userNameInput = Selector('.login__email')
                .nextSibling('input')
                .withAttribute('placeholder', 'Email')
        
        userNamePassword = Selector('.login__password')
                .nextSibling('input')
                .withAttribute('placeholder', 'Lozinka')

        signInButton = Selector('.header__user')
            .find('span')
            .withText('Prijava/Registracija');

        loginButton = Selector('form > button').withText('Login')



}

export default new LoginPageModel();