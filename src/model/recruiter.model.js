let recruiterUsers = [];


export default class RecruiterModel {
    constructor(id, name, email, password) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
    }
  
    static add(name, email, password) {
      const newUser = new RecruiterModel(
        recruiterUsers.length + 1,
        name,
        email,
        password
      );
      recruiterUsers.push(newUser);
    }
  
    static isValidUser(email, password) {
      const result = recruiterUsers.find(
          (u) =>
              u.email === email && u.password === password
      );
      
      // If result is undefined, return -1; otherwise, return the result
      return result !== undefined ? result : -1;
  }
  
  }
  
