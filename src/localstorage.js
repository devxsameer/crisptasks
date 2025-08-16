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
          checkList: [
            { task: "Choose color scheme", done: false },
            { task: "Create layout", done: false },
            { task: "Export assets", done: false },
          ],
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
            { task: "Add background image", done: false },
            { task: "Add animation", done: false },
            { task: "Test responsiveness", done: false },
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
            { task: "Build project", done: false },
            { task: "Push to GitHub", done: false },
            { task: "Enable Pages in settings", done: false },
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
            { task: "Create src folder", done: false },
            { task: "Add index.html", done: false },
            { task: "Link JS and CSS files", done: false },
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
            { task: "Create input form", done: false },
            { task: "Handle form submission", done: false },
            { task: "Render todo to DOM", done: false },
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
            { task: "Save todos", done: false },
            { task: "Load todos", done: false },
            { task: "Test persistence after refresh", done: false },
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
  function setName(name) {
    localStorage.setItem("userName", name);
  }
  function getName() {
    if (localStorage.getItem("userName")) {
      return localStorage.getItem("userName");
    } else return false;
  }
  return {
    setData,
    getData,
    setName,
    getName,
  };
})();
export default LocalStorage;
