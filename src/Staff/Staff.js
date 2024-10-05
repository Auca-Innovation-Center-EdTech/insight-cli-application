import inquirer from "inquirer";
import { Endpoints, Server } from "../Server.js";
import clc from 'cli-color';

export const Staff = {
     add: async() => {
          const newStaff = await inquirer.prompt([
               {
                    type:"input",
                    name: "name",
                    message: "Enter name:"
               },
               {
                    type: "input",
                    name: "email",
                    message:"Enter email: "
               },
               {
                    type: "input",
                    name: "password",
                    message: "Create password:"
               },
               {
                    type:"input",
                    name: "role",
                    message: "Staff Role: "
               },
               {
                    type: 'checkbox', // Use checkbox to allow multiple selections
                    name: 'permissions',
                    message: 'Select user permissions:',
                    choices: [
                         { name: 'Save', value: 'save' },
                         { name: 'Update', value: 'Update' },
                         { name: 'Delete', value: 'delete' },
                         { name: 'View', value: 'view' },
                         { name: 'Login', value: 'login' },
                         { name: 'Institution', value: 'institution' },
                         { name: 'Employee', value: 'employee' },
                         { name: 'Credential', value: 'credential' },
                         { name: 'Staff', value: 'staff' },
                    ]
               }
          ]);

          console.log(`new staff:`);
          console.table(newStaff);
          const {save} = await inquirer.prompt({
               type:'confirm',
               name: 'save',
               message: "continue saving the stuff: "
          });

          if(save) {
               const res = await Server.post(Endpoints.staff, newStaff);
               if(res){
                    console.log(res);
               }else{
                    console.log("error adding the new staff!!!");
               }
          }else{
               const {saveAnother} = await inquirer.prompt({
                    type: 'confirm',
                    name:'saveAnother',
                    message: 'would like to add another stuff?'
               });
               if(saveAnother){
                    return await Staff.add()
               }else {
                    return;
               }
          }
          
          
     },
     search: async() => {
          const {id} = await inquirer.prompt({
               type: "number",
               name: "id",
               message: "Enter the staff id: "
          });
          if(id) {
               const res = await Server.get(`${Endpoints.staff}/${id}`);
               if(res){
                    console.log(clc.green("staff found"));
                    console.table(res);
               }else {
                    console.log(clc.red('insitution not found'));
               }
          }else{
               console.log(clc.red('invalid staff id'));
          }
          
     },
     display:async () => {
          const res = await Server.get(Endpoints.staff);
          if(res){
               console.log(clc.green("List of Staff"));
               console.table(res);
          }else {
               console.log('insitution not found');
          }
     },
     delete: async() => {
          const {id} = await inquirer.prompt({
               type: "number",
               name: "id",
               message: "Enter the staff id: "
          });
          const res = await Server.delete(`${Endpoints.staff}/${id}`);
          if(res){
               console.log(clc.green('Staff deleted succesfully'))
          }else {
               console.log(clc.red('staff not found'));
          }
     }
}