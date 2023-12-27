import RecruiterModel from "../model/recruiter.model.js";
import jobsModel from "../model/jobs.model.js";
import candidateModel from "../model/jobspplied.js";
class controller{

    index(req, res, next){
        res.render('index', { isMainPage: true });
    }
    
    jobs(req, res, next){
        const jobs = jobsModel.getAll();
        res.render('jobs', { isMainPage: true, jobs });
    }


    login(req, res, next){
        res.render('login', { isMainPage: false });
    }


    postjob(req, res, next){
        res.render('err_on_job', { isMainPage: true});
    }


    postnewjob(req, res, next){
        res.render('newjob',{isMainPage: false, update: false})
    }


    logout(req, res, next){
        req.session.destroy((err) => {
            if(err){
                console.log(err);
            }
            else{
                res.redirect('/login');
            }
        })
    }


    applyJobs(req, res, next){
        const id = req.params.id;
        const jobDetails = jobsModel.getJobDetails(id);
        res.render('applyJobs', {isMainPage: false, jobDetails })
    }

    deleteJob(req, res, next){
        const id = req.params.id;
        jobsModel.delete(id);
        res.redirect('/jobs');
    }

    update(req, res, next){
        const id = req.params.id;
        const jobDetails = jobsModel.getJobDetails(id);
        res.render('newjob', {isMainPage: false, update: true, jobDetails} )

    }

    registerRecruiter(req, res, next){
        const {name, email, password} = req.body;
        console.log(name, email, password);
        RecruiterModel.add(name, email, password);
        res.redirect('/login');
    }

    getlogin(req, res, next){
        const {email, password} = req.body;
        console.log(email, password)
        RecruiterModel.isValidUser(email, password);
        res.redirect('jobs');
    }

    applyJobs(req, res){
        const {name, email, contact }   = req.body;
        const imageUrl = 'images/' + req.file.filename;

        candidateModel.add(name, email, contact, imageUrl);
        res.render('applyJobs', {});

    }
    search(req, res, next){
        const query = req.query.query; // Get the search query from the request

        console.log(query);
        // Implement your search logic here
        // For example, if you have a jobs array
    
        // Render the search results or handle them as needed
        // res.render('searchResults', { results: searchResults, query: query });
    }
    // postJob(req, res, next){
        
    //     let {company_name, job_category, role, location, package, skills} = req.body;
    //     jobsModel.add(company_name, job_category, role, location, package, skills);
    //     res.render('jobs', {});

    // }




}

export default controller;