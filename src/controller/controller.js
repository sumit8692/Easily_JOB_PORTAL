// Importing necessary modules
import RecruiterModel from "../model/recruiter.model.js";
import jobsModel from "../model/jobs.model.js";
import candidateModel from "../model/jobspplied.js";
import sendmail from "../service/utils/sendMail.js";

class Controller {
    // Group: Rendering Views
    
    // Render the index view
    index(req, res, next) {

        res.render('index', { isMainPage: true, userEmail: req.session.userEmail });
        
    }

    // Render the jobs view
    static renderJobsView(req, res, jobsSubset, page) {
     
        try {
            // Existing code for rendering jobs view
            const itemsPerPage = 3;
            const totalJobs = jobsModel.getTotalJobs();
            const totalPages = Math.ceil(totalJobs / itemsPerPage);
            res.render('jobs', {
                isMainPage: true,
                jobs: jobsSubset,
                userEmail: req.session.userEmail,
                currentPage: page,
                totalPages: totalPages,
            });
        } catch (error) {
            console.error("Error in renderJobsView:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    jobs(req, res, next) {
        const itemsPerPage = 3;
        const page = parseInt(req.query.page) || 1;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const jobsSubset = jobsModel.getSubset(startIndex, endIndex);
        // Use the common renderJobsView method
        Controller.renderJobsView(req, res, jobsSubset, page);
    }

    // Render the login view
    login(req, res, next) {
        res.render('login', { isMainPage: false, errorMessage: false });
    }

    // Render the post new job view
    postnewjob(req, res, next) {
        
        res.render('newjob', { isMainPage: false, update: false, userEmail: req.session.userEmail });
    }

    // Group: User Authentication

    // Handle user logout
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

    // Register a new recruiter
    registerRecruiter(req, res, next) {
        const { name, email, password } = req.body;
        console.log(name, email, password);
        RecruiterModel.add(name, email, password);
        res.redirect('login');
    }

    // Handle user login
    getlogin(req, res, next) {
        const { email, password } = req.body;
        const jobs = jobsModel.getAll();
        console.log(email, password);
        if (RecruiterModel.isValidUser(email, password) !== -1) {
            req.session.userEmail = email;
            res.redirect('/jobs');
        } else {
            res.render('404error', { isMainPage: true, message: "Invalid Credentials" });
        }
    }

    // Group: Job Operations

    // Apply for a job
    applyJobs(req, res, next) {
        const jobId = req.params.id;
        const jobDetails = jobsModel.getJobDetails(jobId);
        res.render('applyJobs', { isMainPage: false, jobDetails, jobId, userEmail: req.session.userEmail });
    }

    // Delete a job
    deleteJob(req, res, next) {
        const id = req.params.id;
        jobsModel.delete(id);
        const itemsPerPage = 3;
        const page = parseInt(req.query.page) || 1;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const jobsSubset = jobsModel.getSubset(startIndex, endIndex);
        console.log(this);
        // Use the common renderJobsView method
        this.renderJobsView(req, res, jobsSubset, page);
    }

    // Render the update job page
    updateJobPage(req, res, next) {
        const id = req.params.id;
        const jobDetails = jobsModel.getJobDetails(id);
        res.render('newjob', { isMainPage: false, update: true, jobDetails });
    }

    // Update a job
    update(req, res, next) {
        const id = req.params.id;
        let { company_name, job_category, role, location, pack, skills } = req.body;
        skills = typeof skills === 'string' ? [skills] : skills;
        const updatedJob = jobsModel.update(id, company_name, job_category, role, location, pack, skills);

        if (updatedJob) {
            const jobs = jobsModel.getAll()
            res.render('jobs', { isMainPage: true, jobs, userEmail: req.session.userEmail });
        } else {
            res.status(404).send('Job not found');
        }
    }

    // Search for jobs
    search(req, res, next) {
        const query = req.query.query;
        console.log(query);
        const jobs = jobsModel.searchJobs(query);
        res.render('jobs', { isMainPage: true, jobs, userEmail: req.session.userEmail, currentPage: undefined, totalPages: undefined });
    }

    // Create a new job
    createJob(req, res, next) {
        const { company_name, job_category, job_designation, job_location, pack, skills } = req.body;
        jobsModel.add(company_name, job_category, job_designation, job_location, pack, skills);
        const jobs = jobsModel.getAll();
        res.redirect('/jobs');
    }

    // Group: Job Application

    // Apply for jobs
    jobsApplied(req, res) {
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

    // View applicants for a job
    applicants(req, res) {
        const id = req.params.id;
        const candidates = candidateModel.getcandidateswithjobid(id);
        res.render('applicants', { isMainPage: false, candidates, userEmail: req.session.userEmail });
    }
}

export default Controller;
