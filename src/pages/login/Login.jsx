import React, {useState} from 'react';
import {  signInWithEmailAndPassword, onAuthStateChanged   } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { NavLink, useNavigate } from 'react-router-dom'

function Login(){

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid)
          navigate("/admin")
          // ...
        } else {
          console.log('Não logado')
        }
      });

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/admin")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }

    return(
        <section className="mySection min-h-screen bg-[#090E34]">
            
            <div className="divCol min-h-[70vh] text-white">

                <h1 className="text-[1.5em] uppercase tracking-widest">Acesse sua conta</h1>

                <form action="" className="flex flex-col m-6">
                    <label htmlFor="" className="text-left">Login</label>
                    <input id="email-address" name="email" className="p-1 rounded mb-4 text-black" type="email" placeholder="exemplo@lanchofire.com" required onChange={(e)=>setEmail(e.target.value)}/>
                    <label htmlFor="" className="text-left">Senha</label>
                    <input id="password" name="password" className="p-1 rounded mb-4 text-black" type="password" required onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit" className="btn-primary mt-4" onClick={onLogin} >Entrar</button>
                </form>

            </div>

        </section>

    )
}

export default Login