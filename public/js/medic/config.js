
var socket = io();
var app = angular.module('bed',[]);

var id=getQueryVariable("id");

if(id==false){
       location.href='/';
}

app.controller("sensor", function ($scope,$http){
  
        $scope.img="/img/ท่านอน.png";
$http({
        method : 'GET',						//method get
        url : '/member'				// url getLastAction
    }).then(function mySucces(response){ 
                        $scope.arrId=response.data
                        var sum=$scope.arrId.length;
                        var i=0
                        for(i=0;i<sum;i++){
                           var arr=$scope.arrId[i];
                           $scope.test =response.data;
                }
    });

    $scope.view=function(data,data2){
        location.href='/smartview?id='+data+"&&mac="+data2;
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
