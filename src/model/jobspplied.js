let candidates = []; // Assuming candidates is defined somewhere in your code

export default class CandidateModel {
    constructor(id, name, email, contact, imageUrl, jobId) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.imageUrl = imageUrl;
        this.jobId = jobId;
    }

    static add(name, email, contact, imageUrl, jobId) {
        const newUser = new CandidateModel(
            candidates.length + 1,
            name,
            email,
            contact,
            imageUrl,
            jobId
        );
        candidates.push(newUser);
    }    

    static getAll() {
        return candidates;
    }

    static getcandidateswithjobid(id) {
        return candidates.filter(candidate => candidate.jobId == id);
    }

}
