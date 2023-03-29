import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../services/firebase';

function NewAccount(){

        const navigate = useNavigate();
     
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('');
     
        const onSubmit = async (e) => {
          e.preventDefault()
         
          await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate("/")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
            setEmail('')
            setPassword('')
       
        }

    return(
        <section className="mySection min-h-screen bg-[#090E34]">
            
            <div className="col min-h-[70vh] text-white">

                <h1 className="text-[1.5em] uppercase tracking-widest">Nova conta</h1>

                <form action="" className="flex flex-col m-6">
                    <label htmlFor="email-address" className="text-left">E-mail</label>
                    <input label="E-mail" className="p-1 rounded mb-4 text-black" type="email" placeholder="exemplo@lanchofire.com" onChange={(e) => setEmail(e.target.value)}  value={email}  />
                    <label htmlFor="password" className="text-left">Senha</label>
                    <input label="Senha" className="p-1 rounded mb-4 text-black" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <button type="submit" className="btn-primary mt-4" onClick={onSubmit}  >Criar conta</button>
                </form>

            </div>

        </section>

    )
}

export default NewAccount