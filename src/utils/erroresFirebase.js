export const erroresFirebase = (code) =>{
    switch (code) {
        case "auth/email-already-in-use":
            return "usuario ya registrado"
            
            
            case "auth/invalid-email" :
                return "Formato email no valido"
            
                case "auth/user-not-found" :
                    return "Usuario no registrado";

                case "auth/wrong-password":
                    return "Contrasena incorrecta";

            default: 
          return 'ocurrio un error en el server';
            
           
    }

}