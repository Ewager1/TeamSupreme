const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

var questions = [
  {
    type: "list",
    name: "position",
    message: "Which position would you like to add?",
    choices: ["Manager", "Engineer", "Intern"],
  },
  {
    type: "input",
    name: "fullName",
    message: "What is your full name?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "Manager, what is your office number?",
    when: (answers) => answers.position === "Manager",
  },
  {
    type: "input",
    name: "companyID",
    message: "What is your company ID?",
  },
  {
    type: "input",
    name: "gitHubURL",
    message: "Engineer, what is your GitHub URL?",
    when: (answers) => answers.position === "Engineer",
  },
  {
    type: "input",
    name: "schoolName",
    message: "Intern, what is your School Name?",
    when: (answers) => answers.position === "Intern",
  },
  {
    type: "list",
    name: "addPosition",
    message: "Add another position?",
    choices: ["yes", "no"],
  },
];

//placeholder array for employee objects
employeeArray = [];

//runs the questions prompt, calculates which position each answer is, adds to employee array, then renders
function runQuestions() {
  inquirer.prompt(questions).then((answers) => {
    switch (answers.position) {
      case "Manager":
        manager = new Manager(
          answers.fullName,
          answers.companyID,
          answers.email,
          answers.officeNumber
        );
        employeeArray.push(manager);
        break;

      case "Engineer":
        engineer = new Engineer(
          answers.fullName,
          answers.companyID,
          answers.email,
          answers.gitHubURL
        );
        employeeArray.push(engineer);
        break;

      case "Intern":
        intern = new Intern(
          answers.fullName,
          answers.companyID,
          answers.email,
          answers.schoolName
        );
        employeeArray.push(intern);
    }

    if (answers.addPosition === "yes") {
      runQuestions();
    } else makeTemplate();
  });
}

//starts program by running questions
runQuestions();

//Basic FS.write copied and edited from W3 schools
function makeTemplate() {
  fs.writeFile(outputPath, render(employeeArray), function (err) {
    if (err) throw err;
    console.log("Error");
  });
}
