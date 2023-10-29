function attachEvents() {
  const postsSection = document.getElementById("posts");
  const postTitleElement = document.getElementById("post-title");
  const postBodyElement = document.getElementById("post-body");
  const ulElement = document.getElementById("post-comments");
  const btnLoadPosts = document.getElementById("btnLoadPosts");
  const btnViewPost = document.getElementById("btnViewPost");

  let commonData;

  btnLoadPosts.addEventListener("click", requestLoadPosts);
  btnViewPost.addEventListener("click", viewPostHandler);

  function requestLoadPosts() {
    const postsUrl = `http://localhost:3030/jsonstore/blog/posts`;
    fetch(postsUrl)
      .then((res) => res.json())
      .then((data) => addPosts(data));

    function addPosts(data) {
      commonData = data;
      postsSection.innerHTML = "";
      Object.values(data).forEach((post) => {
        const option = document.createElement("option");
        option.id = post.id;
        option.textContent = post.title;
        postsSection.appendChild(option);
      });
    }
  }

  function viewPostHandler() {
    let selectedPostId = postsSection.selectedOptions[0].id;
    postTitleElement.textContent = postsSection.selectedOptions[0].value;
    const bodyElement = Object.values(commonData).find((x) => x.title == postTitleElement.textContent);
    postBodyElement.textContent = bodyElement.body;

    const commentsUrl = `http://localhost:3030/jsonstore/blog/comments`;
      fetch(commentsUrl)
        .then((res) => res.json())
        .then((data) => addComments(data));

    function addComments(data) {
      ulElement.innerHTML = '';
      const comments = Object.values(data);
      comments.forEach(comment => {
        if (selectedPostId == comment.postId) {
          const liElement = document.createElement('li');
          liElement.textContent = comment.text;
          liElement.id = comment.id;
          ulElement.appendChild(liElement)
        }
      })
    }
  }
}
attachEvents();
