const mongoose = require('mongoose');
const LinkSchema = new mongoose.Schema({
    doc_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Document'
    },
    access_type:{
        type:String,
        enum:['view','edit'],
        default:'view'
    },
    unique_token:{
        type:String,
        required:true,
        unique:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports = mongoose.model('Link',LinkSchema);