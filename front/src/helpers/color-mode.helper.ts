export const autoColorMode = () => {
  try {
    const themeLS = localStorage.getItem("theme");
    let theme = "";
    if (themeLS) theme = themeLS;
    else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) theme = "theme-dark";
      else theme = "theme-light";
    }
    document.documentElement.classList.add(theme);
  } catch (error) {
    console.error("Error to set color schema");
  }
};
