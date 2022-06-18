import { useContext } from "react";
import {useNavigate} from "react-router-dom"
import {UserContext} from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import { formValidate } from "../utils/formValidate";
import Title from "../components/Title";
import Button from "../components/Button";



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
                const{code,message} = erroresFirebase(error.code)
                setError(code,{message,});
                
                
               
            };
        
         }
    
    
    

    return (
        <>
        <Title text="Login"/>
       
        
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
        label="Ingresa tu correo"
            type="email"
            placeholder="Ingrese email"
            {...register("email",{
                required,
                pattern:patternEmail
         })}
         error={errors.email}
            > 
            
            <FormError error={errors.email}/>
                
            </FormInput>

            <FormInput
            label="Ingresa tu contraseña"
            type="Password" 
            placeholder="Ingrese Contrasena"
            {...register("password",{
                minLength,
               
            validate:validatetrim,
            
        })}
        error={errors.password}
            > 

            <FormError error={errors.password}/>
            </FormInput>
           

            <Button text="Login" type="submit" />


        </form>
        </>
    )
}
    export default Login;