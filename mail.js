const imp=require("./form.js")
const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const request=require("request");
const app=express();
const https=require("https");
const response = require("express");
app.use(bodyParser.urlencoded({extended:true}));
app.post("/",function(req,res)
{  var firstname=req.body.fname;
    var lastname=req.body.lname;
    var email=req.body.en;  

    const detail =
    {
        members: [
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };
    const option={
        method:"POST",
        auth:imp.newauth
    }
    const jsonData = JSON.stringify(detail);
    const url = imp.ap;
const request=https.request(url,option,function(response)
{if(response.statusCode==200)
{ res.sendFile(__dirname+"/success.html");

}
else
{res.sendFile(__dirname+"/failure.html");
}
 response.on("data",function(detail)
{
    console.log(JSON.parse(detail));
    
})

})
request.write(jsonData);
request.end();
});
app.get("/",function(req,res)
{res.sendFile(__dirname+"/signup.html");

});
app.post("/failure",function(req,res)
{ res.sendFile(__dirname+"signup.html");

});

app.listen(process.env.PORT || 3000,function()
{ console.log("server is up");

});
