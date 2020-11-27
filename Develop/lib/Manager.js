// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
import Employee from "./Employee.js";

//create Manager subclass
class Intern extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
  getOfficeNumber() {
    return this.officeNumber;
  }
  getRole() {
    return "Intern";
  }
}
