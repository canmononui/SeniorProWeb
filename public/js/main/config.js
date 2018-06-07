
var socket = io();
var app = angular.module('bed',[]);
var id=getQueryVariable("id");
var mac=getQueryVariable("mac");
var res={"mac":"","hum":"NONE","time":"NONE","lie":"none","force":"none"};
if(id==false){
       location.href='/';
}
var t=0;
app.controller("sensor", function ($scope,$http){
        $scope.docs = res;
        $scope.img="/img/no.png";
        $scope.guide="Loading";
        $scope.t=0
        socket.on('sender',function(docs,err){

                $scope.$apply(function(){
                      
                        if(docs.mac==mac){
                               
                                if(docs.lie==1&&docs.force!=0){
                                        if(docs.stop==1){
                                                docs.time="STOP"
                                        }
                                
                                        $scope.img="/img/ท่า1.png";
                                        $scope.docs = docs;
                                        $scope.guide="LIE SUPINE"
                                        
                                }
                                else if(docs.lie==2&&docs.force!=0){
                                        if(docs.stop==1){
                                                docs.time="STOP"
                                        }
                                        $scope.img="/img/ท่า2.png";
                                        $scope.docs = docs;
                                        $scope.guide="LIE ON YOUR LEFT"
                                }
                                else if(docs.lie==3&&docs.force!=0){
                                        if(docs.stop==1){
                                                docs.time="STOP"
                                        }
                                        $scope.img="/img/ท่า3.png";
                                        $scope.docs = docs;
                                        $scope.guide="LIE ON YOUR RIGHT"
                                }else{
                                        $scope.docs = res;
                                        $scope.img="/img/no.png";
                                        $scope.guide="NO ONE SLEEP ON BED"
                                }  
                                
                                if(docs.stop==1){
                                       
                                        if(t==0){
                                                t=1;
                                                var x = confirm("กรุณาเปลี่ยนท่านอน");
                                        }else{

                                        }
                                                
                                        if(x == true){
                                                        socket.emit('stoptime',4);
                                                    }else{
                                                    
                                                
                                                } 
                                            }else{}  
                                             
                                                    
                        }else{
                                $scope.docs = res;
                                $scope.img="/img/no.png";
                                $scope.guide="NO ONE SLEEP ON BED"   
                        }

                      
                })
     
        });
$http({
        method : 'GET',				//method get
        url : '/member'				// url getLastAction
    }).then(function mySucces(response){
                        $scope.arrId=response.data;
                        var sum=$scope.arrId.length;
                        var i=0;
                        for(i=0;i<sum;i++){
                           var arr=$scope.arrId[i];
                           if(arr._id==id){
                                $scope.bed_name=arr.name+"   "+arr.surname;     
                }
        }
    });
$scope.start=function(){
        var r = confirm("เริ่มจับเวลา");
        if(r == true ){
                        socket.emit('start',1);
                }
            } 
    
$scope.pause=function(){
        var r = confirm("หยุดเวลา");
        if(r == true ){
                socket.emit('pause',0);
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
