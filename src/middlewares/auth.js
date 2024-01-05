export const auth = (message) => {
    return (req, res, next) => {

        if (req.session.userEmail) {
            
            next();
        } else {
            
            res.render('404error', { isMainPage: true, message} );
        }
    };
};
export const loginauth = (req,res,next) => {
    

        if (req.session.userEmail) {
            
           res.redirect('/jobs')
        } else {
            
           next();
        }
};