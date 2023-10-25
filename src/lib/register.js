import {
  register,
} from './services';

function registerView(navigateTo) {
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
  const logoutContainer = document.getElementById('logoutContainer');
  logoutContainer.style.visibility = 'hidden';

  inputName.id = 'nombre';
  inputEmail.id = 'mail';
  inputPass.id = 'contraseña';

  inputName.placeholder = 'Ingresa tu nombre';
  inputEmail.placeholder = 'Escribe un mail';
  inputPass.placeholder = 'Contraseña';
  inputPass.type = 'password';

  title.textContent = 'Acceder';
  buttonLogin.textContent = 'Crear cuenta';
  buttonAccess.textContent = 'Acceder';
  loginText.textContent = '¿Ya tienes una cuenta?';

  let name;
  let email;
  let password;

  buttonReturn.textContent = 'Volver al inicio';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });
  buttonAccess.addEventListener('click', () => {
    navigateTo('/login');
  });
  inputName.addEventListener('input', (e) => {
    name = e.target.value;
  });
  inputEmail.addEventListener('input', (e) => {
    email = e.target.value;
  });
  inputPass.addEventListener('input', (e) => {
    password = e.target.value;
  });
  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();
    register(name, email, password);
    navigateTo('/login');
  });

  form.append(inputEmail, inputPass, inputName, buttonLogin);
  loginDiv.append(loginText, buttonAccess);
  section.append(title, form, loginDiv, buttonReturn);

  return section;
}

export default registerView;
