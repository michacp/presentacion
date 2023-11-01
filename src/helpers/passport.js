const passport =require('passport');
const Usuario=require('../models/Usuario')
const LocalStrategy=require('passport-local').Strategy;
const bq =require('./bcrypt');
//user_users
passport.use('auth',new LocalStrategy({
    usernameField:'user_users',
    passwordField:'pass_users',
    passReqToCallback:true
},async (req,user_users,pass_users,done)=>{
   // console.log('usuario encontrado')
    const registros= await Usuario.findCuenta(user_users);
    if (registros.length > 0){
        const user_users=registros[0];
        if(bq.verifyPassword(pass_users,user_users.pass_users)){
            console.log('crednciales correctas')
            done(null,user_users);
        }else{
            console.log('contraseña incorrecta')
            done(null,false);
        }
    }else{
        console.log('la cuenta no existe')
        done(null,false);
    }
}));

passport.serializeUser(function(user_users, done) {
    
    done(null,user_users.id_users);
  });
  
  passport.deserializeUser( async(id_users, done) =>{
    const usuario=await Usuario.find(id_users)
   
      done(null, usuario[0]);
    
  });