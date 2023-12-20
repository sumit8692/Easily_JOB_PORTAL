class controller{
    index(req, res, next){
        res.render('index');
    }
    jobs(req, res, next){
        res.render('jobs');
    }
}

export default controller;
