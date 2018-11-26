var express = require('express');
var router = express.Router();
var async = require('async');
var DbClient = require('mariasql');                   //MariaDB Connection
var jsxapi = require('jsxapi');                     //ciscoLib
var fs = require('fs');                             //파일시스템
var path = require('path');                         //path 관련?
var Client = require('ssh2').Client;

var greetFunction = require(__basedir+'/test/some.js')
var inRoom = require(__basedir+'/custom_module/InRoomModule.js')
var contents = fs.readFileSync(__basedir+"/source/endPointList.json");
var jsonContent = JSON.parse(contents);
var epList = jsonContent["endPointList"];
var async = require('async');

function callInRoom(ep){
  new inRoom(ep);
}

async.each(epList,callInRoom,function(err,result){
  console.log('parallel Done');
});


/* GET home page. */


router.post('/inRoomCalls',function(req,res,next){

  // let ep_ip = req.body['epip'];
  // let call_id = req.body['callId'];
  // let ep_id = req.body['id'];
  // let ep_pw = req.body['pw'];
  //
  // const xapi = jsxapi.connect("ssh://"+ep_ip, {
  //   username: ep_id,
  //   password: ep_pw
  // });
  //
  // xapi.on('error', (err) => {
  //     console.error(`connection failed: ${err}, exiting`);
  //     //process.exit(1);
  // });

  res.statuscode = 200
  res.json(200,{"result":"success"})
});


// router.post('/',function(req,res,next){
//   const xapi = jsxapi.connect("ssh://192.168.0.7", {
//     username: 'admin',
//     password: ''
//   });
//
//   xapi.on('error', (err) => {
//       console.error(`connection failed: ${err}, exiting`);
//       process.exit(1);
//   });
//
//   //xapi.xCommand('UserInterface Message Alert Display',{Text: "Text"});
//   xapi.command('UserInterface Message Alert Display',{Text: "Text"});
//
// });

router.get('/', function(req, res, next) {

  //console.log(req);


  // var xapi = jsxapi.connect('ssh://' + self.endpoint.ip, {
  //     username: self.endpoint.id,
  //     password: self.endpoint.password,
  //     keepaliveInterval : 4000
  // });


  //   var endPointList = [];
  //
  //   function sshTest(data){
  //
  //       var ip = data['ip'];
  //       var username = data['id'];
  //       var pass = data['password'];
  //       console.log("data",ip,",",username,",",pass);
  //
  //       var conn = new Client();
  //       conn.on('ready', function() {
  //           console.log('Client :: ready');
  //           conn.exec('uptime', function(err, stream) {
  //               if (err) throw err;
  //               stream.on('close', function(code, signal) {
  //                   console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
  //                   conn.end();
  //               }).on('data', function(data) {
  //                   console.log('STDOUT: ' + data);
  //               }).stderr.on('data', function(data) {
  //                   console.log('STDERR: ' + data);
  //               });
  //           });
  //       }).connect({
  //           host: ip,
  //           port: 22,
  //           username: username,
  //           password: pass
  //       });
  //   }
  //
  //
  //
  //
  //   var tasks = [
  //       function(callback){
  //
  //           var contents = fs.readFileSync(__basedir+"/source/endPointList.json");
  //           var jsonContent = JSON.parse(contents);
  //           var epList = jsonContent["endPointList"];
  //
  //           for(var i=0;i<epList.length;i++){
  //               //console.log(epList[i]);
  //               //sshTest(epList[i]);
  //           }
  //
  //           setTimeout(function(){
  //               //DB연결
  //               console.log('one',new Date());
  //
  //               var c = new DbClient({
  //                   host: '182.237.86.248',
  //                   user: 'cmsuser',
  //                   password: 'cmsuser',
  //                   db:'kotech_cisco_cms'
  //               });
  //
  //               //장비목록 조회
  //               c.query('SELECT * FROM cms_endpoint', function(err, rows) {
  //                 if (err)
  //                     throw err;
  //                 var rowList = rows;
  //                 for(var i=0;i<rowList.length;i++){
  //                     console.log(i," : ",rowList[i]['ip']);
  //                     endPointList.push(rowList[i]['ip']);
  //                 }
  //               });
  //
  //               c.end();
  //               callback(null,'one-1','one-2');
  //         },200)
  //       },
  //       function(callback){
  //           setTimeout(function(){
  //               console.log('two',new Date());
  //               console.log("endPoitList : ",endPointList);
  //               callback(null,'two');
  //         },100);
  //       }
  //   ];
  //
  //   async.series(tasks,function(err,results){
  //     console.log(results);
  //   });
  //
  //   async.parallel([
  //       function(callback){
  //           //console.log('zero_parallel',new Date());
  //           setTimeout(function(){
  //               //DB연결
  //               console.log('one',new Date());
  //
  //               var c = new DbClient({
  //                   host: '182.237.86.248',
  //                   user: 'cmsuser',
  //                   password: 'cmsuser',
  //                   db:'kotech_cisco_cms'
  //               });
  //
  //               //장비목록 조회
  //               c.query('SELECT * FROM cms_endpoint', function(err, rows) {
  //                   if (err)
  //                       throw err;
  //                   var rowList = rows;
  //                   for(var i=0;i<rowList.length;i++){
  //                       //console.log(i," : ",rowList[i]['ip']);
  //                       endPointList.push(rowList[i]['ip']);
  //                   }
  //               });
  //
  //               c.end();
  //               callback(null,'one-1','one-2');
  //           },200)
  //       },
  //       function(callback){
  //           setTimeout(function(){
  //               //console.log('two',new Date());
  //               //console.log("endPoitList : ",endPointList);
  //               callback(null,'two');
  //           },100);
  //       }
  //
  //   ],function(err,results){
  //       console.log(results,'in',new Date().getTime());
  //   });
  //
   res.render('index', { title: 'Express' });
});



module.exports = router;
