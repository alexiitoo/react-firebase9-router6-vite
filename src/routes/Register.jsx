import { async } from "@firebase/util";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

const Register=() =>{
    
   

    const {registerUser} =useContext(UserContext)
    const navegate = useNavigate();
    const {required,patternEmail,minLength,validatetrim,validateEquals} = formValidate();
    
    
    const{register,
        handleSubmit,
        setError,
        getValues,
        formState: {errors}}=useForm
        ({defaultValues:{
        email: 'alexiitoo199723@gmail.com',
        password:'123123',
        repassword: '123123'
    },
    });

    const onSubmit =async ({email,password}) =>{
       
        
        try {
           await registerUser(email,password)
            navegate("/");
        } 
        catch (error) {
            console.log(error.code);
            const{code,message} = erroresFirebase(error.code)
            setError(code,{message,});
            
           
        };
    
     }
    return(

        <>

       <Title text="Register"/>
       
        
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
            type="email"
            placeholder="Ingrese email"
            {...register("email",{
                required,
                pattern:patternEmail
         })}
         label="Ingresa tu correo"
         error={errors.email}
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
        label="Ingresa tu contraseña"
        error={errors.password}
            > 
            <FormError error={errors.password}/>
            </FormInput>
            
            
                
            
            <FormInput
            type="Password" 
            placeholder="Ingrese contraseña"
            {...register("repassword",{
                validate: validateEquals(getValues("password")),

            })}
            label="Repite contraseña"
            error={errors.repassword}
            > 

                <FormError error={errors.repassword}/>

            </FormInput>
           
            
                
            

            <Button text="Register" type="submit"/>

        </form>
        
        </>
    )
}
export default Register;