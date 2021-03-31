const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = ["Code and Repeat"];
let workItems = [];

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
let day = date();
  res.render('list', {
    listTitle: day,
    newListItems: items,
  });
});

app.post("/", function(req, res) {

  switch (req.body.page) {
    case "work":
res.redirect("/work");
      break;
    case "about":
res.redirect("/about");
      break;
    case "home":
  res.redirect("/");
      break;
    case "Work":
    let itema = req.body.newItem;
    if (itema.trim() !== "") {
      workItems.push(itema);
      res.redirect("/work");
    }
      break;
    default:
    let itemb = req.body.newItem;
    if (itemb.trim() !== "") {
    items.push(itemb);
    res.redirect("/");
  }
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});
app.get("/about", function(req, res) {
  res.render("about");
});
app.post("/reset",function(req,res){
  if(req.body.reset==="Work"){
    workItems.splice(0, workItems.length);
    res.redirect("/work");
  }else{
    items.splice(1, items.length);
    res.redirect("/");
  }
});

app.listen(3000, function() {
  console.log("the list is flying up");
});
