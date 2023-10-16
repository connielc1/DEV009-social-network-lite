import { getPosts, createPost, editPost, deletePost } from "./services";
function homeView(navigateTo) {
    const sectionPage = document.createElement('section');
    const formPost = document.createElement('form');
    const welcome = document.createElement('h3');
    const publishButton = document.createElement('button');
    const textArea = document.createElement('textarea');

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

    

    formPost.appendChild(textArea);
    formPost.appendChild(publishButton);
    sectionPage.appendChild(welcome);
    sectionPage.appendChild(formPost);
 
    return sectionPage;
}

export default homeView;

/* buttonLogin.addEventListener('click', async (e) => {
    e.preventDefault()
    await register(name, email, password)
    navigateTo("/login")
}); función ejemplo */ 