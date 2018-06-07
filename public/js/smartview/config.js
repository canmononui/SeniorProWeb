
var socket = io();
var app = angular.module('bed',[]);

var id=getQueryVariable("id");
var mac=getQueryVariable("mac");
console.log(mac);
function edit(){
        location.href='/edit?id='+id;
}
if(id==false){
       location.href='/';
}
var d = new Date();
var n = d.getHours();
var s = d.getMinutes();
var time=n+":"+s
console.log(time);
app.controller("sensor", function ($scope,$http){
        socket.on('sender',function(docs){
		$scope.$apply(function(){
                        
                        if(docs.mac==mac){
                                $scope.output = docs;
                                if(docs.lie==1){
                                                $scope.img="/img/ท่านอน1.png";
                                        }
                                        else if(docs.lie==2){
                                                $scope.img="/img/ท่านอน2.png";
                                        }
                                        else if(docs.lie==3){
                                                $scope.img="/img/ท่านอน3.png";
                                        }
                                }
		})		
        });
        // $scope.img="/img/normal.png"
        // $scope.img="/img/danger.png"
        $scope.img="/img/ท่านอน1.png";
        $scope.time=time;
$http({
        method : 'GET',						//method get
        url : '/member'				// url getLastAction
    }).then(function mySucces(response){ 
                        $scope.arrId=response.data
                        var sum=$scope.arrId.length;
                        var i=0
                        for(i=0;i<sum;i++){
                           var arr=$scope.arrId[i];
                           if(arr._id==id){
                                $scope.name=arr.name+"   "+arr.surname;
                                $scope.tel=arr.tel;
                                $scope.medic=arr.medoc_his
                                $scope.drug=arr.drug;
                                $scope.mac=arr.mac
                                $scope.email=arr.email
                                $scope.password=arr.password
                        }else{} 
                }
    });

    $scope.start=function(){
        var r = confirm("เริ่มจับเวลา");
        if(r == true ){
                           alert("start");
            } 
    }
    $scope.pause=function(){
        var r = confirm("หยุดเวลา");
        if(r == true ){
                           alert("pause");
            } 
    }
    
    $scope.back=function(data,data2){
        location.href='/medic?id='+id;
    }
    $scope.remove=function(){
        var r = confirm("ต้องการจะลบใช่หรือไม่");
        if(r == true ){
        console.log(id);
         socket.emit('remove',id);
         location.href='/medic?id='+"99";
        }
    }
  


},function myError(response) {// ถ้า err 
        		console.log('error55');
		});
            
    
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
