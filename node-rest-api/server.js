const express = require ('express');
const cors = require("cors");
const routes_react = require('./routes/routes'); // import the routes
const app = express();

var APIport = "1000"
var APIurl = "http://localhost:3000"
var corsOptions = { origin: APIurl };

app.use(cors(corsOptions));
app.use(express.json());
app.use("/react_app_api/", routes_react); //to use the routes

const listener = app.listen(process.env.PORT || APIport, () => {

    console.log('Your app is listening on port ' + listener.address().port)

})