import * as express from "express";


var app = express();

app.get("/", function(req, res) {
    //res.send("Hello, World");
    const options = {
        root: __dirname
    };
    res.sendFile("index.html", options);
});

app.listen(3000, () => console.log("Listening at http://www.lawreneclane.net:3000"));
