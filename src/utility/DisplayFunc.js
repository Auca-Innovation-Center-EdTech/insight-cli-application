import figlet from "figlet"

export function getFigletText (text) {
     return new Promise((resolve,reject)=> {
          figlet(text, (error,data) => {
               if(error) reject(error);
               resolve(data);
          })
     })
}