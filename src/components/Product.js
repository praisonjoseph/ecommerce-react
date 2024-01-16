import React, { useCallback } from 'react'
import { Button, Card } from 'react-bootstrap'
// import { useCart } from '../contexts/CartContext'
import { 
    addProductToCart,
   } from "../reducers/cartReducer";
import { useDispatch } from 'react-redux';

function Product({product}) {
    // const {AddToCart} = useCart()
    const dispatch = useDispatch()

    const AddToCartHandler = () => {
        dispatch(addProductToCart({
            id: product.id,
            img: product.img,
            name: product.title,
            newPrice: product.newPrice,
        }))
        
    }

    return (
        <Card className='d-flex flex-column shadow mb-5 bg-white rounded'>
            <Card.Img 
            style={{ objectFit: 'contain' }} 
            variant="top"
            width="100"
            height="150"
            src={product.img} 
            />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Card.Text className="d-flex justify-content-between align-items-center">
                    <strong>{`$${product.newPrice}`}</strong>
                    <Button variant="dark" onClick={AddToCartHandler}>Add</Button>
                </Card.Text>
                
            </Card.Body>
        </Card>
    )
}

export default Product