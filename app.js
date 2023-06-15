const express=require("express");
const bodyparser=require("body-parser");
const https=require("https");


const app=express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended:true }));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});
app.get("/features.html", function(req, res) {
    res.sendFile(__dirname + "/features.html");
  });
app.get("/docs.html", function(req, res) {
    res.sendFile(__dirname + "/docs.html");
  });
  app.get("/index.html", function(req, res){
    res.sendFile(__dirname + "/index.html")
});
app.post("/", function(req, res){
    const name=req.body.name;
    const company=req.body.company;
    const email=req.body.email;

    const data = {
        members: [
          {
            email_address: email,
            status: "subscribed",
            merge_fields: {
              FNAME: name,
              LNAME: company
            }
          }
        ]
      };

const jsonData = JSON.stringify(data);

const url = "https://us12.api.mailchimp.com/3.0/lists/75c4842a5e";
const options = {
    method: "POST",
    auth: "web:02bbabb3808c301145641763e852f3d4-us12"
};

const Request = https.request(url, options, function(response){
    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/sucess.html");
      }else{
        res.sendFile(__dirname + "/failure.html")
      }
    response.on("data", function(data){
        console.log(JSON.parse(data));
    });
});

Request.write(jsonData);
Request.end();


});
app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });

