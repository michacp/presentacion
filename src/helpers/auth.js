const auth={};

auth.logged=(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/login');
    }
}
auth.nologged=(req,res,next)=>{
    if(!req.isAuthenticated()){
        next();
    }else{
        res.redirect('/admin');
    }
}
module.exports=auth;