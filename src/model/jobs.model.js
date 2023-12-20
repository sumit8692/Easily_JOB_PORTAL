let jobs = [
    {
        j
    }
]

export default class UserModel{
    constructor(job_id, company_name, role, location, package, skills){
        this.job_id = job_id;
        this.company_name = company_name;
        this.location = location;
        this.package = package;
        this.skills = skills;
    }

    static add(name, email, password){
        const newUser = new UserModel(
            users.length + 1,
            name, 
            email,
            password
        );
        users.push(newUser);
    }
}
