var mongoose = require('mongoose');

var GallerySchema = new mongoose.Schema({
    name: { type: String, required: true },
    imagePath: { type: String, required: true },
});

GallerySchema.methods.toJSON = function () {
    const result = this.toObject();
    delete result.photo;
    return result;
  };

const image=mongoose.model('Gallery', GallerySchema);
module.exports = image
