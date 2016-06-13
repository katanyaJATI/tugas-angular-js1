app.config(function($routeProvider){
  $routeProvider.when('/',{
    templateUrl : 'module/body_menu.html'
  })
  .when('/view-user',{
    templateUrl : 'module/view_user.html'  
  })
  .when('/view-bookmark',{
    templateUrl : 'module/view_bookmark.html'
  })
  .otherwise({
    redirectTo : '/'
  })
});