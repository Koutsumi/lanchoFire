import React from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

function Home(){

    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
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

export default Home