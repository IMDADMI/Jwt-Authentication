import axios from "axios";
import Cookies from "universal-cookie";

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.post["content-type"] = 'application/json'
const cookie = new Cookies();
export const request = async (method,url,data)=>{
    let headers = {}
    if(url !== '/register/user' && url !== '/user/login'){
        console.log('inside the block');
        const accessToken = getAccessToken()
        if( accessToken !== undefined)
            headers = {Authorization: `Bearer ${accessToken}`}
        
        else{
            //get refresh token and request the access
            const refreshToken = await requestRefreshToken("GET","/token/refresh")
            console.log('requesting refresh token ',refreshToken);
            if(refreshToken!==undefined && refreshToken.status===200){
                const accessToken = refreshToken.data.accessToken
                saveAccessToken(accessToken)
                headers = {Authorization: `Bearer ${accessToken}`}
            }
            else 
                return null//which mean login ---> NOT HANDLED YET !!!!       
        }
    }
    console.log('sending the request');
    console.log(method,headers,url,data);
    return await axios({
        method:method,
        headers:headers,
        url:url,
        data:data
    });

} 
export const requestRefreshToken = async (method,url)=>{
    let headers = {};
    const refreshToken = getRefreshToken();
    if(refreshToken)
        headers = {Authorization: `Bearer ${refreshToken}`}
    else
        return null;//which means we need to login
    return await axios({
        method:method,
        headers:headers,
        url:url,
        data:{}
    });

} 
export const saveAccessToken = (accessToken)=>{
    cookie.set('access-token',accessToken,{ maxAge: 60*5});

}  
export const saveRefreshToken = (refreshToken)=>{
    cookie.set('refresh-token',refreshToken, { maxAge: 30*(60*60*24)});//30days

}
export const getAccessToken = ()=>{
    return cookie.get('access-token')
}
export const getRefreshToken = ()=>{
    return cookie.get('refresh-token')
}
export const destroyTokens = ()=>{
    // SOO00ON !!!!
    // request("DELETE","/user/logout",{});
    cookie.remove('access-token');
    cookie.remove('refresh-token');
}

