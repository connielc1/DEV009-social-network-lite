import { login } from "./services";
let email;
let password;

function loginPage(navigateTo) {
    const section = document.createElement('section');
    const title = document.createElement('h2');
    const buttonReturn = document.createElement('button');
    const form = document.createElement('form');
    const inputEmail = document.createElement('input');
    const inputPass = document.createElement('input');
    const buttonLogin = document.createElement('button');

    inputEmail.placeholder = 'Escribe un mail';
    inputPass.placeholder = 'Contraseña';
    inputPass.type = "password";

    inputEmail.id = 'mail';
    inputPass.id = 'contraseña';

    title.textContent = 'Acceder';
    buttonLogin.textContent = '¡Vamos!';

    buttonReturn.textContent = 'Volver al inicio';
    buttonReturn.addEventListener('click', () => {
        navigateTo('/');
    });
    inputEmail.addEventListener("input", (e) => {
        email = e.target.value;
    });
    inputPass.addEventListener("input", (e) => {
        password = e.target.value;
    });
    buttonLogin.addEventListener('click', () => {
        login(email, password)
        navigateTo('/tinyHome');
    });


    form.append(inputEmail, inputPass, buttonLogin);
    section.append(title, form, buttonReturn);

    return section;
}

export default loginPage;
