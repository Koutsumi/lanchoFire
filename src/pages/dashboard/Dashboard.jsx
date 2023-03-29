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
        <section className="mySection min-h-screen bg-[#090E34] text-white">
            
            <div className="col">

            <h1 className='text-[2rem]'>Portal do Administrador</h1>
            
            <p>Meus produtos</p>

                <div className='wrap my-10 mx-auto gap-6'>
                    <a href="/admin/burguer"><div className='col my-2 btn-products w-[250px] h-[250px]'>Lanches</div></a>
                    <a href="/admin/sideDish"><div className='col my-2 btn-products w-[250px] h-[250px]'>Acompanhamentos</div></a>
                    <a href="/admin/drinks"><div className='col my-2 btn-products w-[250px] h-[250px]'>Bebidas</div></a>
                </div>

            </div>

            <button className='text-[1.2rem] hover:text-yellow-400' onClick={handleLogout}>Sair  →</button>

        </section>

    )
}

export default Dashboard