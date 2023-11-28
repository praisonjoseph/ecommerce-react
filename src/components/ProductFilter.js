import React from 'react'
import { Button, Card } from 'react-bootstrap'

function ProductFilter({ product }) {
    return (
        <Card
            className='d-flex flex-column my-3'
            style={{ position: 'sticky', top: 40 }}
        >
            <Card.Img
                style={{ objectFit: 'contain' }}
                variant="top"
                width="200"
                height="200"
                src="test"
            />
            <Card.Body>
                <Card.Title>Product Filter</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Clear Filter</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductFilter