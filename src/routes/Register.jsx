import { async } from "@firebase/util";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Register=() =>{
    
   

    const {registerUser} =useContext(UserContext)
    const navegate = useNavigate();
    const{register,handleSubmit,setError,getValues,formState: {errors}}=useForm({defaultValues:{
        email: 'alexiitoo199723@gmail.com',
        password:'123123',
        repassword: '123123'
    },
    });

    const onSubmit =async ({email,password}) =>{
        console.log(email,password)
        
        try {
           await registerUser(email,password)
           console.log('Usuario creado')
            navegate("/");
        } 
        catch (error) {
            console.log(error.code);
            switch (error.code) {
                case "auth/email-already-in-use":
                   // console.log('usuario ya registrado')
                    setError("email",{
                        message: "usuario ya registrado"
                    });
                    break;
                    case "auth/invalid-email" :
                        setError("email",{
                            message: "Formato email no valido",
                        });

                    default: 
                    console.log('ocurrio un error en el server')
                    
                   
            }
           
        };
    
     }
    return(

        <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

            <input type="email" 
            placeholder="Ingrese email"
           {...register("email",{
               required: {
            value: true,
            message: "Campo obligatorio"
        },
        pattern:{
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Formato de email incorrecto"
        }
        
        })}
            
            />
            {
                errors.email && <p>{errors.email.message}</p>
            }

            <input type="Password" 
            placeholder="Ingrese Contrasena"
            {...register("password",{minLength:{
                value:6,
                message:"Minimo 6 caracteres"
                
            },
            validate:{
                trim: (v) => {
                    if(!v.trim()) {
                    return "No seas payaso, escribe algo";
                }
                    return true;
                },
                
            },
            
        })}
            
            />
            {
                errors.password && <p>{errors.password.message} </p>
            }
            <input type="Password" 
            placeholder="Ingrese Contrasena"
            {...register("repassword",{
                setValueAs: (v) => v.trim(),
                validate:{
                    equals: v => v === getValues("password") || "No coiciden las contrasenas",
                   // message:"No coiciden las contrasenas"
                }

            })}
            />
            {
                errors.repassword && <p>{errors.repassword.message}</p>
            }

            <button type="submit">Register </button>


        </form>
        
        </>
    )
}
export default Register;