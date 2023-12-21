class controller{
    index(req, res, next){
        res.render('index', { isMainPage: true });
    }
    jobs(req, res, next){
        res.render('jobs', { isMainPage: true });
    }
    login(req, res, next){
        res.render('login', { isMainPage: false });
    }
    postjob(req, res, next){
        res.render('postjob', { isMainPage: true});
    }
}

export default controller;
