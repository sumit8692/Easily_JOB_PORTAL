export const auth = (req, res, next) => {
    if (req.session.userEmail) {
        // User is authenticated, proceed to the next middleware

        next();
    } else {
        // User is not authenticated, render '404error' for 5 seconds
        res.render('404error', { isMainPage: true, message: "Login to Post a new Job" });
    }
};

