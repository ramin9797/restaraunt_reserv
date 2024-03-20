export enum UserRole{
    Admin="admin",
    Partner="partner",
    User="user"
}

export enum Gender{
    Male,
    Female
}

export interface IUser{
    id?:number;
    name:string;
    email:string;
    password:string;
    gender:Gender;
    role:UserRole;
}


export interface IAuthResult{
    userId:number;
    access_token:string;
    refresh_token:string;
}