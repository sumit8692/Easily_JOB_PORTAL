export const auth = (message) => {
    return (req, res, next) => {

        if (req.session.userEmail) {
            
            next();
        } else {
            
            res.render('404error', { isMainPage: true, message} );
        }
    };
};