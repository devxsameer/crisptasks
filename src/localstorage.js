const LocalStorage = (() => {
  let localStorageData = [
    {
      title: "Portfolio Website",
      description: "this is some description for the project",
      todoList: [
        {
          title: "Design Wireframe",
          description: "Create a basic layout plan for the portfolio homepage.",
          dueDate: "2025-08-12",
          priority: "Medium",
          notes: "Use Figma for better design collaboration.",
          checkList: ["Choose color scheme", "Create layout", "Export assets"],
          id: crypto.randomUUID(),
        },
        {
          title: "Implement Hero Section",
          description:
            "Code the hero section with responsive design and animations.",
          dueDate: "2025-08-14",
          priority: "High",
          notes: "Ensure it works on mobile, tablet, and desktop.",
          checkList: [
            "Add background image",
            "Add animation",
            "Test responsiveness",
          ],
          id: crypto.randomUUID(),
        },
        {
          title: "Deploy to GitHub Pages",
          description:
            "Push the final build to GitHub Pages for public viewing.",
          dueDate: "2025-08-16",
          priority: "Medium",
          notes: "Check for broken links before deploying.",
          checkList: [
            "Build project",
            "Push to GitHub",
            "Enable Pages in settings",
          ],
          id: crypto.randomUUID(),
        },
      ],
    },
    {
      title: "JavaScript Todo App",
      description: "this is some description for the project",
      todoList: [
        {
          title: "Set Up Project Structure",
          description: "Create folders for modules, styles, and assets.",
          dueDate: "2025-08-11",
          priority: "High",
          notes: "Follow modular JS structure.",
          checkList: [
            "Create src folder",
            "Add index.html",
            "Link JS and CSS files",
          ],
          id: crypto.randomUUID(),
        },
        {
          title: "Implement Add Todo Feature",
          description:
            "Allow users to add todos with title, description, and priority.",
          dueDate: "2025-08-13",
          priority: "High",
          notes: "Validate inputs before adding.",
          checkList: [
            "Create input form",
            "Handle form submission",
            "Render todo to DOM",
          ],
          id: crypto.randomUUID(),
        },
        {
          title: "Add Local Storage Support",
          description: "Save and load todos from browser localStorage.",
          dueDate: "2025-08-15",
          priority: "Medium",
          notes: "Convert todos array to JSON before saving.",
          checkList: [
            "Save todos",
            "Load todos",
            "Test persistence after refresh",
          ],
          id: crypto.randomUUID(),
        },
      ],
    },
  ];
  function setData(data) {
    localStorage.setItem("crispTasks", JSON.stringify(data));
    localStorageData = data;
  }
  function getData() {
    if (localStorage.getItem("crispTasks")) {
      localStorageData = JSON.parse(localStorage.getItem("crispTasks"));
    } else {
      setData(localStorageData);
    }
    return localStorageData;
  }
  return {
    setData,
    getData,
  };
})();
export default LocalStorage;
