var app = angular.module('myModule',[]);
app.controller('LoginController', loginUser);

function loginUser($scope, $http, $compile, $location){
    $http.get("http://localhost/tugas-crud-ci/index.php/login/aksi_login2")
    .success(function(response){
    	if(response){
    		window.location="http://localhost/tugas-angular/index.html";
        };
    });
    
    var vm = this;
    vm.login = login;
    vm.messageStat = true;
    function login(){
        $http.post(
        	"http://localhost/tugas-crud-ci/index.php/login/aksi_login2",
				{
					username: $scope.username,
	                password: $scope.password
    			}
		).success(function(response){
	    	if(response){
				window.location="http://localhost/tugas-angular/index.html";
 	        	vm.messageStat = response.status;
            $scope.userText = {};
       		}else{

       		}
    	})
        .error(function(){
            vm.message = '..!';
            vm.messageStat = false;
        })
        
    };
       
    
}