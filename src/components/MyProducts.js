import React, { useEffect, useState } from 'react'
import { getDocs, collection, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

function MyProducts() {
    const productData = collection(db, 'products')
    const [newproduct, setNewProduct] = useState([])
    const [editmode, setEditmode] = useState(false)
    const [titleStore, setTitlestore] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await getDocs(productData)
                setNewProduct(data.docs.map((doc) => ({
                    ...doc.data(), id: doc.id
                })))
            } catch (error) {
                console.error("Error fetching products: ", error)
            }
        }
        getProducts()
    }, [productData])

    const handleDelete = async (id) => {
        try {
            const docData = doc(db, 'products', id)
            await deleteDoc(docData)
            setNewProduct(newproduct.filter((data) => data.id !== id))
        } catch (error) {
            console.error("Error deleting product: ", error)
        }
    }

    const handleUpdate = (value) => {
        setEditmode(true)
        setTitlestore(value.title)
        setId(value.id)
    }

    const handleSave = async () => {
        try {
            const docData = doc(db, 'products', id)
            await updateDoc(docData, { title: titleStore })
            setNewProduct(newproduct.map((data) => 
                data.id === id ? { ...data, title: titleStore } : data
            ))
            setEditmode(false)
            setTitlestore('')
        } catch (error) {
            console.error("Error updating product: ", error)
        }
    }

    const handleInput = (e) => {
        setTitlestore(e.target.value)
    }

    return (
        <div>
            {editmode && 
            <div className='update-pro'>
                <br/>
                <h3>Update product: &nbsp;</h3>
                <input type="text" value={titleStore} onChange={handleInput} />&nbsp;
                <button onClick={handleSave}>Save</button>&nbsp;
                <button onClick={() => {
                    setEditmode(false)
                    setTitlestore('') // Clear input on cancel
                }}>Cancel</button>
            </div>}

            <br />
            <h1>My products</h1><br/>
            <div className='myProducts'>
            {newproduct?.map((value) => (
                <div key={value.id} className='myProduct'>
                    <h1>{value.title}</h1>
                    <button onClick={() => handleDelete(value.id)}>Delete</button>
                    <button onClick={() => handleUpdate(value)}>Update</button>
                </div>
            ))}
            </div>
        </div>
    )
}

export default MyProducts;