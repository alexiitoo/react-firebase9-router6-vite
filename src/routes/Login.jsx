import { useContext, useState } from "react";
import {useNavigate} from "react-router-dom"
import {UserContext} from "../context/UserProvider";


const Login =() => {

    const[email,setEmail] = useState('alexiitoo1997@gmail.com')
    const[password,setPassword] = useState('alexiitoo12')
    

    const {loginUser} = useContext(UserContext);
    const navegate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log('Procesando form: ', email, password);
        try {
            await loginUser(email,password);
            console.log('Usuario Loggeado');
            navegate("/")
        } catch (error) {
            console.log(error.code);
           
        };
    }
    
    

    return (
        <>
        <h1> Login</h1>
       
        <form onSubmit={handleSubmit}>

            <input type="email" 
            placeholder="Ingrese email"
            value = {email}
            onChange={e=>setEmail(e.target.value) }
            />

            <input type="Password" 
            placeholder="Ingrese Contrasena"
            value = {password}
            onChange={e=>setPassword(e.target.value) }/>

            <button type="submit">Entrar </button>


        </form>
        </>
    )
}
    export default Login;