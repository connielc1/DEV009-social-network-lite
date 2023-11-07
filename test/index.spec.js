import {
  init, logout, register, login, getLoggedInUser, createPost, getPosts, deletePost,
} from '../src/lib/services.js';
/* ejemplo de función para usar:
describe('myFunction', () => {
it('debería ser una función', () => {
  expect(typeof myFunction).toBe('function');
});
}); */

// Simulación de datos necesarios antes de ejecutar tests
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
// Test 1: para función init
describe('init funcion', () => {
  it('Debe borrar el localStorage', () => {
    init();
    expect(localStorage.clear).toHaveBeenCalled();
  });
});
// Test cierre de sesión: para la función de logout
describe('Logout funcion', () => {
  it('Debe cerrar la sesión del usuario de localStorage', () => {
    logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
  });
});
// Test de registro: para la función de register
describe('Register funcion', () => {
  it('Debe registrar un nuevo usuario', () => {
    localStorage.getItem.mockReturnValueOnce(null);
    const result = register('usuario@ejemplo.com', '123456');
    expect(result).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('users', JSON.stringify([{ email: 'usuario@ejemplo.com', password: '123456' }]));
  });
});
// Test de ingreso: para la función de login
describe('Login funcion', () => {
  it('Debe devolver true para credenciales válidas', () => {
    const result = login('usuario@ejemplo.com', '123456');

    expect(result).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify({ email: 'usuario@ejemplo.com', password: '123456' }));
  });
});
// Test de ingreso con usuario: para la función de getLoggedInUser
describe('getLoggedInUser funcion', () => {
  it('Debe devolver el usuario conectado ', () => {
    const result = getLoggedInUser();
    expect(result).toEqual({ email: 'usuario@ejemplo.com', password: '123456' });
  });
});
// Test de crear publicación: para la función createPost
describe('createPost funcion', () => {
  it('Debe crear un post', () => {
    const id = createPost('validpost', 'usuario@ejemplo.com');
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);

    const existingPosts = [
      { id: 'posta', content: 'contenidoa', email: 'usuarioa@ejemplo.com' },
      { id: 'postb', content: 'contenidob', email: 'usuariob@ejemplo.com' },
    ];

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'posts',
      JSON.stringify([...existingPosts, { id, content: 'validpost', email: 'usuario@ejemplo.com' }]),
    );
  });

  it('Debe guardar los posts en el localStorage', () => {
    const beforePosts = [{
      id: 'anID',
      content: 'beforecontent',
      email: 'before@example.com',
    }];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(beforePosts));

    const id = createPost('textArea', 'usuario@ejemplo.com');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'posts',
      JSON.stringify([...beforePosts, { id, content: 'textArea', email: 'usuario@ejemplo.com' }]),
    );
  });
});
// Test de publicación: para la función getPosts
describe('getPosts funcion', () => {
  it('Retorna un array vacío si no hay entradas en localStorage', () => {
    // Mock para simular que no hay posts en localStorage
    localStorage.getItem.mockReturnValueOnce(null);

    const result = getPosts();
    expect(result).toEqual([]);
  });

  it('Retorna un array con los posts si existen en localStorage', () => {
    const mockPosts = [
      { id: 'posta', content: 'contenidoa', email: 'usuarioa@ejemplo.com' },
      { id: 'postb', content: 'contenidob', email: 'usuariob@ejemplo.com' },
    ];

    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockPosts));

    const result = getPosts();
    expect(result).toEqual(mockPosts);
  });
});
// Test para eliminar: para la función deletePost
describe('deletePost function', () => {
  it('Debe eliminar el post seleccionado', () => {
    const initialPosts = [
      { id: 'posta', content: 'contenidoa', email: 'usuarioa@ejemplo.com' },
      { id: 'postb', content: 'contenidob', email: 'usuariob@ejemplo.com' },
      { id: 'postc', content: 'contenidoc', email: 'usuariob@ejemplo.com' },
    ];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(initialPosts));
    const resultPosts = [
      { id: 'posta', content: 'contenidoa', email: 'usuarioa@ejemplo.com' },
      { id: 'postb', content: 'contenidob', email: 'usuariob@ejemplo.com' },
    ];

    const result = deletePost('postc');
    expect(result).toEqual(resultPosts);
  });
});
