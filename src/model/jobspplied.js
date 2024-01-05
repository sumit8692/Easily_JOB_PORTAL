
let candidates = [];


export default class candidateModel{
    constructor(id, name, email, contact, imageurl, jobId){
        this.id = id;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.imageurl= imageurl;
        this.jobId = jobId;
    }
    static add(name, email, password, imageUrl, jobId){
        const newUser = new candidateModel(
            name, 
            email,
            password,
            imageUrl,
            jobId
        );
        candidates.push(newUser);
    }    
}


