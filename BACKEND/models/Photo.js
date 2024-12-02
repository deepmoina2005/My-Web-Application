const { Schema, models, model} = require('mongoose');

const PhotoSchema = new Schema({
  title: {type: String},
  slug: {type: String, required: true},
  images: [{type: String}],
}, {
  timestamps: true, //this will be automatically manage createdAt and updateAt
});

export const Photo = models.Photo || model('Photo', PhotoSchema, 'photos');