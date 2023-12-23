/*alert("Hello from front-end!");
      console.log("hello from the console of from-end!");
      fetch("http://localhost:3000/show-ideas")
        .then((response) => response.json())
        .then((connection) => console.log(connection));*/

//SHOW ALL IDEAS

(async () => {
  try {
    const response = await fetch("http://localhost:3000/show-ideas");
    const ideas = await response.json();
    console.log(ideas);

    const notes = document.getElementById("notes");
    const addButton = document.getElementById("add");

    ideas.forEach((idea) => {
      const ideaElement = document.createElement("div");
      ideaElement.classList = "note";
      ideaElement.innerHTML = `
            <h3>${idea.title}</h3>
            <p>${idea.description}</p>
            <p class="created_at">${idea.created_at}</p>
            <img src="./sticky-notes.png" alt="image" style="max-width: 100%">
          `;

      const buttonContainer = document.createElement("div");
      buttonContainer.classList = "button-container";

      const deleteButton = document.createElement("button");
      deleteButton.classList = "delete";
      deleteButton.innerHTML = "Delete";
      deleteButton.title = "delete button for" + `${idea.id}`;

      const updateButton = document.createElement("button");
      updateButton.classList = "update";
      updateButton.innerHTML = "Update";
      updateButton.title = "update button for" + `${idea.id}`;

      buttonContainer.appendChild(deleteButton);
      buttonContainer.appendChild(updateButton);
      ideaElement.appendChild(buttonContainer);
      notes.appendChild(ideaElement);

      //DELETE
      deleteButton.addEventListener("click", async () => {
        console.log(idea.id);
        const response = await fetch("http://localhost:3000/delete", {
          method: "DELETE",
          body: JSON.stringify({
            id: idea.id,
          }),
          headers: { "Content-Type": "application/json; charset-UTF-8" },
        });
        const ideas = await response.json();
        if (ideas.query) location.reload();
        console.log(ideas);
      });

      //ADD

      addButton.addEventListener("click", async () => {
        console.log(idea.id);
        const response = await fetch("http://localhost:3000/add", {
          method: "POST",
          body: JSON.stringify({
            id: idea.id,
            title: idea.title,
            description: idea.description,
            created_at: idea.created_at,
          }),
          headers: { "Content-Type": "application/json; charset-UTF-8" },
        });
        const ideas = await response.json();
        if (ideas.query) location.reload();
        console.log(ideas);
      });

      //UPDATE

      updateButton.addEventListener("click", async () => {
        console.log(idea.id);
        const response = await fetch("http://localhost:3000/update", {
          method: "PATCH",
          body: JSON.stringify({
            id: idea.id,
            title: idea.title,
            description: idea.description,
            created_at: idea.created_at,
          }),
          headers: { "Content-Type": "application/json; charset-UTF-8" },
        });
        const ideas = await response.json();
        if (ideas.query) location.reload();
        console.log(ideas);
      });
    });
  } catch (error) {}
})();

/*
(async () => {
  try {
    const response = await fetch("http://localhost:3000/show-ideas");
    const ideas = await response.json();
    console.log(ideas);

    const notes = document.getElementById("notes");
    const addButton = document.getElementById("add");

    ideas.forEach((idea) => {
      const ideaElement = document.createElement("div");
      ideaElement.classList = "note";
      ideaElement.innerHTML = `
            <h3>${idea.title}</h3>
            <p>${idea.description}</p>
            <p class="created_at">${idea.created_at}</p>
            <img src="./sticky-notes.png" alt="image" style="max-width: 100%">
          `;

      const buttonContainer = document.createElement("div");
      buttonContainer.classList = "button-container";

      const deleteButton = document.createElement("button");
      deleteButton.classList = "delete";
      deleteButton.innerHTML = "Delete";
      deleteButton.title = "delete button for" + `${idea.id}`;

      const updateButton = document.createElement("button");
      updateButton.classList = "update";
      updateButton.innerHTML = "Update";
      updateButton.title = "update button for" + `${idea.id}`;

      buttonContainer.appendChild(deleteButton);
      buttonContainer.appendChild(updateButton);
      ideaElement.appendChild(buttonContainer);
      notes.appendChild(ideaElement);
    });

    // Event listeners outside the loop
    notes.addEventListener("click", async (event) => {
      const targetButton = event.target;
      if (targetButton.classList.contains("delete")) {
        const ideaId = targetButton.getAttribute("data-idea-id");
        console.log(ideaId);
        const response = await fetch("http://localhost:3000/delete", {
          method: "DELETE",
          body: JSON.stringify({
            id: ideaId,
          }),
          headers: { "Content-Type": "application/json; charset-UTF-8" },
        });
        const result = await response.json();
        if (result.query) location.reload();
        console.log(result);
      } else if (targetButton.classList.contains("update")) {
        const ideaId = targetButton.getAttribute("data-idea-id");
        console.log(ideaId);
        // Implement the update functionality here
      }
    });

    // ADD button listener
    addButton.addEventListener("click", async () => {
      // Implement the logic to add a new idea here
      console.log("Add button clicked");
    });
  } catch (error) {
    console.error(error);
  }
})();
*/

//UPDATE
/*
      async function updateIdea() {
        try {
          const response = await fetch("http://localhost:3000/ideas/:id");
          const ideas = await response.json();
          console.log(ideas);

          const notes = document.getElementById("notes");
          const buttonContainer =
            document.getElementsByClassName("button-container");

          ideas.forEach((idea) => {
            const ideaElement = document.createElement("div");
            ideaElement.classList = "note";
            ideaElement.innerHTML = `
            <h3>${idea.title}</h3>
            <p>${idea.description}</p>
            <p class="created_at">${idea.created_at}</p>
            <img src="./sticky-notes.png" alt="image" style="max-width: 100%">
            <div class="button-container">
              <button class="delete" onclick="deleteIdea('${idea.id}')">Delete</button>
            </div>

          `;

            const deleteButton = document.createElement("button");
            deleteButton.classList = "delete";
            deleteButton.innerHTML = `
          <button('${idea.id}')">Delete</button>`;

            deleteButton.addEventListener("click", () => {
              console.log(idea.id);
            });

            buttonContainer.appendChild(deleteButton);
            notes.appendChild(ideaElement);
          });
        } catch (error) {
          console.error(error);
        }
      }
      updateIdea();
      */
