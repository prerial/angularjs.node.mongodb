angular.module('flapperControllers', [])

    .controller('MainController',['$scope', '$window', 'posts', function($scope, $window, posts){

        $scope.posts = posts.posts;

        $scope.addPosts = function(){
            if ($scope.title && $scope.title !== ''){
              posts.create({
                    title: $scope.title,
                    link: $scope.link||'',
                    upvotes: 0,
                    message: ""
                });
            }else{
                $window.alert('Please enter');
            }
            $scope.title = '';
            $scope.link = '';
        };

        $scope.deletePost = function(idx){
            var _this = this;
            posts.delete({ '_id':idx });
            $scope.title = '';
            $scope.link = '';
        };

        $scope.incrementUpvotes = function(post) {
            post.upvotes++;
            posts.upvote(post);
        };

    }])

    .controller('PostsController', ['$scope', '$routeParams', 'posts', function($scope, $routeParams, postdt){

        postdt.posts.filter(function(post){
            if(post._id === $routeParams._id){
                $scope.post = post;
            }
        });

        $scope.addComment = function(){
            if($scope.body === '') { return; }
 debugger
           $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });
            $scope.body = '';
        };
    }]);


