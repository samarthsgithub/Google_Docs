const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        default:''
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    changes:{
        type:Array,
    }
},{timestamps:true});

module.exports = mongoose.model('Document',DocumentSchema);