
// CandidateModel class definition
class CandidateModel {
    // Constructor to initialize candidate properties
    constructor(id, name, email, contact, imageUrl, jobId) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.imageUrl = imageUrl;
        this.jobId = jobId;
    }

    // Static method to add a new candidate to the candidates array
    static add(name, email, contact, imageUrl, jobId) {
        // Create a new CandidateModel instance with an incremented id
        const newUser = new CandidateModel(
            candidates.length + 1,
            name,
            email,
            contact,
            imageUrl,
            jobId
        );
        // Add the new candidate to the candidates array
        candidates.push(newUser);
    }    

    // Static method to get all candidates
    static getAll() {
        // Return the entire list of candidates
        return candidates;
    }

    // Static method to get candidates with a specific jobId
    static getcandidateswithjobid(id) {
        // Use filter to retrieve candidates with the specified jobId
        return candidates.filter(candidate => candidate.jobId == id);
    }
}

// Array to store instances of the CandidateModel class
let candidates = [new CandidateModel(1,"Sumit", "sumit8692@gmail.com", "7xxxx54321","images/download.png", 1 )]; // Assuming candidates is defined somewhere in your code

// Export the CandidateModel class
export default CandidateModel;
