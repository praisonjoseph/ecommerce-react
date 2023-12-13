import { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useCart } from '../contexts/CartContext'
import styles from './Cart.module.css'
const Cart = () => {
  const {
    cartProducts,
    IncreaseQty,
    DecreaseQty,
    DeleteFromCart,

  } = useCart()
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cartProducts.reduce((acc, curr) => acc + Number(curr.newPrice) * curr.quantity, 0)
    );
  }, [cartProducts]);

  return (
    <div className={styles.home}>
      <div className={styles.productContainer}>
        <ListGroup>
          {cartProducts.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.img} alt={prod.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>₹ {prod.newPrice}</Col>
                <Col md={2}>
                  <Button
                  size="sm"
                    variant="light"
                    onClick={(e) => {
                      DecreaseQty(prod.id);
                    }}
                  >
                    -
                  </Button>
                    <b>{prod.quantity}</b>
                  <Button
                  size="sm"
                    variant="light"
                    onClick={(e) => {
                      IncreaseQty(prod.id);
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
                      console.log("test")
                      DeleteFromCart(prod.id)
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
      </div>
      <div className={`${styles.filters} ${styles.summary}`}>
        <span className={styles.title}>Subtotal ({cartProducts.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
        <Button type="button" disabled={cartProducts.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;