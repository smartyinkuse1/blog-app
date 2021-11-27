const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug)
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a title"],
        unique: [true, "name already in use"],
        trim: true
    },
    slug :{ 
        type: String, 
        slug: "title" 
    },
    backgroundImage: {
        type:String
    },
    category: {
        type: String,
        required: [true, "Please add a title"],
        trim: true,
    },
    paragraph1: {
        type: String,
        required: [true, "Please add a title"],
        trim: true,
    },
    paragraph2: {
        type: String,
        trim: true,
    },
    subImage: {
        type: String,
        trim: true,
    },
    subImageTitle: {
        type: String,
        trim: true,
    },
},
{
  timestamps: true,
});

module.exports = mongoose.model('Blog', BlogSchema)