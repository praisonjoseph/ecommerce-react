import { useAuth } from '../contexts/AuthContext'
import { Col, Container, Row } from 'react-bootstrap'
import ProductFilter from '../components/ProductFilter'
import ProductList from '../components/ProductList'

function Home({searchTerm}) {
  const { user } = useAuth()

  return (
    <Container className='d-flex flex-column mt-3'>
      <Row>
        <Col xs={12} md={3}>
          <ProductFilter />
        </Col>
        <Col xs={12} md={9}>
          <ProductList searchTerm={searchTerm} />
        </Col>
      </Row>
    </Container>

  )
}

export default Home