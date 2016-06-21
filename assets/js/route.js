app.config(function($routeProvider){
  $routeProvider.when('/',{
    templateUrl : 'module/body_menu.html',
  })
  .when('/view-user',{
    templateUrl : 'module/view_user.html',
    controller : 'userCtrl'
  })
  .when('/view-bookmark',{
    templateUrl : 'module/view_bookmark.html',
    controller : 'bookmarkCtrl'
  })
  .otherwise({
    redirectTo : '/'
  })
});