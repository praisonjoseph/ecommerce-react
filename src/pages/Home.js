import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import useProducts from '../hooks/useProducts'
import { Col, Container, Row } from 'react-bootstrap'
import Product from '../components/Product'
import ProductFilter from '../components/ProductFilter'

function Home() {
  const { user } = useAuth()
  const { products, isLoading } = useProducts()
  console.log(products)
  return (
    <Container className='d-flex flex-column mt-3'>
      <Row>
        <Col xs={12} md={3}>
          <ProductFilter />
        </Col>
        <Col xs={12} md={9}>
          <Row>
            {products.map((product, index) => (
              // <Col key={index} style={{ border: "1px red solid" }} xs={12} sm={6} md={4} lg={3}>
              <Col key={index} xs={12} sm={6} md={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>

  )
}

export default Home