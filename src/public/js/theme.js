const savedTheme = localStorage.getItem("theme");
const root = document.documentElement;
if (savedTheme) root.dataset.theme = savedTheme;