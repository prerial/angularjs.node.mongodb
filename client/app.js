angular.module('flapperNews', ['ui.router', 'flapperFilters', 'flapperServices'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/home.html',
          controller: 'MainController',
          resolve: {
            postPromise: ['posts', function(posts){
              return posts.getAll();
            }]
          }
        })

        $urlRouterProvider.otherwise('home');
    }])

    .controller('MainController',['$scope', '$window', 'posts', 'db', function($scope, $window, posts, db){

        $scope.posts = posts.posts;
        $scope.db = db.posts;

        $scope.addPosts = function(){
            if ($scope.title && $scope.title !== ''){
              posts.create({
                title: $scope.title,
                link: $scope.link,
              });
            }else{
                $window.alert('Please enter');
            }
            $scope.title = '';
            $scope.link = '';
        };

        $scope.deletePost = function(idx){
            var _this = this;
            $scope.db.delete({ '_id':idx },{},function(res){
                $scope.posts = res.data;
            });
            $scope.title = '';
            $scope.link = '';
        };

        $scope.incrementUpvotes = function(post) {
          posts.upvote(post);
        };

    }])

    .controller('PostsController', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts){

        $scope.post = posts.posts[$stateParams.id];

        $scope.addComment = function(){
            if($scope.body === '') { return; }
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });
            $scope.body = '';
        };
    }]);


