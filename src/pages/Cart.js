import React, { useEffect } from "react";
import { Button, Col, Image, ListGroup, Row, Stack } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
// import { useCart } from '../contexts/CartContext'
import styles from './Cart.module.css'
import { Link, useNavigate } from "react-router-dom";
// import { useOrders } from "../contexts/OrderContext";
import { useAuth } from "../contexts/AuthContext";
import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { 
  removeProductFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
 } from "../reducers/cartReducer";
import { cartSelector } from "../reducers/cartReducer";
import { useSelector, useDispatch } from 'react-redux';
import { addOrder } from "../reducers/orderReducer";

const Cart = () => {
  // const {
  //   cartProducts,
  //   totalPrice,
  //   IncreaseQty,
  //   DecreaseQty,
  //   DeleteFromCart,
  //   SetTotal,
  //   ClearCart,
  // } = useCart()
  const {cartProducts, totalPrice} = useSelector(cartSelector)
  const dispatch = useDispatch()
  // const { 
  //   addOrder 
  // } = useOrders();

  const {user} = useAuth()
  const navigate = useNavigate();

  // useEffect(() => {
  //   SetTotal()
  // }, [cartProducts, SetTotal]);

  const handlePurchase = async() => {
    // Assuming cartProducts contain details for the order
    if (!user) {
      navigate("/login")
      return
    }
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();

    const orderDetails = {
      // Extract details from cartProducts
      userID: user.uid,
      userEmail: user.email,
      orderDate: date,
      orderTime: time,
      orderAmount: totalPrice,
      cartProducts,
      createdAt: Timestamp.now().toDate()
    };
    // // Add order to the order context
    // await addOrder(orderDetails);
    dispatch(addOrder(orderDetails))
    // ClearCart();
    dispatch(clearCart())
    navigate("/orders")
  };

  return (
    <>
      {cartProducts.length === 0 ? (
        <Stack gap={2} className="col-sm-5 mx-auto">
          <br />
          <h2>Your cart is empty!</h2>
          <br />
          <Button variant="dark" as={Link} to="/">Continue shopping</Button>
        </Stack>
      ) : (
        <div className={styles.home}>
          <div className={styles.productContainer}>
            <h2>Shopping Cart</h2>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col md={2}>
                  </Col>
                  <Col md={2}>
                    <strong>Title</strong>
                  </Col>
                  <Col md={2}>
                    <strong>Price</strong>
                  </Col>
                  <Col md={2}>
                    <strong>Quantity</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {cartProducts.map((prod) => (
                <ListGroup.Item key={prod.id}>
                  <Row className="">
                    <Col md={2}>
                      <Image src={prod.img} alt={prod.name} fluid rounded />
                    </Col>
                    <Col md={2}>
                      <span>{prod.name}</span>
                    </Col>
                    <Col md={2}>${prod.newPrice}</Col>
                    <Col md={2}>
                      <Button
                        size="sm"
                        variant="light"
                        onClick={(e) => {
                          dispatch(decreaseQuantity(prod.id));
                        }}
                      >
                        -
                      </Button>
                      <b>{prod.quantity}</b>
                      <Button
                        size="sm"
                        variant="light"
                        onClick={(e) => {
                          dispatch(increaseQuantity(prod.id));
                        }}
                      >
                        +
                      </Button>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => {
                          dispatch(removeProductFromCart(prod.id))
                        }
                        }
                      >
                        <AiFillDelete fontSize="20px" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Button variant="dark" style={{ height: '40px' }} onClick={() => dispatch(clearCart())}>Clear Cart</Button>
          </div>
          <div className={`${styles.filters} ${styles.summary}`}>
            <span className={styles.title}>Subtotal ({cartProducts.length}) items</span>
            <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ${totalPrice}</span>
            <Button variant="light" onClick={() => handlePurchase()}>Purchase</Button>
            <Button variant="light" className="mt-2" as={Link} to="/">Continue shopping</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;