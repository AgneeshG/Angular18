exports.getProducts = (req,res,next)=>{
    res.json({
        success:true,
        message:'Get product works!'
    })
}

exports.getSingleProduct = (req,res,next)=>{
    res.json({
        success:true,
        message:'Get Single product works!'
    })
}