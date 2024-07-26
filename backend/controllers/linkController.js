const Link = require('../models/Link');
const Document = require('../models/Document');
const crypto = require('crypto');


//Generate shareable link for a document

exports.generateShareableLink = async(req,res)=>{
    const {access_type} = req.body;
    const {id} = req.params;
    const token = crypto.randomBytes(20).toString('hex');

    try{
        const document = await Document.findById(id);
        if(!document) return res.status(404).json({msg:'Document not found'});

        const newLink = new Link({
            doc_id:id,
            access_type,
            unique_token:token,
            created_by:req.user.id
        });

        await newLink.save();
        res.status(201).json({link:`http://localhost:3000/documents/${id}/${access_type}/${token}`});
    }catch(error){
        console.error(error);
        res.status(500).json({msg:'Server error'});
    }
}
exports.getDocumentByShareableLink = async(req,res)=>{
    const {id,access_type,token} = req.params;
    try{
        const link = await Link.findOne({doc_id:id,access_type,unique_token:token});
        if (!link) return res.status(404).json({ msg: 'Invalid link' });
        const document = await Document.findById(id);
        if(!document) return res.status(404).json({ msg: 'Document not found' });
        res.json({ title: document.title, content: document.content, access_type: link.access_type });
    }catch(err){
        console.error(err);
        res.status(500).send('Server error');
    }
};