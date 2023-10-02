function register(navigateTo) {
    const section = document.createElement('section');
    const title = document.createElement('h2');
    const buttonReturn = document.createElement('button');
    const form = document.createElement('form');
    const inputName = document.createElement('input');
    const inputEmail = document.createElement('input');
    const inputPass = document.createElement('input');
    const buttonLogin = document.createElement('button');
    const buttonAccess = document.createElement('button');
    const loginDiv = document.createElement('div');
    const loginText = document.createElement('p');

    inputName.placeholder = 'Ingresa tu nombre';
    inputEmail.placeholder = 'Escribe un mail';
    inputPass.placeholder = 'Contraseña';

    title.textContent = 'Acceder';
    buttonLogin.textContent = 'Crear cuenta';
    buttonAccess.textContent = 'Acceder'
    loginText.textContent = '¿Ya tienes una cuenta?'

    buttonReturn.textContent = 'Volver al inicio';
    buttonReturn.addEventListener('click', () => {
        navigateTo('/');
    });

    buttonAccess.addEventListener('click', () => {
        navigateTo('/login');
    });

    form.append(inputEmail, inputPass, inputName, buttonLogin);
    loginDiv.append(loginText, buttonAccess);
    section.append(title, form, loginDiv, buttonReturn);

    return section;
}

export default register;