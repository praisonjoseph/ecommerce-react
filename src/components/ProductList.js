import React, { useEffect } from 'react'
import Product from './Product'
import { Col, Row } from 'react-bootstrap'
import useProducts from '../hooks/useProducts'
import { useFilter } from '../contexts/filterContext'

function ProductList() {
  const { products} = useProducts()
  const { 
    filteredProducts,
    searchTerm, 
    FilterBySearch, 
  } = useFilter()

  useEffect(() => {
    FilterBySearch(products, searchTerm)
  },[products, searchTerm])


  return (
    <Row>
    {filteredProducts.map((product, index) => (
      // <Col key={index} style={{ border: "1px red solid" }} xs={12} sm={6} md={4} lg={3}>
      <Col key={index} xs={12} sm={6} md={6} lg={4}>
        <Product product={product} />
      </Col>
    ))}
  </Row>
  )
}

export default ProductList