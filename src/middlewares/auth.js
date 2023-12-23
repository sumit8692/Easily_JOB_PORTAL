export const auth = (req, res, next) => {
    if(req.session.userEmail){
        next();
    }
    else{
        res.redirect('/err_on_job')
    }
}