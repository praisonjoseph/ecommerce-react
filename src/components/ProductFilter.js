import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useFilter } from '../contexts/filterContext'
import useProducts from '../hooks/useProducts'

function ProductFilter() {
    const { products, isLoading } = useProducts()
    const {
        FilterByPrice,
        FilterByCategory,
        FilterByCompany,
        FilterByColor,
        ClearFilter
    } = useFilter()
    const [price, SetPrice] = useState(1)

    const allCategories = [
        "All",
        ...new Set(products.map((product) => product.category)),
    ];

    const allCompanies = [
        "All",
        ...new Set(products.map((product) => product.company)),
    ];
    const allColors = [
        "All",
        ...new Set(products.map((product) => product.color)),
    ];

    return (
        <Card
            className='d-flex flex-column my-3'
            style={{ position: 'sticky', top: 40 }}
        >
            <Card.Body>
                <Card.Title>Filter</Card.Title>
                <Card.Text>
                    <Form.Label>Price: {price}</Form.Label>
                    <Form.Range
                        onChange={
                            (event) => {
                                SetPrice(event.target.value);
                                FilterByPrice(products, event.target.value);
                            }
                        }
                    />
                    <br />
                    <Form.Select aria-label="Default select example"
                        onChange={(event) => { FilterByCompany(products, event.target.value); }
                        }
                    >
                        <option>Company</option>
                        {allCompanies.map((company, index) => (
                            <option key={index} value={company}>{company.toUpperCase()}</option>
                        ))}
                      </Form.Select>
                    <Form.Select aria-label="Default select example"
                        onChange={(event) => { FilterByCategory(products, event.target.value); }
                        }
                    >
                        <option>Category</option>
                        {allCategories.map((category, index) => (
                            <option key={index} value={category}>{category.toUpperCase()}</option>
                        ))}
                    </Form.Select>
                    <Form.Select aria-label="Default select example"
                        onChange={(event) => { FilterByColor(products, event.target.value); }
                        }
                    >
                        <option>Color</option>
                        {allColors.map((color, index) => (
                            <option key={index} value={color}>{color.toUpperCase()}</option>
                        ))}
                    </Form.Select>
                </Card.Text>
                <Button variant="primary"
                    onClick={() => { ClearFilter(products) }}
                >
                    Clear Filter
                </Button>
            </Card.Body>
        </Card>
    )
}

export default ProductFilter