export enum ApiUrl {
    // baseUrl = "https://server-budyog.onrender.com/api/user/"
    baseUrl = "http://buyogo.ap-south-1.elasticbeanstalk.com/api/user/"
}

export enum ApiTypes {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    DELETE = "DELETE"
}

export const designations:any = [
    { name: "Manager", value: "manager" },
    { name: "Frontend Developer", value: "frontend" },
    { name: "Backend Developer", value: "backend" },
    { name: "Q.A.", value: "qa" },
    { name: "H.R", value: "hr" },
    { name: "Full Stack Developer", value: "fullStack" },
    { name: "Sales Manager", value: "sales" },
  ]

export interface ApiData {
    userLogin:{
        url?:string,
        method?:string
    }
    userSignin:{
        url?:string,
        method?:string
    },
    getUser:{
        url?:string,
        method?:string
    }
}