var express = require('express');
var app = express();
var firebase = require('firebase');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); //need to parse HTTP request body

var config = {
  apiKey: "AIzaSyC2E8xYZ7Q1UKD04u8xsk8ZuVg7GQXtDdk",
  authDomain: "test-project-bb618.firebaseapp.com",
  databaseURL: "https://test-project-bb618.firebaseio.com",
  projectId: "test-project-bb618",
  storageBucket: "",
  messagingSenderId: "753412379471"
};
firebase.initializeApp(config);

//Fetch instances
app.get('/', function (req, res) {

	console.log("HTTP Get Request");
	var userReference = firebase.database().ref("/Users/");

	//Attach an asynchronous callback to read the data
	userReference.on("value", 
			  function(snapshot) {
					console.log(snapshot.val());
					res.json(snapshot.val());
					userReference.off("value");
					}, 
			  function (errorObject) {
					console.log("The read failed: " + errorObject.code);
					res.send("The read failed: " + errorObject.code);
			 });
});

//Create new instance
app.put('/', function (req, res) {

	console.log("HTTP Put Request");
  console.log(req.body)
	var userName = req.body.UserName;
	var name = req.body.Name;
	var age = req.body.Age;

	var referencePath = '/Users/'+userName+'/';
	var userReference = firebase.database().ref(referencePath);
	userReference.set({Name: name, Age: age}, 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});

//Update existing instance
app.post('/', function (req, res) {

	console.log("HTTP POST Request");
  console.log(req.body)
	var userName = req.body.UserName;
	var name = req.body.Name;
	var age = req.body.Age;

	var referencePath = '/Users/'+userName+'/';
	var userReference = firebase.database().ref(referencePath);
	userReference.update({Name: name, Age: age}, 
				 function(error) {
					if (error) {
						res.send("Data could not be updated." + error);
					} 
					else {
						res.send("Data updated successfully.");
					}
			    });
});

//Delete an instance
app.delete('/', function (req, res) {

   console.log("HTTP DELETE Request");
   //todo
});

var server = app.listen(8080, function () {
  
   var host = "localhost";
   var port = 8080;
   
   console.log("Example app listening at http://%s:%s", host, port);
});

module.exports = server;