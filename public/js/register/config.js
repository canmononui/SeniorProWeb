
var socket = io();
var app = angular.module('bed',[]);

function checklogin(){
}
app.controller("sensor", function ($scope,$http){
$http({
        method : 'GET',						// method get
        url : '/member'				        // url getLastAction
    }).then(function mySucces(response){ 
                        $scope.arrId=response.data
        // console.log($scope.arrId.length);
    	
},function myError(response) {// ถ้า err 
        		console.log('error55');
		});

    $scope.submit=function(){
            var i=0;
            console.log($scope.email+"     "+$scope.pass);
             for(i=0;i<$scope.arrId.length;i++){
                var arr=$scope.arrId[i];
                if(arr.email==$scope.email&&arr.password==$scope.pass){
                        location.href='/main?arr='+arr;
                        alert("ยินดีต้อนรับ");
                        return
                }else{
                        console.log("Fail")
                        if(i=$scope.arrId.length){
                               alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
                        }
                }
                
             }
    }

});
app.controller("register",function($scope,$http){

        $scope.register=function(){
                      if($scope.names!=undefined && $scope.surname!=undefined && $scope.tel!=undefined&&$scope.medic_his!=undefined&&$scope.email!=undefined&&$scope.pass!=undefined){

                        var object={
                                        "name":$scope.names,
                                        "surname":$scope.surname,
                                        "Tel":$scope.tel,
                                        "medoc_his":$scope.medic_his,
                                        "drug":$scope.drug,
                                        "mac":$scope.mac,
                                        "email":$scope.email,
                                        "password":$scope.pass
                                        
                                    }
                                    console.log(object)
                                    var r = confirm("คุณต้องการที่จะสมัครใช่หรือไม่");
                                    if(r == true ){
                                                        socket.emit('register',object);
                                                        location.href='/';
                                        } 
                               
                                }else{
                                        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
                                        return false;
                                }       
                                   
}


});
app.controller('myCtrl', ['$scope', '$cookieStore', function ($scope, $cookieStore) {
        console.log("ss")
        $scope.setValue = function () {
            $cookies.put("myValue", $scope.value);
        };
    
        $scope.getValue = function () {
            $scope.value = $cookieStore.get('myValue');
        };
    
        $scope.delValue = function () {
            $scope.value = $cookieStore.remove('myValue');
        };
    
        $scope.clear = function () {
            $scope.value = '';
        };
            
        $scope.getValue();
    }]);
