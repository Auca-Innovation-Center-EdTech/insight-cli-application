import axios from "axios"

const serverUrl = 'http://localhost:3000';

export const Endpoints = {
     institution: "institution",
     staff: 'staff'
}

export const Server = {
     post: async(endpoint, data) => {
          try {
               if(!serverUrl){
                    console.log(serverUrl);
                    return
               }
               const res = await axios.post(`${serverUrl}/${endpoint}`, data);
               return res.data;
          } catch (error) {
               console.log(error)
               return null
          }
     },
     get: async (endpoint) => {
          try {
               const res = await axios.get(`${serverUrl}/${endpoint}`);
               return res.data;
          } catch (error) {
               console.log(error)
               return null
          }
     },
     path:async(endpoint, data) => {
          try {
               const res = await axios.patch(`${serverUrl}/${endpoint}`, data);
               return res.data;
          } catch (error) {
               console.log(error)
               return null
          }
     },
     delete: async (endpoint) => {
          try {
               const res = await axios.delete(`${serverUrl}/${endpoint}`);
               return res.data;
          } catch (error) {
               console.log(error)
               return null
          }
     }
}
