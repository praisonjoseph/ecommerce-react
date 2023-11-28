import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, orderBy, query,onSnapshot, } from 'firebase/firestore'
import { toast } from 'react-toastify'

function useProducts() {
    const [products, setProducts] = useState([])
    const [IsLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getCollection = () => {
            setIsLoading(true);
            try {
                const docRef = collection(db, "products");
                // const q = query(docRef, orderBy("createdAt", "desc"));
                const q = query(docRef)
                onSnapshot(q, (snapshot) => {
                    const allData = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setProducts(allData);
                    setIsLoading(false);
                });
            } catch (error) {
                setIsLoading(false);
                toast.error(error.message);
            }

        }
        return getCollection()

    }, [])

    return {IsLoading, products}
}

export default useProducts