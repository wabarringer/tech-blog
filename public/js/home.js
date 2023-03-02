// View post

document.querySelectorAll(".blog-selection").forEach((blogSelection) => {
  blogSelection.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `/api/users/${parseInt(event.target.dataset.userId)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);
      if (res.ok) {
        document.querySelector("#blog-select-content").classList.toggle("hide");
        document.querySelector("#blog-select-user").classList.toggle("hide");
        document.querySelector("#comment-form").classList.toggle("hide");
      }
    } catch (error) {}
  });
});

// Add Comment

document.querySelectorAll(".btn-comment").forEach((comment) => {
  comment.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      if (event.target.matches(".btn-comment")) {
        let commentText = event.target.parentNode.children[1].value;
        let blogId = document
          .querySelector("#comment-form")
          .getAttribute("blog-id");
        let commentNew = {
          content: commentText,
          BlogId: blogId,
        };

        const postComment = await fetch(`/api/comments/${blogId}`, {
          method: "POST",
          body: JSON.stringify(commentNew),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (postComment.ok) {
          event.target.parentNode.children[1].value = "";
          location.reload();
        }
      }
    } catch (error) {}
  });
});
