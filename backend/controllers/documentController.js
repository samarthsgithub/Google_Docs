const Document = require('../models/Document');
const Link = require('../models/Link');


exports.createDocument = async (req, res) => {
    const { title } = req.body;
    try {
        
        const newDocument = new Document({
            title,
            content: '', // Initialize content as empty
            user: req.user.id
        });
       
        await newDocument.save();
        
        res.status(201).json(newDocument);
        
    } catch (error) {
        console.error(error);
        console.error("idhar phans rha hai");
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ user: req.user.id });
        res.json(documents);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
exports.getDocumentById = async(req,res)=>{
    try{
        const document = await Document.findById(req.params.id);
        if(!document) return res.status(404).json({msg:'Document not found'});
        if(document.user.toString()!==req.user.id) return res.status(401).json({ msg: 'User not authorized' });
        res.json(document);
    }catch(err){
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.updateDocument = async (req, res) => {
    const { title,content } = req.body;
    const {id,token} = req.params;
    try {
        const document = await Document.findById(req.params.id);
        if (!document) return res.status(404).json({ msg: 'Document not found' });
        if (req.user && document.user.toString() === req.user.id){
            //Authenticated user
            document.title = title;
            document.content = content;
        }else{
            console.log('1');
            const link = await Link.findOne({doc_id:id,unique_token:token, access_type:"edit"})
            console.log('2');
            if (!link) return res.status(401).json({ msg: 'User not authorized' });
            console.log('3');

            document.title = title;
            document.content = content;
        }
        
        await document.save();
        res.json(document);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// exports.getDocumentByShareableLink = async(req,res)=>{
//     const {id,shareableId} = req.params;
//     try{
//         const document = await Document.findById(id);
//         if(!document) return res.status(404).json({msg:"Document not found"});

//         const shareableLink = document.shareableLinks.find(link => link.linkId === shareableId);
//         if(!shareableLink) return res.status(404).json({msg:'Shareable link not found'});
//         res.json({title:document.title,content:document.content,editable: shareableLink.editable });

//     }catch(err){
//         console.error(err);
//         res.status(500).send('server error');
//     }
// };