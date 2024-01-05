import RecruiterModel from "../model/recruiter.model.js";
import jobsModel from "../model/jobs.model.js";
import candidateModel from "../model/jobspplied.js";
import nodemailer from 'nodemailer';

async function sendmail(maildId) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sumit8962@gmail.com',
            pass: 'lxweffsqbacptank'
        },
    });

    const mailOption = {
        from: 'sumit8962@gmail.com', 
        to: maildId,
        subject: "Job Applied Successfully",
        text: "Your job application has been successfully submitted to the company"
    };

    await transporter.sendMail(mailOption, (err, info) => {
        if(err){
            console.log("Error Occured: ", err);
        }
        else{
            console.log("Email to user has been sent successfully", info.response);
        }
    })

}


class controller{

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


    logout(req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                
            } else {
                console.log(res.locals.userEmail);
                res.locals.userEmail = false;
                res.redirect('/index');
            }
        });
    }
    

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
        if(RecruiterModel.isValidUser(email, password) != -1){
            req.session.userEmail = email;
            res.render('jobs', {isMainPage: true, jobs, userEmail: req.session.userEmail});
        }else{
            res.render('404error',{isMainPage: true, message: "Invalid Credentials"});
        }
       
    }

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
    search(req, res, next){
        const query = req.query.query; // Get the search query from the request

        console.log(query);
        // Implement your search logic here
        // For example, if you have a jobs array
    
        // Render the search results or handle them as needed
        // res.render('searchResults', { results: searchResults, query: query });
    }
    createJob(req, res, next){
        const { company_name, job_category, role, location, pack, skills } = req.body;
        jobsModel.add(company_name, job_category, role, location, pack, skills);
        res.render('jobs', { isMainPage: true, jobs });
    }




}

export default controller;