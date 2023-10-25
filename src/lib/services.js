/*
  This function should clear all data from local storage
*/
export const init = () => {
  localStorage.clear();
};

/*
  This function should return true if the user exists
  It should return false if the user does not exist
*/
export const login = (email, password) => {
  const usersStr = localStorage.getItem("users");
  if (usersStr) {
    const users = JSON.parse(usersStr);
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
  }
  else {
    return false;
  }
}

/*
  This function should return the logged in user
  It should return null if there is no logged in user
*/
export const getLoggedInUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return JSON.parse(userStr);
  }
  else {
    return null;
  }
}

/*
  This function should log out the user
*/
export const logout = () => {
  localStorage.removeItem("user");
}

/*
  This function should register a new user
  It should return true if the user was registered successfully
  It should throw an error if the user already exists
*/
export const register = (email, password) => {
  //check email regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email");
  }
  //check password length
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  //check if user already exists
  let users = [];
  const usersStr = localStorage.getItem("users");
  if (usersStr) {
    users = JSON.parse(usersStr);
  }
  const user = users.find(user => user.email === email);
  if (user) {
    throw new Error("User already exists");
  }
  else {
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  }
}

/*
  This function should return an array of posts
  Each post should have the following structure:
  {
    id: string,
    content: string,
    email: string
  }
*/
export const getPosts = () => {
  const postsStr = localStorage.getItem("posts");
  if (postsStr) {
    return JSON.parse(postsStr);
  }
  else {
    return [];
  }
}

/*
  This function should create a new post and return its id
  The post should have the following structure:
  {
    id: string,
    content: string,
    email: string
  }
*/
export const createPost = (content, email) => {
  //check content length
  if (content.length < 1) {
    throw new Error("Content must be at least 1 character long");
  }
  //check email regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email");
  }
  const id = Math.random().toString(36).substr(2, 9);
  let posts = [];
  const postsStr = localStorage.getItem("posts");
  if (postsStr) {
    posts = JSON.parse(postsStr);
  }
  posts.push({ id, content, email });
  localStorage.setItem("posts", JSON.stringify(posts));
  return id;
}

/*
  This function should edit the content of a post
  It should throw an error if the post does not exist
*/
export const editPost = (idPost, content) => {
  //check content length
  if (content.length < 1) {
    throw new Error("Content must be at least 1 character long");
  }
  const postsStr = localStorage.getItem("posts");
  if (postsStr) {
    const posts = JSON.parse(postsStr);
    const post = posts.find(post => post.id === idPost);
    if (post) {
      post.content = content;
      localStorage.setItem("posts", JSON.stringify(posts));
    }
    else {
      throw new Error("Post does not exist");
    }
  }
  else {
    throw new Error("Post does not exist");
  }
}

/*
  This function should delete a post
  It should throw an error if the post does not exist
*/
export const deletePost = (idPost) => {
  const postsStr = localStorage.getItem("posts");
  if (postsStr) {
    const posts = JSON.parse(postsStr);
    const post = posts.find(post => post.id === idPost);
    if (post) {
      const index = posts.indexOf(post);
      posts.splice(index, 1);
      localStorage.setItem("posts", JSON.stringify(posts));
    }
    else {
      throw new Error("Post does not exist");
    }
  }
  else {
    throw new Error("Post does not exist");
  }
}
