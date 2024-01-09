// Array of job objects representing different job postings
let jobs = [

    {
        job_id: 1,
        company_name: "Coding Ninjas",
        job_category: "Tech",
        role: "SDE",
        location: "Gurgaon HR IND",
        pack: "14-20lpa",
        skills: ["REACT", "NodeJS", "JS", "AWS", "MONGODB", "Express"],
        numberofopenings: 3,
        apply_by: '04/12/2023',
        applicants: 2,
        posted: '25/11/2023'
    },
   
    {
        job_id: 2,
        company_name: "Go Digit",
        job_category: "Tech",
        role: "Angular Developer",
        location: "Pune IND Onsite",
        pack: "6-10lpa",
        skills: ["ANGULAR", "SQL", "JS", "AWS", "MONGODB", "Express"],
        numberofopenings: 2,
        apply_by: '31/12/2023',
        applicants: 4,
        posted: '25/12/2023'
    },
    
    {
        job_id: 3,
        company_name: "Juspay",
        job_category: "Tech",
        role: "SDE",
        location: "Bangalore",
        pack: "20-26lpa",
        skills: ["React", "SQL", "JS", "AWS", "MONGODB", "Express"],
        numberofopenings: 5,
        apply_by: '01/01/2024',
        applicants: 5,
        posted: '25/12/2023'
    },
  
    {
        job_id: 4,
        company_name: "Google",
        job_category: "Tech",
        role: "SDE",
        location: "Bangalore",
        pack: "20-26lpa",
        skills: ["React", "SQL", "JS", "AWS", "MONGODB", "Express"],
        numberofopenings: 5,
        apply_by: '01/01/2024',
        applicants: 5,
        posted: '01/11/2023'
    }
];

// Class representing the job model with various static methods
export default class jobsModel {
    // Constructor to initialize job properties
    constructor(job_id, company_name, job_category, role, location, pack, skills) {
        this.job_id = job_id;
        this.company_name = company_name;
        this.job_category = job_category;
        this.role = role;
        this.location = location;
        this.pack = pack;
        this.skills = skills;
    }

    // Method to add a new job to the jobs array
    static add(company_name, job_category, role, location, pack, skills) {
    
        const newjob = new jobsModel(
            jobs.length + 1,
            company_name,
            job_category,
            role,
            location,
            pack,
            skills
        );

        // Get the current date and format it
        const lastVisitDate = new Date();
        const formattedDate = lastVisitDate.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
        newjob.posted = formattedDate;

        // Add the new job to the jobs array
        jobs.push(newjob);
    }

    // Method to get a subset of jobs based on start and end indices
    static getSubset(startIndex, endIndex) {
        return jobs.slice(startIndex, endIndex);
    }

    // Method to get the total number of jobs
    static getTotalJobs() {
        return jobs.length;
    }

    // Method to get all jobs
    static getAll() {
        return jobs;
    }

    // Method to get job details by job ID
    static getJobDetails(id) {
        return jobs.find((job) => job.job_id == id);
    }

    // Method to delete a job by job ID
    static delete(id) {
        const index = jobs.findIndex((j) => j.job_id == id);

        if (index !== -1) {
            jobs.splice(index, 1);
        } else {
            console.error(`Job with ID ${id} not found`);
        }
    }

    // Method to search for jobs based on a query
    static searchJobs(query) {
        const lowercaseQuery = query.toLowerCase();

        // Filter jobs based on the query
        const searchResults = jobs.filter((job) => {
            return (
                job.company_name.toLowerCase().includes(lowercaseQuery) ||
                job.job_category.toLowerCase().includes(lowercaseQuery) ||
                job.role.toLowerCase().includes(lowercaseQuery) ||
                job.location.toLowerCase().includes(lowercaseQuery) ||
                job.pack.toLowerCase().includes(lowercaseQuery) ||
                job.skills.some((skill) => skill.toLowerCase().includes(lowercaseQuery))
            );
        });

        return searchResults;
    }

    // Method to update job details by job ID
    static update(id, company_name, job_category, role, location, pack, skills, apply_by) {
        const index = jobs.findIndex((job) => job.job_id == id);

        if (index !== -1) {
            // Update job details
            jobs[index].apply_by = apply_by;
            jobs[index].company_name = company_name;
            jobs[index].job_category = job_category;
            jobs[index].role = role;
            jobs[index].location = location;
            jobs[index].pack = pack;
            jobs[index].skills = skills;

            return true;
        } else {
            return null;
        }
    }

    // Method to update the number of applicants for a job by job ID
    static updateapplicants(id) {
        const job = jobs.find((job) => job.job_id == id);

        if (job) {
            // Increment the number of applicants for the job
            job.applicants = (job.applicants || 0) + 1;
        } else {
            console.error(`Job with ID ${id} not found`);
        }
    }
}
