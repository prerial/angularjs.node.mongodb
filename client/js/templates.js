angular.module("flapperTemplates", ["template/home.html", "template/posts.html"]);

angular.module("template/home.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/home.html",

        "<div class=\"page-header\">\n" +
        "  <h1>Flapper News</h1>\n" +
        "</div>\n" +
        "  <div ng-repeat=\'post in posts|orderBy:\"-upvotes\"\'>\n" +
        "      <span class=\"glyphicon glyphicon-thumbs-up\" ng-click=\"incrementUpvotes(post)\" style='cursor:pointer'></span>\n" +
        "       <span style=\"font-size:20px; margin-left:10px;\">\n" +
        "           <a ng-show=\"post.link\" ng-href=\"{{post.link}}\">\n" +
        "              {{post.title}}\n" +
        "          </a>\n" +
        "          <span ng-hide=\"post.link\">\n" +
        "              {{post.title}}\n" +
        "          </span>\n" +
        "          <span>\n" +
        "            <a ng-href=\"#/posts/{{post._id}}\">Comments</a>\n" +
        "          </span>\n" +
        "          - upvotes: {{post.upvotes}}\n" +
        "      </span>\n" +
        "      <span class=\"glyphicon glyphicon-remove-circle\" ng-click=\"deletePost(post._id)\" style='cursor:pointer'></span>\n" +
        "  </div>\n" +
        "  <form ng-submit='addPosts()' style=\"margin-top:30px;\">\n" +
        "      <h3>Add a new post</h3>\n" +
        "      <div class=\"form-group\">\n" +
        "          <input type=\"text\" class=\"form-control\" placeholder=\"Title\" ng-model=\"title\" />\n" +
        "      </div>\n" +
        "      <div class=\"form-group\">\n" +
        "          <input type=\"text\" class=\"form-control\" placeholder=\"Link\" ng-model=\"link\" />\n" +
        "      </div>\n" +
        "      <button type='submit' class=\"btn btn-primary\">Post</button>\n" +
        "  </form>\n" +
        "");
}]);

angular.module("template/posts.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/posts.html",

        "<div class=\"page-header\">\n" +
        "  <h3>\n" +
        "    <a ng-show=\"post.link\" ng-href=\"{{post.link}}\">\n" +
        "      {{post.title}}\n" +
        "    </a>\n" +
        "    <span ng-hide=\"post.link\">\n" +
        "      {{post.title}}\n" +
        "    </span>\n" +
        "  </h3>\n" +
        "</div>\n" +

        "<div ng-repeat=\"comment in post.comments | orderBy:'-upvotes'\">\n" +
        "    <span class=\"glyphicon glyphicon-thumbs-up\"\n" +
        "      ng-click=\"incrementUpvotes(comment)\"></span>\n" +
        "    {{comment.upvotes}} - by {{comment.author}}\n" +
        "    <span style=\"font-size:20px; margin-left:10px;\">\n" +
        "      {{comment.body}}\n" +
        "    </span>\n" +
        "</div>\n" +

        "<form ng-submit=\"addComment()\" style=\"margin-top:30px;\">\n" +
        "    <h3>Add a new comment</h3>\n" +

        "    <div class=\"form-group\">\n" +
        "        <input type=\"text\" class=\"form-control\" placeholder=\"Comment\" ng-model=\"body\" />\n" +
        "    </div>\n" +
        "    <button type=\"submit\" class=\"btn btn-primary\">Post</button>\n" +
        "</form>\n" +
  "");
}]);
