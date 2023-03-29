import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { onSnapshot, collection, doc, deleteDoc, serverTimestamp, updateDoc, addDoc} from "firebase/firestore"
import { useEffect, useState } from "react"
import  db  from '../../services/firebase'

function Drink(){

    const [isNavAddExpanded, setIsNavAddExpanded] = useState(false)
    const [isNavEditExpanded, setIsNavEditExpanded] = useState(false)

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

      const [drinks, setDrinks] = useState([{}])
  
      const ref_drinks = collection(db, 'bebidas')

      useEffect(() => {

        const list_drinks = onSnapshot(ref_drinks, (querySnapshot) => {
             const items_drinks= []   

             querySnapshot.forEach(doc => {
                items_drinks.push({id: doc.id, ...doc.data()})
            })
            setDrinks(items_drinks)
            return() => {
                list_drinks()
            }
        })

    }, [])

    const [name, setName] = useState()
    const [ingredients, setIngredients] = useState()
    const [price, setPrice] = useState()
    const [drink_id, setDrink_Id] = useState()

    function resetInfos(){
        setName('')
        setIngredients('')
        setPrice('')
    }

    async function newDrink(event){
        event.preventDefault()
        const docRef = await addDoc(collection(db, 'bebidas'),{
            name ,
            ingredients ,
            price ,
            createdAt : serverTimestamp(),
            updatedAt:  serverTimestamp()
        });

        setName('')
        setIngredients('')
        setPrice('')
        setIsNavAddExpanded(false)
    }

    function editDrinkInfo(drink){
        setDrink_Id(drink.id)
        setName(drink.name)
        setIngredients(drink.ingredients)
        setPrice(drink.price)
    }

    async function updateDrink(event){
        event.preventDefault()
        const drink_ref = doc(ref_drinks, drink_id)
        const updateCliente =  await updateDoc(drink_ref, {
            name,
            price,
            ingredients,
            updatedAt: serverTimestamp()
        })
        setIsNavEditExpanded(false)
    }
    
    async function deleteDrink(drink){

        try{
            const drink_ref = doc(ref_drinks, drink.id)
            await deleteDoc(drink_ref)

        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <section className='mySection bg-[#090E34]'>

            <div className='row my-7'>
                <h1 className='text-white text-[1.5rem]'>Minhas bebidas cadastradas</h1>
                <button onClick={() => {setIsNavAddExpanded(!isNavAddExpanded); resetInfos()}} className='btn-primary'>Nova bebida</button>
            </div>

            <div className='start w-[100%]'>

                {
                    drinks.map(drink => {
                        return(
                        <div key={drink.id} className="row bg-yellow-400 p-4 m-4 rounded-lg text-[#1D2144]">
                            <div>
                                <h1 className='font-bold'>{drink.name}</h1>
                                <p>{drink.ingredients}</p>
                                <p>
                                    <button onClick={() => {setIsNavEditExpanded(!isNavEditExpanded); editDrinkInfo(drink)}} className='btn-edit'>Editar</button> 
                                    <button onClick={() => deleteDrink(drink)} className='btn-remove'>Excluir</button>
                                </p>
                            </div>
                            <p>R${drink.price}</p>
                        </div>
        
                        )
                    })
                }

                <div className="row text-white  text-[1.2rem] pt-5 pb-9">
                    <button className='hover:text-yellow-400'><a href="/admin"> ← Voltar</a></button>
                </div>

            </div>

            <div className={isNavAddExpanded ? 'mySection w-[320px] min-h-[350px] bg-[#090e34] fixed rounded-lg text-white' : 'hidden'}>
                <div className='col'>
                    <h2>Nova bebida</h2>
                    <form onSubmit={newDrink} action="" className='col'>
                        <input onChange={event => setName(event.target.value)} value={name || ''} className="inputs" type="text" name="name" id="" placeholder="Digite o nome da bebida"/>
                        <input onChange={event => setPrice(event.target.value)} value={price || ''} className="inputs" type="text" name="price" id="" placeholder="Digite o valor da bebida"/>
                        <textarea onChange={event => setIngredients(event.target.value)} value={ingredients || ''} className="inputs" type="text" name="ingredients" id="" placeholder="Digite as informações da bebida"/>
                        <div className='row'>
                        <div onClick={() => {setIsNavAddExpanded(!isNavAddExpanded)}} className='btn-remove cursor-pointer'>Cancelar</div>
                        <button type="submit" className='btn-edit'>Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className={isNavEditExpanded ? 'mySection w-[320px] min-h-[350px] bg-[#090e34] fixed rounded-lg text-white' : 'hidden'}>
                <div className='col'>
                    <h2>Editar bebida</h2>
                    <form onSubmit={updateDrink} action="" className='col'>
                        <input onChange={event => setName(event.target.value)} value={name || ''} className="inputs" type="text" name="name" id="" placeholder="Digite o nome da bebida"/>
                        <input onChange={event => setPrice(event.target.value)} value={price || ''} className="inputs" type="text" name="price" id="" placeholder="Digite o valor da bebida"/>
                        <textarea onChange={event => setIngredients(event.target.value)} value={ingredients || ''} className="inputs" type="text" name="ingredients" id="" placeholder="Digite as informações da bebida"/>
                        <div className='row'>
                        <div onClick={() => {setIsNavEditExpanded(!isNavEditExpanded)}} className='btn-remove cursor-pointer'>Cancelar</div>
                        <button type="submit" className='btn-edit'>Alterar</button>
                        </div>
                    </form>
                </div>
            </div>
            
        </section>
    )
}

export default Drink