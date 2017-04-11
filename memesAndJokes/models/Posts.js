var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  meme: String,
  joke: String,
  upvotes: {type: Number, default: 0}
});

PostSchema.methods.upvote = function(cb){
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Post', PostSchema);
