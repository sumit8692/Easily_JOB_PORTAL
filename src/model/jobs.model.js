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
    }
]

export default class jobsModel{
    constructor(job_id, company_name, job_category, role, location, pack, skills){
        this.job_id = job_id;
        this.company_name = company_name;
        this.job_category = job_category;
        this.role = role;
        this.location = location;
        this.pack = pack;
        this.skills = skills;
    }

    static add(company_name, job_category, role, location, pack, skills){
        const newjob = new jobsModel(
            jobs.length + 1,
            company_name, 
            job_category, 
            role, 
            location, 
            pack, 
            skills);
        jobs.push(newjob);
    }

    static getAll(){
        return jobs;
    }

    static getJobDetails(id){
        return jobs.find((job) => job.job_id == id);
    }

    static delete(id){
        const index = jobs.findIndex((j) => {
            j.id == id
        });

        jobs.splice(index,1);
    }
    static searchJobs(query) {
        // Convert the query to lowercase for case-insensitive search
        const lowercaseQuery = query.toLowerCase();

        // Use the filter method to find jobs that match the specified properties
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
}
