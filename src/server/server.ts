import * as express from "express";


var app = express();

app.use(express.static("./public"));

app.get("/", function(req, res) {
    console.log(`__dirname: ${__dirname}`);
    const options = {
        root: __dirname
    };

    res.sendFile("index.html", options);
});

app.listen(3000, () => console.log("Listening at http://www.lawreneclane.net:3000"));
