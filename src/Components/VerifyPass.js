import React ,{useEffect,useState} from 'react'
import queryString from 'query-string'
import {useAuth} from "../context/AuthContext"
import { Alert,Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'


// console.log(window.props)
export default function VerifyPass() {
    const {verifyPassword} = useAuth()
    const [message,setMessage] = useState("")
    const [error,setError]= useState("")
    const [loading,setLoading]=useState(false)
    const search = (window.location.search)
    // console.log(queryString.parse(search))
    const {oobCode} = queryString.parse(search)
    const history = useHistory()
    console.log(oobCode)

    useEffect(() => {
        setError("")
            setLoading(true)

            const promises = []
            if(oobCode)
            {
              promises.push(verifyPassword(oobCode))
            }
            Promise.all(promises)
            .then(()=>{
                history.push({
                    pathname:'/reset-password',
                    state : {code : oobCode}
            })
                // <Redirect to="/reset-password" props={email}/>
            })
            .catch(()=> {
                setError('Failed to get account')
            })
            .finally(()=>{
                setLoading(false)
            })
    }, [])

    // function handleClick(e){
    //     console.log("in this function")
    //     // try{
    //     // await verifyPassword(oobCode)
    //     // .then(function(email) {
    //     //     setMessage("success")
    //     // })}
    //     // catch(function() {
    //     //     setMessage("Fail")
    //     // })

            
    //       }
      
    
    return (
        <div >
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
        </div>
    )
}
