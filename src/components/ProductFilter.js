import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useFilter } from '../contexts/filterContext'
import useProducts from '../hooks/useProducts'

function ProductFilter({ product }) {
    const { products, isLoading } = useProducts()
    const {
        filteredProducts,
        FilterByPrice,
        FilterByCategory,
        FilterByCompany,
        FilterByColor,
    } = useFilter()
    const [price, SetPrice] = useState(1)
    const [category, SetCategory] = useState("")
    const [company, SetCompany] = useState("")
    const [color, SetColor] = useState("")

    useEffect(() => {
        FilterByPrice(products, price)
        console.log(filteredProducts)
    }, [products, price])

    useEffect(() => {
        FilterByCategory(products, category)
        console.log(filteredProducts)
    }, [products, category])

    useEffect(() => {
        FilterByCompany(products, company)
        console.log(filteredProducts)
    }, [products, company])

    useEffect(() => {
        FilterByColor(products, color)
        console.log(filteredProducts)
    }, [products, color])


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