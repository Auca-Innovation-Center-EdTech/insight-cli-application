import figlet from "figlet";
import { Institution } from "./Institution.js";
import inquirer from "inquirer";
import { Endpoints, Server } from "../Server.js";
import { getFigletText } from "../utility/DisplayFunc.js";
import gradient from "gradient-string";

export const InstitutionPrompt = async () => {

     const textMessage = await getFigletText('Institution Management');
     console.log(gradient.passion.multiline(textMessage));

     const institutions = await Server.get(Endpoints.institution);
     
     console.log("Below are the institutions saved!!");
     console.table(institutions);

     const {choice} = await inquirer.prompt(
          {
               type: "expand",
               name: "choice",
               message: "What would you like to do today?",
               choices: [
                    { key: "a", name: "Add new Institution", value: "add" },
                    { key: "u", name: "Update Institution", value: "update" },
                    { key: "g", name: "Display All institutions", value: "display" },
                    { key: "s", name: "Search an Institution", value: "search" },
                    { key: "d", name: "Delete an institution", value: "delete" }
               ]
          }

     )

     switch(choice){
          case 'add':
               await Institution.add();
               break;
          case 'search':
               await Institution.search();
               break;
          case 'display':
               await Institution.display();
               break;
          case 'delete':
               await Institution.delete();
          default: 
               console.log('not yet implement');
          
     }
}