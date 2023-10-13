import login from "./login";
import { getPosts } from "./services";
import { createPost } from "./services";
import { editPost } from "./services";
import { deletePost } from "./services";
function homeView(navigateTo) {
    const sectionPage = document.createElement('section');
    const formPost = document.createElement('form');
    const welcome = document.createElement('h3');
    formPost.classList.add('post-form');
    let quotes;

    const inputThinking = document.createElement('input');
    inputThinking.id = 'quotes';
    inputThinking.placeholder = 'Ingresa una frase';
    inputThinking.addEventListener("input", (e) => {
        quotes = e.target.value;
    });
/* buttonLogin.addEventListener('click', async (e) => {
    e.preventDefault()
    await register(name, email, password)
    navigateTo("/login")
}); función ejemplo */ 
    welcome.textContent = '¿En qué frase piensas hoy?';

    formPost.appendChild(inputThinking);
    sectionPage.appendChild(welcome);
    sectionPage.appendChild(formPost);

    return sectionPage;
}

export default homeView;