import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function LoginRoute({isAuth:isAuth, component:Component, ...rest}) {
    console.log(isAuth)
    return(
            <Route {...rest} render={(props) => {
                if(isAuth){
                    return <Redirect to={{pathname:"/dashboard",state:{from:props.location}}} />
                }
                return <Component />
            }
            } />
    )
}