function createHome(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const button = document.createElement('button');

  button.textContent = 'Ingresa';
  button.addEventListener('click', () => {
    navigateTo('/register');
  });

  title.textContent = '¡Bienvenid@!';

  section.append(title, button);
  return section;
}

export default createHome;
