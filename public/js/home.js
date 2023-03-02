// View post

// document.querySelectorAll(".blog-selection").forEach((blogSelection) => {
//   blogSelection.addEventListener("click", async (event) => {
//     event.preventDefault();
//     console.log(event.target.getAttribute("blogId"));
//     try {
//       const res = await fetch(
//         `/api/blogs/${event.target.getAttribute("blogId")}`,
//         {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       console.log(res);
//       if (res.ok) {
//         document.querySelector("#blog-select-content").classList.toggle("hide");
//         document.querySelector("#blog-select-user").classList.toggle("hide");
//         document.querySelector("#comment-form").classList.toggle("hide");
//       }
//     } catch (error) {}
//   });
// });

// Add Comment

document.querySelectorAll(".btn-comment").forEach((comment) => {
  comment.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log("Hello");

    try {
      let commentText = document.querySelector("#comment-text").value;
      let blogId = event.target.getAttribute("data-blogId");
      if (event.target.matches(".btn-comment")) {
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
          commentText = "";
          location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
});
