import multer from 'multer';
let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{ 
        cb(null,file.originalname)
        //safer version (sme img) ->// cb(null, Date.now() + '-' + file.originalname);
    }
});
let upload=multer({storage});
export default upload;