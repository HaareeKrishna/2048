var express=require("express");
var app=express();
var game=require("./app/routes/game.js")
app.use(express.static(__dirname+'/public'))
app.use("*",function(req,res){
	res.sendFile("./public/")
});
app.use("/game",game);
app.listen(8086);
