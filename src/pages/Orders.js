import React, { useEffect } from 'react'
import { Container, Card, ListGroup, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersAsync, orderSelector } from '../redux/reducers/orderReducer';
import { authSelector } from '../redux/reducers/authReducer';

function Orders() {

  const { orders, isLoading } = useSelector(orderSelector)
  const { user, loading } = useSelector(authSelector);
  const dispatch = useDispatch()

  useEffect(() => {
    // Once user object is present, mount the orders by filtering based on user from database
    if (!loading && user) {
      dispatch(fetchOrdersAsync())
    }
  }, [dispatch])

  return (
    <Container className="mt-3">
      <h2>Your Orders</h2>
      {isLoading ? (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      ) : (
        <>
          {orders.map((order, index) => (
            <Card key={index} className="mb-3">
              <Card.Header>
                <strong>Order ID: {order.id}</strong>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Order Date:</strong> {order.orderDate}
                  <br />
                  <strong>Order Time:</strong> {order.orderTime}
                  <br />
                  <strong>Order Amount:</strong> ₹{order.orderAmount}
                </Card.Text>
                <ListGroup>
                  <ListGroup.Item>
                    <strong>Products:</strong>
                    <ul>
                      {order.cartProducts.map((product, prodIndex) => (
                        <li key={prodIndex}>
                          {product.name} - ${product.newPrice} - Quantity: {product.quantity}
                        </li>
                      ))}
                    </ul>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </Container>
  );

}

export default Orders