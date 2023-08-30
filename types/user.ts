import express from "express";
namespace Users{
    export interface Item{
    id: string,
    name: string,
    password: string

    }
    export interface Request extends express.Request {
     
      }
    
    export interface Response extends express.Response {
    
      }
         
}

export default Users;