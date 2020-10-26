const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const logo = require('asciiart-logo');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeesArray = [];

console.log(
    logo({
        name: 'Template Enginee Generator',
        font: 'Speed',
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'grey',
        logoColor: 'bold-green',
        textColor: 'green',
    })
    .emptyLine()
    .right('version 1.0.0')
    .emptyLine()
    .center('Author: Cesar A Martinez')
    .render()
);
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


function promptUser(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your Manager's name?"                
        },
        {
            type: "input",
            name: "id",
            message: "What is your Manager's id?"                   
        },
        {
            type: "input",
            name: "email",
            message: "What is your Manager's email?"                   
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your Manager's office number?"                
        },
        {
            type: "list",
            name: "options",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer","Intern","I don't want to add any more team members"]
        }
    ]).then(function(data) {
        let manager = new Manager(data.name,data.id,data.email,data.officeNumber);
        employeesArray.push(manager);
        if (data.options === "Engineer"){
            promtEngineer();                 
        } else if (data.options === "Intern"){
           promptIntern();
        } else {
            console.log(employeesArray);
            render(employeesArray);             
        }
        
        


    });        
}

promptUser();

function  promtEngineer(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your Engineer's name?"                
        },
        {
            type: "input",
            name: "id",
            message: "What is your Engineer's id?"                   
        },
        {
            type: "input",
            name: "email",
            message: "What is your Engineer's email?"                   
        },
        {
            type: "input",
            name: "github",
            message: "What is your Engineer's Github username?"                
        },
        {
            type: "list",
            name: "options",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer","Intern","I don't want to add any more team members"]
        }
    ]).then(function(data) {
        let engineer = new Engineer(data.name,data.id,data.email,data.github);
        employeesArray.push(engineer);
        if (data.options === "Engineer"){
            promtEngineer();                 
        } else if (data.options === "Intern"){
           promptIntern();
        } else {
            console.log(employeesArray);
            render(employeesArray);     
        }
    });
}
function promptIntern(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your Intern's name?"                
        },
        {
            type: "input",
            name: "id",
            message: "What is your Intern's id?"                   
        },
        {
            type: "input",
            name: "email",
            message: "What is your Intern's email?"                   
        },
        {
            type: "input",
            name: "school",
            message: "What is your Intern's school?"                
        },
        {
            type: "list",
            name: "options",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer","Intern","I don't want to add any more team members"]
        }
    ]).then(function(data) {
        let intern = new Intern(data.name,data.id,data.email,data.school);
        employeesArray.push(intern);
        if (data.options === "Engineer"){
            promtEngineer();                 
        } else if (data.options === "Intern"){
           promptIntern();
        } else {
            console.log(employeesArray);
            console.log(render(employeesArray));   
        }
    });
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
