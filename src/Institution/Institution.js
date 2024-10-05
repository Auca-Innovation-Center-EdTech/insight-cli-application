import inquirer from "inquirer"
import { Endpoints, Server } from "../Server.js";
import figlet from "figlet";

export const Institution = {
     add: async() => {
          const newInstitution = await inquirer.prompt([
               {
                    type:"input",
                    name: "name",
                    message: "Enter the institution name:"
               },
               {
                    type: "file",
                    name: "logo",
                    message:"Select logo: "
               },
               {
                    type: "input",
                    name: "email",
                    message: "Enteer institution email:"
               },
               {
                    type:"input",
                    name: "location",
                    message: "Enter the institution Location (,)"
               }
          ]);
          
          const res = await Server.post(Endpoints.institution, newInstitution);
          if(res){
               console.log(res);
          }else{
               console.log("error adding the new institution!!!");
          }
     },
     search: async() => {
          const {id} = await inquirer.prompt({
               type: "number",
               name: "id",
               message: "Enter the institution id: "
          });
          const res = await Server.get(`${Endpoints.institution}/${id}`);
          if(res){
               figlet('Institution Found', (err, data) => {
                    if (err) {
                         console.log('Something went wrong...');
                         console.dir(err);
                         return;
                    }
                    console.log(data); 
                    console.table(res);
               });
          }else {
               console.log('insitution not found');
          }
     },
     display:async () => {
          const res = await Server.get(Endpoints.institution);
          if(res){
               figlet('Institution Found', (err, data) => {
                    if (err) {
                         console.log('Something went wrong...');
                         console.dir(err);
                         return;
                    }
                    console.log(data); 
                    console.table(res);
               });
          }else {
               console.log('insitution not found');
          }
     },
     delete: async() => {
          const {id} = await inquirer.prompt({
               type: "number",
               name: "id",
               message: "Enter the institution id: "
          });
          const res = await Server.delete(`${Endpoints.institution}/${id}`);
          if(res){
               console.log('Institution delete succesfully')
          }else {
               console.log('insitution not found');
          }
     }
}