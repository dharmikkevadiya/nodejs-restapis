const { model, Schema } = require('mongoose');

const PostSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

let Post = new model('Post', PostSchema);
module.exports = Post;
