import { onSnapshot, collection, doc, deleteDoc, serverTimestamp, updateDoc, QuerySnapshot} from "firebase/firestore"
import { useEffect, useState } from "react"
import  db  from '../../services/firebase'
import React from 'react';

function Home(){

    const [sideDishes, setSideDishes] = useState([{}])
    const [drinks, setDrinks] = useState([{}])
    const [burguers, setBurguers] = useState([{}])

    const ref_sideDish = collection(db, 'acompanhamentos')
    const ref_drinks = collection(db, 'bebidas')
    const ref_burguers = collection(db, 'lanches')
    

    useEffect(() => {

        const list_sideDish = onSnapshot(ref_sideDish, (querySnapshot) => {

            const items_sideDish = []

            querySnapshot.forEach((doc) => {
                items_sideDish.push({id: doc.id, ...doc.data()})
            })
            setSideDishes(items_sideDish)
            
            return () => {
                list_sideDish()
            }
        })

        const list_drinks = onSnapshot(ref_drinks, (querySnapshot) => {
            const items_drinks = []

            querySnapshot.forEach(doc => {
                items_drinks.push({id: doc.id, ...doc.data()})
            })
            setDrinks(items_drinks)
            return() => {
                list_drinks()
            }
        })

        const list_burguers = onSnapshot(ref_burguers, (querySnapshot) => {
             const items_burguers= []   

             querySnapshot.forEach(doc => {
                items_burguers.push({id: doc.id, ...doc.data()})
            })
            setBurguers(items_burguers)
            return() => {
                list_burguers()
            }
        })

    }, [])

    sideDishes.forEach(el => {
        console.log(el.ingredients)
    })

    return(
        <section className="mySection min-h-[93vh] bg-[#090E34]">

            <h1 className="text-[1.5em] text-white uppercase tracking-[0.5em]">Cardápio</h1>
            
            <div className="div">

                <div className='blocks'>

                    <h2 className=' uppercase tracking-[0.1em] text-[#090E34] bg-yellow-400 rounded w-[90%] px-5 py-1'>Entradas</h2>

                    {
                        sideDishes?.map(sideDish => {
                            return(
                                <div className='divRow text-white mt-4'>
                                <div className=''>
                                    <h3 className='font-bold'>{sideDish.name}</h3>
                                    <p>{sideDish.ingredients}</p>
                                </div>
                                <p>R${sideDish.price}</p>
                                </div>
                            )
                        })
                    }
                   
                </div>

                <div className='blocks'>

                <h2 className=' uppercase tracking-[0.1em] text-[#090E34] bg-yellow-400 rounded w-[90%] px-5 py-1'>Lanches</h2>
                    
                {
                        burguers?.map(burguer => {
                            return(
                                <div className='divRow text-white mt-4'>
                                <div className=''>
                                    <h3 className='font-bold'>{burguer.name}</h3>
                                    <p>{burguer.ingredients}</p>
                                </div>
                                <p>R${burguer.price}</p>
                                </div>
                            )
                        })
                }

                </div>

                <div className='blocks'>

                <h2 className=' uppercase tracking-[0.1em] text-[#090E34] bg-yellow-400 rounded w-[90%] px-5 py-1'>Bebidas</h2>

                {
                        drinks?.map(drink => {
                            return(
                                <div className='divRow text-white mt-4'>
                                <div className=''>
                                    <h3 className='font-bold'>{drink.name}</h3>
                                    {/* <p>{drink.ingredients}</p> */}
                                </div>
                                <p>R${drink.price}</p>
                                </div>
                            )
                        })
                    }

                </div>

            </div>

        </section>

    )
}

export default Home