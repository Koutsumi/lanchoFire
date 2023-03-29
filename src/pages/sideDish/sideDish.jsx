import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { onSnapshot, collection, doc, deleteDoc, serverTimestamp, updateDoc, addDoc} from "firebase/firestore"
import { useEffect, useState } from "react"
import  db  from '../../services/firebase'

function SideDish(){

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

      const [sideDish, setSideDish] = useState([{}])
  
      const ref_sideDishes = collection(db, 'acompanhamentos')

      useEffect(() => {

        const list_sideDishes = onSnapshot(ref_sideDishes, (querySnapshot) => {
             const items_sideDishes= []   

             querySnapshot.forEach(doc => {
                items_sideDishes.push({id: doc.id, ...doc.data()})
            })
            setSideDish(items_sideDishes)
            return() => {
                list_sideDishes()
            }
        })

    }, [])

    const [name, setName] = useState()
    const [ingredients, setIngredients] = useState()
    const [price, setPrice] = useState()
    const [sideDish_id, setSideDish_id] = useState()

    function resetInfos(){
        setName('')
        setIngredients('')
        setPrice('')
    }

    async function newSideDish(event){
        setName('')
        setIngredients('')
        setPrice('')
        setIsNavAddExpanded(false)
        console.log('teste')

        event.preventDefault()
        const docRef = await addDoc(collection(db, 'acompanhamentos'),{
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

    function editSideDishInfo(sideDish){
        setSideDish_id(sideDish.id)
        setName(sideDish.name)
        setIngredients(sideDish.ingredients)
        setPrice(sideDish.price)
    }

    async function updateSideDish(event){
        event.preventDefault()
        const sideDish_ref = doc(ref_sideDishes, sideDish_id)
        const updateCliente =  await updateDoc(sideDish_ref, {
            name,
            price,
            ingredients,
            updatedAt: serverTimestamp()
        })
        setIsNavEditExpanded(false)
    }
    
    async function deleteSideDish(sideDish){

        try{
            const sideDish_ref = doc(ref_sideDishes, sideDish.id)
            await deleteDoc(sideDish_ref)

        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <section className='mySection bg-[#090E34]'>

            <div className='row my-7'>
                <h1 className='text-white text-[1.5rem]'>Meus acompanhamentos cadastrados</h1>
                <button onClick={() => {setIsNavAddExpanded(!isNavAddExpanded); resetInfos()}} className='btn-primary'>Novo acompanhamento</button>
            </div>

            <div className='start w-[100%]'>

                {
                    sideDish.map(sideDish => {
                        return(
                        <div key={sideDish.id} className="row bg-yellow-400 p-4 m-4 rounded-lg text-[#1D2144]">
                            <div>
                                <h1 className='font-bold'>{sideDish.name}</h1>
                                <p>{sideDish.ingredients}</p>
                                <p>
                                    <button onClick={() => {setIsNavEditExpanded(!isNavEditExpanded); editSideDishInfo(sideDish)}} className='btn-edit'>Editar</button> 
                                    <button onClick={() => deleteSideDish(sideDish)} className='btn-remove'>Excluir</button>
                                </p>
                            </div>
                            <p>R${sideDish.price}</p>
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
                    <h2>Novo acompanhamento</h2>
                    <form onSubmit={newSideDish} action="" className='col'>
                        <input onChange={event => setName(event.target.value)} value={name} className="inputs" type="text" name="name" id="" placeholder="Nome do acompanhamento"/>
                        <input onChange={event => setPrice(event.target.value)} value={price} className="inputs" type="text" name="price" id="" placeholder="Valor do acompanhamento"/>
                        <textarea onChange={event => setIngredients(event.target.value)} value={ingredients} className="inputs" type="text" name="ingredients" id="" placeholder="Digite as informações do acompanhamento"/>
                        <div className='row'>
                        <div onClick={() => {setIsNavAddExpanded(!isNavAddExpanded)}} className='btn-remove cursor-pointer'>Cancelar</div>
                        <button type="submit" className='btn-edit'>Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className={isNavEditExpanded ? 'mySection w-[320px] min-h-[350px] bg-[#090e34] fixed rounded-lg text-white' : 'hidden'}>
                <div className='col'>
                    <h2>Editar acompanhamento</h2>
                    <form onSubmit={updateSideDish} action="" className='col'>
                        <input onChange={event => setName(event.target.value)} value={name || ''} className="inputs" type="text" name="name" id="" placeholder="Nome do acompanhamento"/>
                        <input onChange={event => setPrice(event.target.value)} value={price || ''} className="inputs" type="text" name="price" id="" placeholder="Valor do acompanhamento"/>
                        <textarea onChange={event => setIngredients(event.target.value)} value={ingredients || ''} className="inputs" type="text" name="ingredients" id="" placeholder="Digite as informações do acompanhamento"/>
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

export default SideDish