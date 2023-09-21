import express from "express";
namespace Profile{
    export interface Item{
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date

    }
    export interface Request extends express.Request {
     
      }
    
    export interface Response extends express.Response {
    
      }
         
}

export default Profile;