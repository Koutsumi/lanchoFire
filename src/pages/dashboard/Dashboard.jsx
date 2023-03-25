import React from 'react';
import {  signOut } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Dashboard(){
    const auth = getAuth();
    const navigate = useNavigate();

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid)
          // ...
        } else {
          console.log('Não logado')
          navigate("/login")
        }
      });

 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    return(
        <section className="mySection min-h-screen bg-[#090E34]">
            
            <div className="divCol min-h-[70vh] text-white">

                <h1 className="text-[1.5em] uppercase tracking-widest">Você esta logado!</h1>

                <button onClick={handleLogout}>Sair</button>

            </div>

        </section>

    )
}

export default Dashboard