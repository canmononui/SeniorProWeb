
var socket = io();
var app = angular.module('bed',[]);

function checklogin() {
        if (document.getElementById('email').value == "") {
                alert('กรุณาระบุ Email');
                return false;
        }
        if(document.getElementById('pass').value == "") {
                alert('กรุณาระบุ Password');
                return false;
        }
}
app.controller("sensor", function ($scope,$http){
        // socket.on('pageload',function(docs){
	// 	$scope.$apply(function(){
	// 		$scope.output = docs;
	// 	})		
        // });
    
$http({
        method : 'GET',						//method get
        url : '/admin_id'				// url getLastAction
    }).then(function mySucces(response){ 
                        $scope.arrId=response.data
        // console.log($scope.arrId.length);
    	
},function myError(response) {// ถ้า err 
        		console.log('error55');
		});

    $scope.submit=function(){
         var i=0;
            console.log($scope.email+"     "+$scope.pass);
            while(i<$scope.arrId.length){
                var arr=$scope.arrId[i];
            
                if(arr.email==$scope.email&&arr.password==$scope.pass){
                        if(arr.email=="admin"){
                                location.href='/medic?id='+arr._id;
                                return
                        }else{

                        location.href='/main?id='+arr._id;
                                     
                        return
                        }
                }else{   
                }
              i++;
             }
             alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }

});