import { getPosts, createPost, editPost, deletePost, getLoggedInUser } from "./services";
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
    publishButton.addEventListener('click', (e) => {
        e.preventDefault()
        const user = getLoggedInUser()
        console.log(user)
        createPost(quotes, user.email)
    });
    const posts = getPosts()
    console.log(posts);
    /** tareita */
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