import clc from 'cli-color';
import inquirer from "inquirer";
import gradient from "gradient-string";
import { InstitutionPrompt } from "./src/Institution/InstitutionPrompts.js";
import dotenv from 'dotenv';
import { getFigletText } from "./src/utility/DisplayFunc.js";
import { StaffPrompt } from './src/Staff/StaffPrompts.js';

dotenv.config();

let username = "Dushime";

const app = async () =>{
     const welcomeMessage = await getFigletText("Welcome to Insight System");
     console.log(gradient.retro.multiline(welcomeMessage));

     let closeApp = false
     while(!closeApp){
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
               case "Staff":
                    await StaffPrompt();
                    break;
               default: 
                    console.log("Invalid choice");
          }

          const {close} = await inquirer.prompt({
               type:'confirm',
               name: "close",
               message: "Close App"
          });
          closeApp = close; 
     }
     console.log(clc.bgGreen.white('Thank you for using insight system'));

} 

app();