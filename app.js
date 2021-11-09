const express = require("express");
const app = express();
const mysql = require("mysql");

const port = process.env.PORT || 3000;

// Connection Details
const connection = mysql.createConnection({
	host: "us-cdbr-east-04.cleardb.com",
	user: "b392262f4cfdfd",
	password: "7c4ae6ca",
	database: "heroku_f7227624a830ae6",
}); connection.connect(function (error) {
	if (!!error) console.log(error);
	else console.log("SQL Database Connected!");
}); 

// View engine
app.set("view engine", "ejs");

// Render Home Page
app.get("/", function (req, res) {
	connection.query('SELECT * FROM user WHERE id = "1"', (error, rows) => {
		if (error) throw error;

		if (!error) {
			console.log(rows);
			res.render("index", { rows });
		}
	});
});

app.listen(port);
console.log(`Server is listening on port ${port}`);
