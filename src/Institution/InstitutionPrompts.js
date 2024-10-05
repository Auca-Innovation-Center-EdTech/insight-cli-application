import figlet from "figlet";
import { Institution } from "./Institution.js";
import inquirer from "inquirer";
import { Endpoints, Server } from "../Server.js";

export const InstitutionPrompt = async () => {

     figlet(`Institution Management`, function(error, data){
          console.log(gradient.passion.multiline(data));
     });

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
               Institution.add();
               break;
          case 'search':
               Institution.search();
               break;
          case 'display':
               Institution.display();
               break;
          case 'delete':
               Institution.delete();
          default: 
               console.log('not yet implement');
          
     }
}