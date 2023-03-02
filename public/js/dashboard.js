const dashboardFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title-text").value.trim();
  const content = document.querySelector("#content-text").value.trim();
  const newPost = {
    title,
    content,
  };

  if (title && content) {
    console.log("Bringus");
    const response = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: { "Content-Type": "application/json" },
    });
  }
};

document
  .querySelector(".dashboard-form")
  .addEventListener("submit", dashboardFormHandler);
