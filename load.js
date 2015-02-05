var  fs = require('fs');
var db = require('mongojs').connect('news');

db.collection('posts').count( function (erros, doc) {
    if (doc == 0) {
        var posts = JSON.parse(fs.readFileSync(__dirname+'/client/data/posts.json').toString());
        var maxCount = posts.length;
        var count = 0;
        posts.forEach(function (post) {
            console.log("Processing post id: " + post.id );
            post._id = post.id;
            delete post.id;
            db.collection('posts').insert(post, function (err, doc) {
                if (err) {throw err;}
                if ( ++count === maxCount ){
                  db.close();
                }
            });
        });
        console.log('Posts load to MongoDB');
    }
});
