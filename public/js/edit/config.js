
var socket = io();
var app = angular.module('bed',[]);
var id=getQueryVariable("id");
app.controller("edit", function ($scope,$http){
$http({
        method : 'GET',						// method get
        url : '/member'				        // url getLastAction
    }).then(function mySucces(response){ 
                        $scope.arrId=response.data
                 
        // console.log($scope.arrId.length);
        $scope.arrId=response.data
        var sum=$scope.arrId.length;
        var i=0
        for(i=0;i<sum;i++){
           
           var arr=$scope.arrId[i];
      
               if(arr._id==id){
               $scope.v_name =arr.name
               $scope.v_surname =arr.surname
               $scope.v_tel =arr.tel
               $scope.v_medic_his =arr.medoc_his
               $scope.v_drug =arr.drug
               $scope.v_mac =arr.mac
               $scope.v_email =arr.email
               $scope.v_pass =arr.password
               
               }
               else{

               }
            }
    	
},function myError(response) {// ถ้า err 
        		console.log('error55');
		});
       
        $scope.edit=function(){
            console.log($scope.names)
                        var object={
                                        "id":id,
                                        "names":$scope.names,
                                        "surname":$scope.surname,
                                        "Tel":$scope.tel,
                                        "medoc_his":$scope.medic_his,
                                        "drug":$scope.drug,
                                        "mac":$scope.mac,
                                        "email":$scope.email,
                                        "password":$scope.pass
                                    }
                                    
                                    console.log(object)
                                    var r = confirm("คุณต้องการที่จะแก้ไขข้อมูลใช่หรือไม่");
                                    if(r == true ){
                                                        socket.emit('edit',object);
                                                        location.href='/smartview?id='+id;
                                                  
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
    