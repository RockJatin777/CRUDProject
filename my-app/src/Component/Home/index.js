import { Component } from "react";
import { FaHome } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import {Link} from 'react-router-dom'
import ProductTable from "../ProductTable";
import Popup from "reactjs-popup";
import './index.css'

const itemList = [
{ id: 1, name: 'I phone 14', category: 'Electronics', price: 55000},
{ id: 2, name: 'I phone 14 pro max', category: 'Electronics', price: 140000},
{ id: 3, name: 'Samsung S20', category: 'Electronics', price: 120000},
{ id: 4, name: 'Vivo v30', category: 'Electronics', price: 50000},
{ id: 5, name: 'Oppo Reno 7', category: 'Electronics', price: 65000},
{ id: 6, name: 'Thar X50', category: 'Automobiles', price: 1200000 },
{ id: 7, name: 'TATA Harier 5', category: 'Automobiles', price: 1400000 },
{ id: 8, name: 'Kia knock 8', category: 'Automobiles', price: 1000000 },
{ id: 9, name: 'Scorpio S12', category: 'Automobiles', price: 2200000 },
{ id: 10, name: 'Story of My Life', category: 'Books', price: 1000 },
{ id: 11, name: 'Power of Unconscious Mind', category: 'Books', price: 2000 },
{ id: 12, name: 'Psychology of Money', category: 'Books', price: 15000 },
{ id: 13, name: 'The Human Nature', category: 'Books', price: 8000 },
];

class Home extends Component {
    state = {
        productLists: itemList,
        name: '',
        price: '',
        category: '',
        search: '',
        categoryOption: ''
    }

    sortingLowToHigh = () => {
        const newProductList = itemList.sort((a, b) => a.price - b.price)
        this.setState({productLists: newProductList})
    }

    sortingHighToLow = () => {
        const newProductList = itemList.sort((a, b) => b.price - a.price)
        this.setState({productLists: newProductList})
    }

    onSelectCategory = event => {
        this.setState({categoryOption: event.target.value})

        const newProductList = itemList.filter(each => each.category.includes(event.target.value))
        this.setState({productLists: newProductList})
    }

    onSearch = event => {
        if (event.key === "Enter"){
        const {search} = this.state
        const newProductList = itemList.filter(each => {
            return each.name.trim().toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())
        })
        this.setState({productLists: newProductList})
        } else {
            this.setState({productLists: itemList})
        }
    }

    onTakeSearchInput = event => {
        this.setState({search: event.target.value})
    }

    onAddName = event => {
        this.setState({name: event.target.value})
    }

    onAddCategory = event => {
        this.setState({category: event.target.value})
    }

    onAddPrice = event => {
        this.setState({price: event.target.value})
    }


    onAddNewProduct = () => {
        const{productLists, name, category, price} = this.state
        const id = productLists.length + 1
        const newProduct = {id, name, category, price}
        this.setState({productLists: [...itemList, newProduct]})
    }

    editProductDetails = details => {
        const {productLists} = this.state
        const newProductListDetails = productLists.filter(each => each.id !== details.id)
        this.setState({productLists: [...newProductListDetails, details]})
    }

    onDelete = id => {
        const {productLists} = this.state
        const newProductList = productLists.filter(each => each.id !== id)
        this.setState({productLists: newProductList})
    }

    render(){
        const {productLists, name, price, category, search, categoryOption} = this.state
        return(
            <>
            <nav className="navbar">
                <FaHome size={30} />
                <Link to="/login">
                    <button className="login-button">Logout</button>
                </Link>
            </nav>
            <div className="landing-page">
                <div className="header">
                    <h1 className="page-heading">Trending Products</h1>
                    <div className="search-container">
                        <input className="search-input" type="search" value={search} onChange={this.onTakeSearchInput} onKeyDown={this.onSearch} placeholder="Search Product" />
                        <IoSearch size={25} color="#306beb" />
                    </div>
                    <Popup 
                    modal
                    trigger={
                        <button type="button" className="add-item-button">
                            <FaCartPlus size={25} color="#306beb" />
                            Add New Product
                        </button>
                    }>
                    {close => (
                        <div className='popup-container'>
                            <p className='popup-heading'>Edit Product Details</p>
                            <p>Name:</p>
                            <input type='text' value={name} placeholder='Type here'className='user-input' onChange={this.onAddName}/>
                            <p>Category</p>
                            <input type='text' value={category} placeholder='Type here'className='user-input' onChange={this.onAddCategory}/>
                            <p>Price</p>
                            <input type='text' value={price} placeholder='Type here'className='user-input' onChange={this.onAddPrice}/>
                            <div className='btn-container'>
                                <button
                                    type="button"
                                    className="trigger-button"
                                    onClick={() => close()}
                                    >
                                    Cancel
                                </button>
                                <button type='button' className='create-button' onClick={this.onAddNewProduct}>Add</button>
                            </div>
                        </div>
                    )}
                    </Popup>
                    </div>
                    <div className="filter-and-table-container">
                        <div className="filter-conatiner"> 
                            <h1 className="filter-heading">Filters</h1>
                            <select className="category-drop-down" value={categoryOption} onChange={this.onSelectCategory}>
                                <option selected value="">Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Automobiles">Automobiles</option>
                                <option value="Books">Books</option>
                                </select>
                                <p className="filter-title">Sort By price</p>
                                <ul className="filter-list">
                                    <li className="list-of-filter" onClick={this.sortingHighToLow}>High-to-low</li>
                                    <li className="list-of-filter" onClick={this.sortingLowToHigh}>low-to-High</li>
                                </ul>
                            </div>
                            <table className="table">
                                <thead className="legend">
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </thead>
                                {productLists.map(each => (
                                    <ProductTable key={each.id} productDetails={each} onDelete={this.onDelete} onEditProductDetail={this.editProductDetails} />
                                ))}
                            </table>
                    </div>
                </div>
            </>
        )
    }
}

export default Home