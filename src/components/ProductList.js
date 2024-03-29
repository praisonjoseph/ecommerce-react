import React, { useEffect } from 'react'
import Product from './Product'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import {
  filterBySearch,
  filterSelector,
} from '../redux/reducers/filterReducer'
import { useDispatch, useSelector } from 'react-redux'
import { productSelector } from '../redux/reducers/productReducer'

function ProductList() {
  const { isLoading, products } = useSelector(productSelector)
  const dispatch = useDispatch()
  const {filteredProducts, searchTerm} = useSelector(filterSelector)

  useEffect(() => {
    //dispatch the search value to get the filteredProducts
    dispatch(filterBySearch({products, searchTerm}))
  }, [products, searchTerm])

  return (
    <>
      {isLoading ? (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          </Container>
      ) :
        (<Row>
          {filteredProducts.map((product, index) => (
            // <Col key={index} style={{ border: "1px red solid" }} xs={12} sm={6} md={4} lg={3}>
            <Col key={index} xs={12} sm={6} md={6} lg={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>)}
    </>
  )
}

export default ProductList