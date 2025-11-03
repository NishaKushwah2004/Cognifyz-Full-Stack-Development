// src/controllers/homeController.js

export const home = (req, res) => {
  res.render("index", {
    title: "Cognifyz Task 08",
    subtitle: "Advanced Server-Side Functionality",
    time: new Date().toLocaleString(),
  });
};
