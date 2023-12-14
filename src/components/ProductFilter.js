import React, { useState } from 'react'
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
    const [price, setPrice] = useState(300)
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

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
    const handleClearFilter = () => {
        // Reset all dropdowns to their default values
        setPrice(300);
        setSelectedCompany('');
        setSelectedCategory('');
        setSelectedColor('');
        // Call ClearFilter with the original product list
        ClearFilter(products);
    };

    return (
        <Card
            className='d-flex flex-column my-3'
            style={{ position: 'sticky', top: 40 }}
        >
            <Card.Body>
                <Card.Title>Filter</Card.Title>
                <Card.Text>
                    <Form.Label>Price: {`$${price}`}</Form.Label>
                    <Form.Range
                        min={50}
                        max={300}
                        step={5}
                        value={price}
                        onChange={
                            (event) => {
                                setPrice(event.target.value);
                                FilterByPrice(products, event.target.value);
                            }
                        }
                    />
                    <br />
                    <Form.Select aria-label="Default select example"
                        onChange={(event) => {
                            setSelectedCompany(event.target.value);
                            FilterByCompany(products, event.target.value);
                        }
                        }
                        value={selectedCompany}
                    >
                        <option disabled hidden value=''>Company</option>
                        {allCompanies.map((company, index) => (
                            <option key={index} value={company}>{company.toUpperCase()}</option>
                        ))}
                    </Form.Select>
                    <Form.Select aria-label="Default select example"
                        onChange={(event) => {
                            setSelectedCategory(event.target.value);
                            FilterByCategory(products, event.target.value);
                        }
                        }
                        value={selectedCategory}
                    >
                        <option disabled hidden value=''>Category</option>
                        {allCategories.map((category, index) => (
                            <option key={index} value={category}>{category.toUpperCase()}</option>
                        ))}
                    </Form.Select>
                    <Form.Select aria-label="Default select example"
                        onChange={(event) => {
                            setSelectedColor(event.target.value);
                            FilterByColor(products, event.target.value);
                        }
                        }
                        value={selectedColor}
                    >
                        <option disabled hidden value=''>Color</option>
                        {allColors.map((color, index) => (
                            <option key={index} value={color}>{color.toUpperCase()}</option>
                        ))}
                    </Form.Select>
                </Card.Text>
                <Button variant="dark"
                    onClick={handleClearFilter}
                >
                    Clear Filter
                </Button>
            </Card.Body>
        </Card>
    )
}

export default ProductFilter