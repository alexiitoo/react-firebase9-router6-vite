import { useContext } from "react";
import {useNavigate} from "react-router-dom"
import {UserContext} from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import { formValidate } from "../utils/formValidate";



const Login =() => {

    
    

    const {loginUser} = useContext(UserContext);
    const navegate = useNavigate();
    const {required,patternEmail,minLength,validatetrim} = formValidate();

    const{register,
        handleSubmit,
        setError,
        formState: {errors}}=useForm
        ({defaultValues:{
        email: 'alexiitoo199723@gmail.com',
        password:'123123',
        repassword: '123123'
    },
        });

        const onSubmit =async ({email,password}) =>{
       
        
            try {
               await loginUser(email,password)
                navegate("/");
            } 
            catch (error) {
                console.log(error.code);
                setError("firebase",{
                    message: erroresFirebase(error.code),
                });
                
               
            };
        
         }
    
    
    

    return (
        <>
        <h1> Login</h1>
        <FormError error={errors.firebase}/>
        <form onSubmit={handleSubmit(onSubmit)}>

        <FormInput
            type="email"
            placeholder="Ingrese email"
            {...register("email",{
                required,
                pattern:patternEmail
         })}
            > 
            <FormError error={errors.email}/>
                
            </FormInput>

            <FormInput
            type="Password" 
            placeholder="Ingrese Contrasena"
            {...register("password",{
                minLength,
               
            validate:validatetrim,
            
        })}
            > 
            <FormError error={errors.password}/>
            </FormInput>
           

            <button type="submit">Entrar </button>


        </form>
        </>
    )
}
    export default Login;