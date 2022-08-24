const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;

const app = express();

app.use(express.static("public"));

let items = ["Buy food", "Cook Food", "Eat"]; 
let workItems = [];
let leisureItems = [];

app.use(bodyParser.urlencoded({extended: true}));

app.set('view-engine', 'ejs');

app.get("/", function(req, res){

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = (today.toLocaleDateString("en-US", options));

    res.render("list.ejs", {
        listTitle: day,
        newListItems: items
    })
})

app.post("/", function(req, res){
    let item = req.body.newItem;

    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else if(req.body.list === "Leisure List"){
        leisureItems.push(item);
        res.redirect("/leisure");
    }
    else{
        items.push(item);
        res.redirect("/")
    }
    console.log(req.body);
})


app.get("/work", function(req, res){
    res.render("list.ejs", {
        listTitle: "Work List",
        newListItems: workItems
    })
})

app.get("/leisure", function(req, res){
    res.render("list.ejs", {
        listTitle: "Leisure List",
        newListItems: leisureItems
    })
})


app.listen(process.env.PORT || port, function(){
    console.log("App is running on " + port);
})

