var express = require('express');
var app    = express();
var server = require('http').Server(app);
var path = require('path');
var net = require('net');
var location = require('location-href')
//--------------------

//-----------------
// socket.io
var io = require('socket.io').listen(server);
//
var mongojs = require('mongojs');

var databaseUrl ='bed'; //ชื่อ database
var collections=['smart','admin_id','member']; //รวม object
var db = mongojs(databaseUrl, collections);//object ของ db
var ObjectId = require('mongojs').ObjectID
// db


var indexpage='/views/index.html';
var register='/views/register.html';
var main='/views/main.html';
var his='/views/medic.html';
var smartview='/views/smartview.html';
var admin='/views/admin.html';
var edit='/views/edit.html';
//************************************* */

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');

var d = new Date();
var n = d.getHours();
var s = d.getMinutes();
var x = d.getSeconds();
var value="WET"
var control={"switch":3}
//*********************************** */s
server.listen(8080,function() {

console.log("Server start")
console.log("Server Port : 8080");
});

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+indexpage));
});
app.get('/main',function(req,res){
  res.sendFile(path.join(__dirname+main));
});
app.get('/register',function(req,res){
  res.sendFile(path.join(__dirname+register));
});
app.get('/medic',function(req,res){
  res.sendFile(path.join(__dirname+his));
})
app.get('/smartview',function(req,res){
  res.sendFile(path.join(__dirname+smartview));
})
app.get('/admin',function(req,res){
  res.sendFile(path.join(__dirname+admin));
})
app.get('/edit',function(req,res){
  res.sendFile(path.join(__dirname+edit));
})



app.get('/member',function(req,res){
  db.member.find(function(err, docs){ 
    if(docs!=null){
        res.json(docs)
    }
    else{
       console.log('member error');
       return;
    }
  });
})

app.get('/admin_id',function(req,res){
  db.admin_id.find(function(err, docs){ 
    if(docs!=null){
        res.json(docs)
    }
    else{
       console.log('admin error');
       return;
    }
  });
})

io.on('connection', function(socket){
  socket.on('register', function(data){
      console.log(data);
    
        db.member.insert({name:data.name,surname:data.surname,tel:data.Tel,medoc_his:data.medoc_his,drug:data.drug,email:data.email,password:data.password,mac:data.mac}); 
 });
});
io.on('connection', function(socket){
  socket.on('edit', function(data){
     
     
        var id=data.id;   
          if(data.names!=undefined){
          db.member.update({'_id':ObjectId(id)},{ $set :{name:data.names}});
          }
          if(data.surname!=undefined){
            db.member.update({'_id':ObjectId(id)},{ $set :{surname:data.surname}});
            }
            if(data.Tel!=undefined){
              db.member.update({'_id':ObjectId(id)},{ $set :{tel:data.Tel}});
              }
              if(data.medoc_his!=undefined){
                db.member.update({'_id':ObjectId(id)},{ $set :{medoc_his:data.medoc_his}});
                }
                if(data.drug!=undefined){
                  db.member.update({'_id':ObjectId(id)},{ $set :{drug:data.drug}});
                  }
                if(data.mac!=undefined){
                  db.member.update({'_id':ObjectId(id)},{ $set :{mac:data.mac}});
                  }
                  if(data.email!=undefined){
                    db.member.update({'_id':ObjectId(id)},{ $set :{email:data.email}});
                    }
                    if(data.password!=undefined){
                      db.member.update({'_id':ObjectId(id)},{ $set :{password:data.password}});
                      
                      }
  

      });
});
io.on('connection', function(socket){
  socket.on('remove', function(data){
        var id=data;
        console.log(id)
        db.member.remove({"_id": ObjectId(id)},function(err) {
          if (!err) console.log(+'    deleted!');
  });
});
});

//-----------------------> input && output  <--------------------//
io.on('connection', function(socket){
  socket.on('start', function(data){
   control.switch=data;
   console.log(control);
   setTimeout(function(){ control.switch=3;       console.log(control); }, 1000);
   
  });
});
io.on('connection', function(socket){
  socket.on('pause', function(data){
    control.switch=data;
    console.log(control);
    setTimeout(function(){ control.switch=3;      console.log(control);}, 1000);
  
  });
});
io.on('connection', function(socket){
  socket.on('stoptime', function(data){
    control.switch=data;
    console.log(control);
    setTimeout(function(){ control.switch=3;      console.log(control);}, 1000);
  
  });
});
// io.on('connection', function(socket){
//   object={"mac":"1","hum":"WET","time":"02:01","lie":"2","force":"1","stop":"1"}
//   if(object.stop==0){
    
//   }
//   io.sockets.emit('sender',object);
// });
var tcpServer = net.createServer(function(socket){
  console.log('TCP Server Running on Port:1337');
});
tcpServer.on('connection',function(socket){
    socket.write('Connected to the TCP Server\r\n')
    socket.on('data',function(data){ // data TCP Connected
          var sensor = JSON.parse(data);
              object={"mac":sensor.mac,"hum":sensor.hum,"time":sensor.time,"lie":sensor.lie,"force":sensor.force,"stop":sensor.stop}
              console.log(object);
              io.sockets.emit('sender',object);
              socket.write('btnphone'+control.switch+'\n');
    });
});
tcpServer.listen(1338);
