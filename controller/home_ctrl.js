app.controller('HomeController', user);

function user($scope, $http, $compile, DTOptionsBuilder, DTColumnBuilder) {
    
    $http.get("http://localhost/tugas-crud-ci/index.php/login/aksi_login2")
    .success(function(response){
        if(!response){
            window.location="http://localhost/tugas-angular/login.html";
        };
    });
};