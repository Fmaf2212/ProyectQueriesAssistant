import axios from "axios";

const TOKEN_KEY = 'loggedQueriesAssistantUser';

export function setToken(token){
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(){
    return localStorage.getItem(TOKEN_KEY);
}

export function deleteToken(){
    localStorage.removeItem(TOKEN_KEY);
}

export function initAxiosInterceptors(){
    axios.interceptors.request.use(function(config){
        const token = getToken();

        if(token){
            config.headers.Autorization = `bearer ${token}`
        }

        return config;
    });

    // axios.interceptors.response.use(
    //     function(response){
    //         return response;        
    //     },
    //     function(error){
    //         if(error.response.status === 401){

    //         }
    //     }
    // );
}

