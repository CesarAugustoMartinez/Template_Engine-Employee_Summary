const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const logo = require('asciiart-logo');

fs.rmdirSync("output", { // Deleting if the folder already exist
    recursive: true, 
  }); 
fs.mkdirSync(path.join(__dirname, "output")); // Creating the folder for html file
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeesArray = []; // Declaring an array of objects

console.log( // Creating a logo for the app using the package 'asciiart-logo'
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
        employeesArray.push(manager);  // Adding a new object into an array.
        if (data.options === "Engineer"){
            promtEngineer();                 
        } else if (data.options === "Intern"){
           promptIntern();
        } else {
            console.log(employeesArray);
            fs.writeFileSync(outputPath,render(employeesArray));// Calling the render function and passing an array containing all employee objects. 
            //Creating an HTML file named 'team.html'               
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
        employeesArray.push(engineer);  // Adding a new object into an array.
        if (data.options === "Engineer"){
            promtEngineer();                 
        } else if (data.options === "Intern"){
           promptIntern();
        } else {
            console.log(employeesArray);
            fs.writeFileSync(outputPath,render(employeesArray)); // Calling the render function and passing an array containing all employee objects. 
            //Creating an HTML file named 'team.html'          
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
        employeesArray.push(intern); // Adding a new object into an array.
        if (data.options === "Engineer"){
            promtEngineer();                 
        } else if (data.options === "Intern"){
           promptIntern();
        } else {
            console.log(employeesArray);
            fs.writeFileSync(outputPath,render(employeesArray)); // Calling the render function and passing an array containing all employee objects. 
            //Creating an HTML file named 'team.html'      
        }
    });
}