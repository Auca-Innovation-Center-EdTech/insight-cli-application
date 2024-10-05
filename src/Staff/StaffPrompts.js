import gradient from "gradient-string";
import { Endpoints, Server } from "../Server.js";
import { getFigletText } from "../utility/DisplayFunc.js";
import inquirer from "inquirer";
import { Staff } from "./Staff.js";

export const StaffPrompt = async () => {

     const textMessage = await getFigletText('Staff Management');
     console.log(gradient.passion.multiline(textMessage));

     const staff = await Server.get(Endpoints.staff);
     
     console.log("Below are the institutions saved!!");
     console.table(staff);

     const {choice} = await inquirer.prompt(
          {
               type: "expand",
               name: "choice",
               message: "What would you like to do today?",
               choices: [
                    { key: "a", name: "Add new Staff", value: "add" },
                    { key: "u", name: "Update staff info", value: "update" },
                    { key: "g", name: "Display All staff", value: "display" },
                    { key: "s", name: "Search a staff", value: "search" },
                    { key: "d", name: "Delete an staff", value: "delete" }
               ]
          }

     )

     switch(choice){
          case 'add':
               await Staff.add();
               break;
          case 'search':
               await Staff.search();
               break;
          case 'display':
               await Staff.display();
               break;
          case 'delete':
               await Staff.delete();
          default: 
               console.log('not yet implement');
          
     }
}