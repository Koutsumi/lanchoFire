import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, collection, doc, deleteDoc, serverTimestamp, updateDoc, QuerySnapshot, addDoc} from "firebase/firestore"
import  db  from '../../services/firebase'

function Lanche() {

    const { id } = useParams()
    const ref_burguers = doc(db, 'lanches', id)

    async function getLancheByID(){
        try {

            const list_burguers = await getDoc(ref_burguers)
            console.log(list_burguers.data())

        } catch(err) {
            console.log("Deu ruim")
        }

    }

    useEffect(() => {

        getLancheByID()


    }, [])

    return(

        <section>

        </section>
    )

}

export default Lanche