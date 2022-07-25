import { useEffect, useState } from "react"
import { getStoredCart } from "../utilities/fakedb";

const useCart = () => {
    const [cart,setCart] = useState([]);

    useEffect( () =>{
        const storedCart = getStoredCart();
        const savedCard = [];
        const keys = Object.keys(storedCart);
        fetch('http://localhost:4000/productByKeys',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
        .then(res => res.json())
        .then(products => {
            for(const id in storedCart){
            const addedProduct = products.find(product => product._id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCard.push(addedProduct);
            }
        }
        setCart(savedCard);
        })
        
    },[]);
    return [cart,setCart];

};

export default useCart;