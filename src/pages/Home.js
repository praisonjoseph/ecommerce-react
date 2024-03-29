import { Col, Container, Row } from 'react-bootstrap'
import ProductFilter from '../components/ProductFilter'
import ProductList from '../components/ProductList'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchProductsAsync } from '../redux/reducers/productReducer';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    //On mount load the products from database
    dispatch(fetchProductsAsync());
  }, [dispatch])

  return (
    <Container className='d-flex flex-column mt-3'>
      <Row>
        <Col xs={12} md={3}>
          <ProductFilter />
        </Col>
        <Col xs={12} md={9}>
          <ProductList />
        </Col>
      </Row>
    </Container>

  )
}

export default Home