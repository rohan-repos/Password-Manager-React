import React from 'react'
import {Route,Redirect} from "react-router-dom"
import {useAuth} from "../../context/AuthContext"

export default function RedirectPrivateRoute({component :Component, ...rest}) {
    const {currentUser} = useAuth()
    return (
    <Route
        {...rest} 
        render= {props =>{
            return currentUser ? <Redirect to="/home"/> : <Component {...props} />
        }}>       
    </Route>
    )
}
