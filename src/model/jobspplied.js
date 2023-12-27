let candidates = [];


export default class candidateModel{
    constructor(id, name, email, contact, imageurl){
        this.id = id;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.imageurl= imageurl;
    }
    static add(name, email, password, imageUrl){
        const newUser = new UserModel(
            users.length + 1,
            name, 
            email,
            password,
            imageUrl
        );
        users.push(newUser);
    }

    
}
