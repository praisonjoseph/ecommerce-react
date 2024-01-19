import React, { useCallback } from 'react'
import { Button, Card } from 'react-bootstrap'
import {
    addProductToCart,
    cartSelector,
    increaseQuantity,
} from "../redux/reducers/cartReducer";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


function Product({ product }) {
    const dispatch = useDispatch()
    const { cartProducts } = useSelector(cartSelector);

    const AddToCartHandler = () => {
        try {
            const existingProduct = cartProducts.find((p) => p.id === product.id);
            if (existingProduct) {
                // If product is already in the cart, increase its quantity
                dispatch(increaseQuantity(product.id));
                toast.success(`Updated Quantity of ${product.title}`)
            } else {
                // If product is not in the cart, add it
                dispatch(addProductToCart({
                    id: product.id,
                    img: product.img,
                    name: product.title,
                    newPrice: product.newPrice,
                }))
                toast.success(`Added ${product.title} to Cart`)
            }
        } catch (error) {
            console.error(`Failed to add/update ${product.title}`)
            toast.error(`Failed to add/update ${product.title}`)
        }
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