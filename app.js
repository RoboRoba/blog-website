const express = require("express");
const ejs = require("ejs");

const app = express();

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let entries = [];

app.set("view engine", "ejs");

app.use(express.urlencoded());
app.use(express.static("public"));

app.get("/", function (_, res) {
  res.render("home", {
    startHome: homeStartingContent,
    entries: entries,
  });
});

app.get("/posts/:postName", function (req, res) {
  const params = req.params.postName;

  const date = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const today = date.toLocaleDateString("en-UK", options);

  entries.forEach((entry) => {
    const entryTitle = entry.title.replace(" ", "-").toLowerCase();

    if (entryTitle === params) {
      res.render("post", { title: entry.title, post: entry.post, date: today });
    }
  });
});

app.get("/about", function (_, res) {
  res.render("about", { about: aboutContent });
});

app.get("/contact", function (_, res) {
  res.render("contact", { contact: contactContent });
});

app.get("/compose", function (_, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const entry = {
    title: req.body.newEntry,
    post: req.body.entryBody,
  };

  entries.push(entry);

  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
