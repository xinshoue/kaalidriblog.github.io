function getPostId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

fetch("posts2.json")
  .then(res => res.json())
  .then(posts => {
    const postId = getPostId();
    const post = posts.find(p => p.id === postId);

    if (!post) {
      document.getElementById("post-content").innerHTML = "<p>Post not found.</p>";
      return;
    }

    document.getElementById("post-title").innerText = post.title;
    document.getElementById("post-date").innerText = post.date;
    document.getElementById("author-name").innerText = post.author;
    document.getElementById("author-avatar").src = post.avatar;
    document.getElementById("breadcrumbs").innerHTML = post.breadcrumbs;
    document.getElementById("featured-image").style.backgroundImage = `url(${post.featuredImage})`;
    document.getElementById("post-content").innerHTML = post.content;
  });
