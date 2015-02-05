angular.module('flapperServices', ['ngResource'])
    .factory('posts',['$resource', '$http', function($resource, $http){
        var o = {
            posts: []
        };
        o.getAll = function() {
            var res = $resource('posts')
            return res.query().$promise.then(function(data) {
                angular.copy(data, o.posts);
            });
        };
        o.create = function(post) {
          return $http.post('/posts', post).success(function(data){
            o.posts.push(data);
          });
        };
        o.delete = function(post) {
            var res = $resource('/posts/'+post._id, { '_id':post._id })
            return res.remove({ '_id':post._id }).$promise.then(function(data) {
                angular.copy(data, o.posts);
            });
        };
        o.upvote = function(post) {
          return $http.put('/posts/' + post._id + '/upvote')
            .success(function(data){
              post.upvotes += 1;
            });
        };
        return o;
    }])

    .factory('db', ['$resource', '$http',
        function($resource, $http) {
            var actions = {
                    'count': {method:'PUT', params:{_id: 'count'}},
                    'distinct': {method:'PUT', params:{_id: 'distinct'}},
                    'find': {method:'PUT', params:{_id: 'find'}, isArray:true},
                    'group': {method:'PUT', params:{_id: 'group'}, isArray:true},
                    'mapReduce': {method:'PUT', params:{_id: 'mapReduce'}, isArray:true} ,
                    'aggregate': {method:'PUT', params:{_id: 'aggregate'}, isArray:true}
                }
            var db = {};
            db.posts = $resource('/posts/:_id', {}, actions);
            return db;
        }
]);


