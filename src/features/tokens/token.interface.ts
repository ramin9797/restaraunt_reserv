export interface IToken{
    access_token:string;
    refresh_token:string;
}


export interface ITokenPayload{
    [key:string]:string| number;
}