var express=require("express");
var app=express();
var userModel=require("../models/userModel.js");
var multer=require("multer");
var upload=multer();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("currentScore",0);
app.post("/",upload.array(),function(req,res){
	var userName=req.body.playerName;
	var currentScore=0;
	userModel.save(userName,currentScore);
	res.redirect("/#/game/"+userName);
});
app.get("/:name/score",function(req,res){
	userModel.update(req.params.name,req.query.score);
	app.set("currentScore",req.query.score)
	res.redirect("/#/game/"+req.params.name+"/done");
})
app.get("/:name",function(req,res){
	userModel.getUser(req.params.name,function(data){

		data[0].currentScore=app.get("currentScore");
		res.json(data[0]);
	})
});
module.exports=app;