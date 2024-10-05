import figlet from "figlet";
import inquirer from "inquirer";
import gradient from "gradient-string";
import { InstitutionPrompt } from "./src/Institution/InstitutionPrompts.js";
import dotenv from 'dotenv';

dotenv.config();

let username = "Dushime";

const greet = async () =>{
     figlet('Welcome to Insight System', function(error, data){
          console.log(gradient.passion.multiline(data));
     });

     const {choice} = await inquirer.prompt(
          {
               type: "expand",
               name: "choice",
               message: "What would you like to do today?",
               choices: [
                    { key: "i", name: "Institution Management", value: "Institution" },
                    { key: "e", name: "Employee Management", value: "Employee" },
                    { key: "s", name: "Staff management", value: "Staff" }
               ]
          }
     )
     
     switch(choice) {
          case "Institution": 
               await InstitutionPrompt();
               break;
          default: 
               console.log("Invalid choice");
     }

} 

greet();