import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import { useSelector,useDispatch } from 'react-redux'

function Auth({children}) {
    const [loading, setLoading] = useState(false)
    const authenticated = useSelector(state=> state.auth.user.authStatus)
    const themeCheck = useSelector(state => state.theme.value);
    console.log('authcheck', authenticated)
    const navigate = useNavigate()



    useEffect(()=>{
        if(!authenticated)
        {   
            navigate('/auth/login')
        }
        else
        {
            // navigate to the requested page
        }

        setLoading(false)

    },[authenticated, navigate])
  
    return loading ? "Loading ... " : children ;
}

export default Auth