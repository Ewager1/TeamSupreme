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
    validate: function (value) {
      var pass = value.match(
        // Checks for 2 names. Regex grabbed from https://stackoverflow.com/questions/2385701/regular-expression-for-first-and-last-name
        /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/
      );
      if (pass) {
        return true;
      }

      return "Please enter a first and last name";
    },
  },
  {
    type: "input",
    name: "email",
    message: "What is your email?",
    validate: function (value) {
      var pass = value.match(
        //checks for valid email. grabbed regex from https://regexr.com/3e48o
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      );
      if (pass) {
        return true;
      }

      return "Please enter a valid email address";
    },
  },
  {
    type: "input",
    name: "officeNumber",
    message: "Manager, what is your office number?",
    when: (answers) => answers.position === "Manager",
    validate: function (value) {
      var pass = value.match(
        //regular expression that checks entire statement is only numbers
        /^\d+$/
      );
      if (pass) {
        return true;
      }

      return "Office number only accepts numbers";
    },
  },
  {
    type: "input",
    name: "companyID",
    message: "What is your company ID?",
    validate: function (value) {
      var pass = value.match(
        //regular expression that checks entire statement is only numbers
        /^\d+$/
      );
      if (pass) {
        return true;
      }

      return "Company ID only accepts Numbers";
    },
  },
  {
    type: "input",
    name: "gitHubURL",
    message: "Engineer, what is your GitHub URL?",
    when: (answers) => answers.position === "Engineer",
    validate: function (value) {
      var pass = value.match(
        //validates url. grabbed from https://regexr.com/39nr7
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
      );
      if (pass) {
        return true;
      }

      return "Please enter a valid url with @ symbol";
    },
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
  });
}
