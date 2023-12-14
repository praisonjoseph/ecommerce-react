import React, { useCallback } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useCart } from '../contexts/CartContext'

function Product({product}) {
    const {AddToCart} = useCart()

    const AddToCartHandler = useCallback(() => {
        AddToCart({
            id: product.id,
            img: product.img,
            name: product.title,
            newPrice: product.newPrice,
        })
    },[AddToCart, product])

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
                <Button variant="primary" onClick={AddToCartHandler}>Add to Cart</Button>
            </Card.Body>
        </Card>
    )
}

export default Product