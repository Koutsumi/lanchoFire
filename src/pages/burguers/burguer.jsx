import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { onSnapshot, collection, doc, deleteDoc, serverTimestamp, updateDoc, QuerySnapshot, addDoc} from "firebase/firestore"
import { useEffect, useState } from "react"
import  db  from '../../services/firebase'

function Burguer(){

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

      const [burguers, setBurguers] = useState([{}])
  
      const ref_burguers = collection(db, 'lanches')

      useEffect(() => {

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

    const [name, setName] = useState()
    const [ingredients, setIngredients] = useState()
    const [price, setPrice] = useState()
    const [burguer_id, setBuerger_Id] = useState()

    function resetInfos(){
        setName('')
        setIngredients('')
        setPrice('')
    }

    async function newBurguer(event){
        event.preventDefault()
        const docRef = await addDoc(collection(db, 'lanches'),{
            name ,
            ingredients ,
            price ,
            createdAt : serverTimestamp(),
            updatedAt:  serverTimestamp()
        });

        //console.log("Id do documento gerado " + docRef.id )

        setName('')
        setIngredients('')
        setPrice('')
        setIsNavAddExpanded(false)
    }

    function editBuguerInfo(burguer){
        setBuerger_Id(burguer.id)
        setName(burguer.name)
        setIngredients(burguer.ingredients)
        setPrice(burguer.price)
    }

    async function updateBurguer(event){
        event.preventDefault()
        const buguer_ref = doc(ref_burguers, burguer_id)
        const updateCliente =  await updateDoc(buguer_ref, {
            name,
            price,
            ingredients,
            updatedAt: serverTimestamp()
        })
        setIsNavEditExpanded(false)
    }
    
    async function deleteBurguer(burguer){

        try{
            const burguer_ref = doc(ref_burguers, burguer.id)
            await deleteDoc(burguer_ref)

        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <section className='mySection bg-[#090E34]'>

            <div className='row my-7'>
                <h1 className='text-white text-[1.5rem]'>Meus lanches cadastrados</h1>
                <button onClick={() => {setIsNavAddExpanded(!isNavAddExpanded); resetInfos()}} className='btn-primary'>Novo lanche</button>
            </div>

            <div className='start w-[100%]'>

                {
                    burguers.map(burguer => {
                        return(
                        <div key={burguer.id} className="row bg-yellow-400 p-4 m-4 rounded-lg text-[#1D2144]">
                            <div>
                                <h1 className='font-bold'>{burguer.name}</h1>
                                <p>{burguer.ingredients}</p>
                                <p>
                                    <button onClick={() => {setIsNavEditExpanded(!isNavEditExpanded); editBuguerInfo(burguer)}} className='btn-edit'>Editar</button> 
                                    <button onClick={() => deleteBurguer(burguer)} className='btn-remove'>Excluir</button>
                                </p>
                            </div>
                            <p>R${burguer.price}</p>
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
                    <h2>Novo Lanche</h2>
                    <form onSubmit={newBurguer} action="" className='col'>
                        <input onChange={event => setName(event.target.value)} value={name || ''} className="inputs" type="text" name="name" id="" placeholder="Digite o nome do lanche"/>
                        <input onChange={event => setPrice(event.target.value)} value={price || ''} className="inputs" type="text" name="price" id="" placeholder="Digite o valor do lanche"/>
                        <textarea onChange={event => setIngredients(event.target.value)} value={ingredients || ''} className="inputs" type="text" name="ingredients" id="" placeholder="Digite os igredientes do lanche"/>
                        <div className='row'>
                        <div onClick={() => {setIsNavAddExpanded(!isNavAddExpanded)}} className='btn-remove cursor-pointer'>Cancelar</div>
                        <button type="submit" className='btn-edit'>Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className={isNavEditExpanded ? 'mySection w-[320px] min-h-[350px] bg-[#090e34] fixed rounded-lg text-white' : 'hidden'}>
                <div className='col'>
                    <h2>Editar Lanche</h2>
                    <form onSubmit={updateBurguer} action="" className='col'>
                        <input onChange={event => setName(event.target.value)} value={name || ''} className="inputs" type="text" name="name" id="" placeholder="Digite o nome do lanche"/>
                        <input onChange={event => setPrice(event.target.value)} value={price || ''} className="inputs" type="text" name="price" id="" placeholder="Digite o valor do lanche"/>
                        <textarea onChange={event => setIngredients(event.target.value)} value={ingredients || ''} className="inputs" type="text" name="ingredients" id="" placeholder="Digite os igredientes do lanche"/>
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

export default Burguer