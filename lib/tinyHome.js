import {
  getPosts, createPost, deletePost, getLoggedInUser, logout,
} from './services';

function homeView(navigateTo) {
  const sectionPage = document.createElement('section');
  const formPost = document.createElement('form');
  const welcome = document.createElement('h3');
  const publishButton = document.createElement('button');
  const textArea = document.createElement('textarea');
  const contenedor = document.getElementById('contenido');
  const logoutButton = document.getElementById('logoutButton');
  const logoutContainer = document.getElementById('logoutContainer');
  logoutContainer.style.visibility = 'visible';
  logoutButton.addEventListener('click', () => {
    logout();
    navigateTo('/login');
    contenedor.innerHTML = '';
  });

  formPost.classList.add('post-form');
  publishButton.textContent = 'Publicar';
  publishButton.classList.add('publish-button');

  let quotes;

  textArea.id = 'quotes';
  textArea.placeholder = 'Ingresa una frase:';
  textArea.addEventListener('input', (e) => {
    quotes = e.target.value;
  });

  const drawQuotes = (quote) => {
    contenedor.innerHTML += `
            <div class='post'>  
                <p> ${quote.email}</p>
                    <p class='user-preview'> ${quote.content}</p>
                    <div> 
                    <div class='actions'>
                <button class='edit-button'>Editar</button>
                <button class='delete-button' id=${quote.id}>Borrar</button>
                    </div>
            </div>
        `;
  };

  publishButton.addEventListener('click', (e) => {
    e.preventDefault();
    const user = getLoggedInUser();
    quotes = textArea.value;
    createPost(quotes, user.email);
    drawQuotes(quotes);
  });

  const posts = getPosts();

  if (posts) {
    posts.forEach((element) => {
      drawQuotes(element);
    });
    const deleteButtons = document.getElementsByClassName('delete-button');
    const deleteButtonsArray = Array.from(deleteButtons);
    deleteButtonsArray.forEach((button) => {
      button.addEventListener('click', (element) => {
        deletePost(element.target.id);
        const newPosts = getPosts();
        contenedor.innerHTML = '';
        newPosts.forEach((post) => {
          drawQuotes(post);
        });
      });
    });
  }

  formPost.appendChild(textArea);
  formPost.appendChild(publishButton);
  sectionPage.appendChild(welcome);
  sectionPage.appendChild(formPost);

  return sectionPage;
}

export default homeView;
