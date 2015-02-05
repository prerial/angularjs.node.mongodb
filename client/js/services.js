angular.module('flapperServices', ['ngResource'])
    .factory('posts',['$resource', '$http', function($resource, $http){
        var o = {
            posts: []
        };
        o.getAll = function() {
            var res = $resource('posts')
            res.query().$promise.then(function(data) {
                angular.copy(data, o.posts);
            });
        };
        o.create = function(post) {
          $http.post('/posts', post).success(function(data){
            o.posts.push(data);
          });
        };
        o.delete = function(post, scope) {
            var res = $resource('/posts/'+post._id, { '_id':post._id })
           res.remove({ '_id':post._id }).$promise.then(function(data) {
                angular.copy(data.data, o.posts);
            });
        };
        o.upvote = function(post, scope) {
            var res = $resource('/posts/upvote', null,{'update': { method:'PUT' }});
            res.update({ 'title':post.title, 'upvotes':post.upvotes }).$promise.then(function(data) {
                angular.copy(data.data, o.posts);
            });
        };
        return o;
}]);

