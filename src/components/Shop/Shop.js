import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { addToDb} from '../../utilities/fakedb'
import Cart from '../Cart/Cart';
import Product from '../Product/Product';

import './Shop.css';
const Shop = () => {
    const [products, setProducts] = useState([]);
    // const [cart,setCart] = useState([]);
    const [cart, setCart] = useCart()
    //for pagination
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        fetch(`http://localhost:4000/product?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => setProducts(data));

    }, [page,size]);

    useEffect(() => {
        fetch('http://localhost:4000/productCount')
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const pages = Math.ceil(count / 10);
                setPageCount(pages);
            })
    }, []);



    //
    // useEffect(() =>{
    // console.log('local Storage first li ne')
    //     const storedCart = getStoredCart();
    //     const savedCard = [];
    //     for(const id in storedCart){
    //         const addedProduct = products.find(product => product._id === id);
    //         if(addedProduct){
    //             const quantity = storedCart[id];
    //             addedProduct.quantity = quantity;
    //             savedCard.push(addedProduct);
    //         }
    //     }
    //     setCart(savedCard)
    // },[products])
    //

    const handleAddToClick = (selectedProduct) => {
        console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct]

        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists]
        }

        setCart(newCart);
        addToDb(selectedProduct._id)
    }
    return (
        <>
            <div className='shop-container'>
                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToClick={handleAddToClick}
                        ></Product>)
                    }
                </div>

                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to='/order'>
                            <button>Review Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>

            <div className='pagination'>
                {
                    [...Array(pageCount).keys()].map((number => <button
                        className={page === number ? 'selected' : ''}
                        onClick={() => setPage(number)}
                    >{number + 1}</button>))
                }
                <select onChange={e => setSize(e.target.value)} >
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                </select>
            </div>
        </>
    );
};

export default Shop; 