import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import ItemList from 'c:/Users/ana_j/Desktop/YellowTruck/src/components/ItemList.jsx';

const ItemListContainer = () => {

  const [productos, setProductos] = useState([]);
  const categoria= useParams().categoria;

  useEffect(() => {
    const db =getFirestore()

    const itemsCollection = collection(db, "Productos")
    const q = categoria ? query(itemsCollection, where("categoria", "==", categoria)) : itemsCollection
    getDocs(q).then((snapshot) => {
      const docs = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      setProductos(docs)
    })
   
  },[categoria])

  

  return (
    <ItemList 
      productos={productos}
      key={productos.id}
    />
  )
}

export default ItemListContainer;

  