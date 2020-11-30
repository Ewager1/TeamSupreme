// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

//import Employee Class
import {Employee} from './Employee.js';

//create Engineer subclass and exports
 class Engineer extends Employee {
    constructor(name,id, email, github) {
        super(name,id,email)
        this.github = github
    }
    getGithub() {return github}
    getRole() {return Engineer}
}

export default Engineer