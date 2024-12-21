const { Schema, models, model} = require('mongoose');

const CommentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    title: { type: String },
    contentpera: { type: String },
    mainComment: { type: Boolean }, // fix name to maincomment, maincomment (error)
    createdAt: { type: Date, default: Date.now },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    parent: {type: Schema.Types.ObjectId, ref: 'Comment'}, // reference to paent coment
    children: {type: Schema.Types.ObjectId, ref: 'Comment'}, // Array of child comment
    parentName: {type: String}
  },
 
);

export const Comment = models.Comment || model('Comment', CommentSchema, 'comments');