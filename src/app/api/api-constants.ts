import { ApiData, ApiTypes } from "./api-config";

export const API_END_POINTS:ApiData= {
    userLogin: {
        url: "login",
        method: ApiTypes.POST
    },
    userSignin: {
        url: "signup",
        method: ApiTypes.POST
    },
    getUser: {
        url: "get/",
        method: ApiTypes.GET
    }
}