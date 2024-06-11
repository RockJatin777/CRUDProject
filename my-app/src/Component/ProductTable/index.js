import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Popup from 'reactjs-popup'

import './index.css'

const ProductTable = props => {
    const {productDetails, onDelete, onEditProductDetail} = props

    const [name, setName] = useState(productDetails.name)
    const [category, setCategory] = useState(productDetails.category)
    const [price, setPrice] = useState(productDetails.price)

    const onChangeName = event => {
        setName(event.target.value)
    }

    const onChangeCategory = event => {
        setCategory(event.target.value)
    }

    const onChangePrice = event => {
        setPrice(event.target.value)
    }

    const onClickDelete = () => {
        onDelete(productDetails.id)
    }

    const onClickEdit = () => {
        const details = {id: productDetails.id, name, category, price}
        onEditProductDetail(details)
    }


    return(
        <tbody className="legend">
            <td>{productDetails.name}</td>
            <td>{productDetails.category}</td>
            <td>{productDetails.price}</td>
            <Popup 
            modal
            trigger={
                <td><button type="button">Edit</button></td>
            }
            >
                {close => (
                    <div className='popup-container'>
                        <p className='popup-heading'>Edit Product Details</p>
                        <p>Name:</p>
                        <input type='text' value={name} placeholder='Type here'className='user-input' onChange={onChangeName}/>
                        <p>Category</p>
                        <input type='text' value={category} placeholder='Type here'className='user-input' onChange={onChangeCategory}/>
                        <p>Price</p>
                        <input type='text' value={price} placeholder='Type here'className='user-input' onChange={onChangePrice}/>
                        <div className='btn-container'>
                            <button
                                type="button"
                                className="trigger-button"
                                onClick={() => close()}
                                >
                                Cancel
                            </button>
                            <button type='button' className='create-button' onClick={onClickEdit}>Edit</button>
                        </div>
                    </div>
                )}
            </Popup>
            <td>
                <button type="button" onClick={onClickDelete}>
                    <RiDeleteBin6Line />
                </button>
            </td>
        </tbody>
    )
}

export default ProductTable