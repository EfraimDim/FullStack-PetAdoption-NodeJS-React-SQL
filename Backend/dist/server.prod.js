"use strict";var app=require("./app"),_require=require("./lib/mysql"),postgrator=_require.postgrator,port=process.env.PORT||5e3;postgrator.migrate().then(function(r){console.log("migrated succesfully!",r),app.listen(port,function(){console.log("Listening on port ".concat(port,"..."))})}).catch(function(r){return console.error(r)});