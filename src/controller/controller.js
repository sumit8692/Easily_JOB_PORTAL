//importing the necessary modules
import RecruiterModel from "../model/recruiter.model.js";
import jobsModel from "../model/jobs.model.js";
import candidateModel from "../model/jobspplied.js";
import sendmail from "../service/utils/sendMail.js";

class Controller {
    // Group: Rendering Views
    index(req, res, next){
        res.render('index', { isMainPage: true, userEmail: req.session.userEmail });
    }

    jobs(req, res, next){
        const jobs = jobsModel.getAll();
        res.render('jobs', { isMainPage: true, jobs, userEmail: req.session.userEmail });
    }

    login(req, res, next){
        res.render('login', { isMainPage: false });
    }

    postnewjob(req, res, next){
        res.render('newjob',{isMainPage: false, update: false, userEmail: req.session.userEmail })
    }

    // Group: User Authentication
    logout(req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.locals.userEmail = false;
                res.redirect('/');
            }
        });
    }

    registerRecruiter(req, res, next){
        const {name, email, password} = req.body;
        console.log(name, email, password);
        RecruiterModel.add(name, email, password);
        res.redirect('/login');
    }

    getlogin(req, res, next){
        const {email, password} = req.body;
        const jobs = jobsModel.getAll();
        console.log(email, password)
        if(RecruiterModel.isValidUser(email, password) !== -1){
            req.session.userEmail = email;
            res.render('jobs', {isMainPage: true, jobs, userEmail: req.session.userEmail});
        } else {
            res.render('404error',{isMainPage: true, message: "Invalid Credentials"});
        }
    }

    // Group: Job Operations
    applyJobs(req, res, next){
        const jobId = req.params.id;
        const jobDetails = jobsModel.getJobDetails(jobId);
        res.render('applyJobs', {isMainPage: false, jobDetails, jobId })
    }

    deleteJob(req, res, next){
        const id = req.params.id;
        jobsModel.delete(id);
        res.redirect('jobs');
    }

    update(req, res, next){
        const id = req.params.id;
        const jobDetails = jobsModel.getJobDetails(id);
        res.render('newjob', {isMainPage: false, update: true, jobDetails} )
    }

    search(req, res, next){
        const query = req.query.query; // Get the search query from the request
        console.log(query);
        const jobs = jobsModel.searchJobs(query);
        res.render('jobs', { isMainPage: true, jobs, userEmail: req.session.userEmail });
    }

    createJob(req, res, next){
        const { company_name, job_category, job_designation, job_location, pack, skills } = req.body;
        jobsModel.add(company_name, job_category, job_designation, job_location, pack, skills);
        const jobs = jobsModel.getAll();
        res.render('jobs', { isMainPage: true, jobs, userEmail: req.session.userEmail });
    }

    // Group: Job Application
    jobsApplied(req, res){
        const id = req.params.id;
        const jobDetails = jobsModel.getJobDetails(id);
        const {name, email, contact }   = req.body;
        const jobId = req.params.id;
        const imageUrl = 'images/' + req.file.filename;
        sendmail(email);
        console.log(name, email, contact, jobId);
        candidateModel.add(name, email, contact, imageUrl, jobId);
        res.render('applyJobs', {isMainPage: false, jobDetails, jobId});
    }
}

export default Controller;
