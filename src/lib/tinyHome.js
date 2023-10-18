import { getPosts, createPost, editPost, deletePost, getLoggedInUser } from "./services";

function homeView(navigateTo) {
    const sectionPage = document.createElement('section');
    const formPost = document.createElement('form');
    const welcome = document.createElement('h3');
    const publishButton = document.createElement('button');
    const textArea = document.createElement('textarea');
    const contenedor = document.getElementById("contenido");

    formPost.classList.add('post-form');
    publishButton.textContent = 'Publicar';
    publishButton.classList.add('publish-button');

    let quotes;

    textArea.id = 'quotes';
    textArea.placeholder = 'Ingresa una frase:';
    textArea.addEventListener('input', (e) => {
        quotes = e.target.value;
        console.log(quotes);
    });

    publishButton.addEventListener('click', (e) => {
        e.preventDefault();
        const user = getLoggedInUser();
        quotes = textArea.value;
        createPost(quotes, user.email);
        drawQuotes(quotes);
    });

    const posts = getPosts();
    console.log(posts);
/* tareita */
    const drawQuotes = (quote) => {
        contenedor.innerHTML += `
            <div>
                <ul>
                    <li>${quote}</li>
                </ul>
            </div>
        `;
    }

    if (posts) {
        posts.forEach(element => {
            drawQuotes(element.content);
        });
    }

    formPost.appendChild(textArea);
    formPost.appendChild(publishButton);
    sectionPage.appendChild(welcome);
    sectionPage.appendChild(formPost);

    return sectionPage;
}

export default homeView;

/* buttonLogin.addEventListener('click', (e) => {
        e.preventDefault()
        register(name, email, password)
        navigateTo("/login")
    }); */ 