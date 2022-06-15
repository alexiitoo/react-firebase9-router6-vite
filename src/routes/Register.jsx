import { async } from "@firebase/util";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
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
            setError("firebase",{
                message: erroresFirebase(error.code),
            });
            
           
        };
    
     }
    return(

        <>

        <h1>Register</h1>
       
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
            
            
                
            
            <FormInput
            type="Password" 
            placeholder="Ingrese Contrasena"
            {...register("repassword",{
                validate: validateEquals(getValues),

            })}
            > 

                <FormError error={errors.repassword}/>

            </FormInput>
           
            
                
            

            <button type="submit">Register </button>


        </form>
        
        </>
    )
}
export default Register;