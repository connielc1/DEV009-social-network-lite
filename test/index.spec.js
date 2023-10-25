import {
  logout,
} from '../src/lib/services.js';
// importamos la funcion que vamos a testear
/* import { myFunction } from '../src/lib/index';

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof myFunction).toBe('function');
  });
}); */
// simulacion de datos necesarios antes de correr las pruebas
beforeEach(() => {
  const users = [{ email: 'usuario@ejemplo.com', password: '123456' }];
  const loggedInUser = { email: 'usuario@ejemplo.com', password: '123456' };
  const posts = [
    { id: 'posta', content: 'contenidoa', email: 'usuarioa@ejemplo.com' },
    { id: 'postb', content: 'contenidob', email: 'usuariob@ejemplo.com' },
  ];

  // variable global simulando el comportamiento del almacenamiento local
  global.localStorage = {
    // devuelve diferentes valores dependiendo de la clave proporcionada
    getItem: jest.fn((key) => {
      switch (key) {
        case 'users':
          return JSON.stringify(users);
        case 'user':
          return JSON.stringify(loggedInUser);
        case 'posts':
          return JSON.stringify(posts);
        default:
          return null;
      }
    }),
    // guarda un valor asociado a una clave específica
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
});
// TEST para la funcion logout
describe('Logout funcion', () => {
  it('Debe cerrar la sesión del usuario de localStorage', () => {
    // Se llama a la función que se quiere testear
    logout();

    // Se verifica que removeItem haya sido llamado con el argumento correcto
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
  });
});
