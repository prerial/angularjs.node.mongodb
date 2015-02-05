angular.module('flapperNews', ['ngRoute', 'flapperControllers', "flapperTemplates", 'flapperFilters', 'flapperServices'])
    .config(['$routeProvider',function($routeProvider) {

    $routeProvider.
      when('/home', {
          templateUrl: 'template/home.html',
          controller: 'MainController',
          resolve: {
            postPromise: ['posts', function(posts){
              return posts.getAll();
            }]
          }
      }).
      when('/posts/:_id', {
          templateUrl: 'template/posts.html',
          controller: 'PostsController'
      }).
      otherwise({
        redirectTo: '/home'
      });
}]);

