/**
 * @define dependencies
 * */
var express=require('express')
,app=express()
,cors=require('cors')
,port=process.env.PORT||4003
,bodyParser=require('body-parser')
/**
 * middleware
 * */
 app.use(bodyParser.json());
 app.use(cors());
 app.use(express.static('./app'));
 app.use('/',function(req,res){
   console.log(req.url);
 });
/**
 * local port to start the app
 * */
app.listen(port,function(){
  console.log('server started at'+port);
});
