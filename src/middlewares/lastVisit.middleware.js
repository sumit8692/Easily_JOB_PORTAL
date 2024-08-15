const setLastVisit = (req, res, next) => {
    if (req.cookies.lastVisit) {
        const lastVisitDate = new Date(req.cookies.lastVisit);
        // Format date with 12-hour time and AM/PM
        const formattedDate = `${lastVisitDate.toLocaleDateString()} ${lastVisitDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
        res.locals.lastVisit = formattedDate;
    }

    const currentVisitDate = new Date();
    // Format date with 12-hour time and AM/PM
    const formattedCurrentDate = `${currentVisitDate.toLocaleDateString()} ${currentVisitDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
    res.cookie('lastVisit', formattedCurrentDate, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    next();
};

export default setLastVisit;
