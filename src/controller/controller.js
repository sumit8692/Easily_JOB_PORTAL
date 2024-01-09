// Importing necessary modules
import RecruiterModel from "../model/recruiter.model.js";
import jobsModel from "../model/jobs.model.js";
import candidateModel from "../model/jobspplied.js";
import sendmail from "../service/utils/sendMail.js";

class Controller {
    // Group: Rendering Views
    index(req, res, next){
        res.render('index', { isMainPage: true, userEmail: req.session.userEmail, name: req.session.name });
    }

    jobs(req, res, next) {
        const itemsPerPage = 3; // Set the number of items to display per page to 3
        const page = parseInt(req.query.page) || 1; // Get the requested page number from query parameters
      
        // Calculate the start and end indices for the current page
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
      
        // Fetch a limited subset of jobs from the model
        const jobsSubset = jobsModel.getSubset(startIndex, endIndex);
      
        // Calculate the total number of pages based on the total number of jobs
        const totalJobs = jobsModel.getTotalJobs();
        const totalPages = Math.ceil(totalJobs / itemsPerPage);
      
        res.render('jobs', {
          isMainPage: true,
          jobs: jobsSubset,
          userEmail: req.session.userEmail,
          name: req.session.name,
          currentPage: page,
          totalPages: totalPages,
        });
      }

    login(req, res, next){
        res.render('login', { isMainPage: false, errorMessage: false });
    }

    postnewjob(req, res, next){
        res.render('newjob',{isMainPage: false, update: false, userEmail: req.session.userEmail, name: req.session.name })
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

        res.redirect('login');
    }

    getlogin(req, res, next){
        const {email, password} = req.body;
        const jobs = jobsModel.getAll();
        console.log(email, password);
        if (RecruiterModel.isValidUser(email, password) !== -1) {
            req.session.userEmail = email;
            req.session.name = RecruiterModel.getName(email);
            res.redirect('/jobs');
        } else {
            res.render('404error', { isMainPage: true, message: "Invalid Credentials" });
        }
    }

    // Group: Job Operations
    applyJobs(req, res, next){
        const jobId = req.params.id;
        const jobDetails = jobsModel.getJobDetails(jobId);
        res.render('applyJobs', { isMainPage: false, jobDetails, jobId, userEmail: req.session.userEmail,  name: req.session.name });
    }

    deleteJob(req, res, next){
        const id = req.params.id;
        jobsModel.delete(id);
        res.redirect('/jobs');
    }

    updateJobPage(req, res, next){
        const id = req.params.id;
        const jobDetails = jobsModel.getJobDetails(id);
        res.render('newjob', { isMainPage: false, update: true, jobDetails, userEmail: req.session.userEmail, name: req.session.name });
    }

    update(req, res, next) {
        const id = req.params.id;
        let { company_name, job_category, role, location, pack, skills, apply_by } = req.body;
        skills = typeof skills === 'string' ? [skills] : skills;
        const updatedJob = jobsModel.update(id, company_name, job_category, role, location, pack, skills, apply_by);
    
        if (updatedJob) {
                res.redirect('/jobs');
           
        } else {
            res.status(404).send('Job not found');
        }
    }
    
    
    search(req, res, next){
        const query = req.query.query; // Get the search query from the request
        console.log(query);
        const jobs = jobsModel.searchJobs(query);
        res.render('jobs', { isMainPage: true, jobs, userEmail: req.session.userEmail, name: req.session.name, currentPage: undefined, totalPages: undefined });
    }

    createJob(req, res, next){
        const { company_name, job_category, role, location, pack, skills } = req.body;
        jobsModel.add(company_name, job_category, role, location, pack, skills);
        const jobs = jobsModel.getAll();
        res.redirect('/jobs');
    }

    // Group: Job Application
    jobsApplied(req, res){
        const id = req.params.id;
        const jobDetails = jobsModel.getJobDetails(id);
        const { name, email, contact } = req.body;
        const jobId = req.params.id;
        const imageUrl = 'images/' + req.file.filename;
        sendmail(email);
        console.log(name, email, contact, jobId);
        candidateModel.add(name, email, contact, imageUrl, jobId);
        jobsModel.updateapplicants(id);
        res.render('applyJobs', { isMainPage: false, jobDetails, jobId });
    }

    applicants(req, res){
        const id = req.params.id;
        const candidates = candidateModel.getcandidateswithjobid(id);
        res.render('applicants', { isMainPage: false, candidates, userEmail: req.session.userEmail,  name: req.session.name});
    }
}

export default Controller;
