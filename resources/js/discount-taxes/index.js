import React, { useState } from 'react';
import './style.scss';

import edit from "../../images/edit.png"
import cross from "../../images/cross.png"

import { Select } from 'antd';
const { Option } = Select;

const DiscountTaxes = () => {
    const [discountName, setDiscountName] = useState('')
    const [discountTax, setDiscountTax] = useState('')
    const [discountArray, setDiscountArray] = useState([])

    const [taxName, setTaxName] = useState('')
    const [taxState, setTaxState] = useState('')
    const [taxValue, setTaxValue] = useState('')
    const [taxArray, setTaxArray] = useState([])

    const [shippingName, setShippingName] = useState('')
    const [shippingState, setShippingState] = useState(0)
    const [shippingArray, setShippingArray] = useState([])

    const [editId, setEditId] = useState("")



    const handleClick = (value) => {
        setDiscountTax(value);
        console.log(discountTax);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            const selectedValue = [...discountArray].find(obj => editId === obj.id);
            selectedValue.discountName = discountName;
            selectedValue.discountTax = discountTax
            const editIndex = [...discountArray].indexOf(obj => editId === obj.id);
            [...discountArray].splice(editIndex, 1, selectedValue);
            setDiscountArray([...discountArray])
            setEditId("")
            setDiscountName("")
            setDiscountTax("")

        } else {
            setDiscountArray([...discountArray, { id: Math.random(), discountName: discountName, discountTax: discountTax }])
        }
    }

    const handlUpdate = (value) => {
        const selectedValue = [...discountArray].find(discountObj => value.id === discountObj.id)
        setDiscountName(selectedValue.discountName)
        setDiscountTax(selectedValue.discountTax)
        setEditId(value.id)
    }

    const handleDelete = (id) => {
        setDiscountArray([...discountArray].filter((discountobj) => {
            return discountobj.id !== id
        }))
    }

    const handleTaxClick = (value) => {
        setTaxState(value);
    }


    const handleTaxSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            const selectedValueTax = [...taxArray].find(obj => editId === obj.id);
            selectedValueTax.taxName = taxName;
            selectedValueTax.taxState = taxState
            selectedValueTax.taxValue = taxValue
            console.log(selectedValueTax);
            const editIndex = [...taxArray].indexOf(obj => editId === obj.id);
            [...taxArray].splice(editIndex, 1, selectedValueTax);
            setTaxArray([...taxArray])
            setEditId("")
            setTaxName("")
            setTaxState("")
            setTaxValue("")

        } else {
            setTaxArray([...taxArray, { id: Math.random(), taxName: taxName, taxState: taxState, taxValue: taxValue }])
        }
    }


    const handlUpdateTax = (value) => {
        const selectedValueTax = [...taxArray].find(taxObj => value.id === taxObj.id)
        setTaxName(selectedValueTax.taxName)
        setTaxState(selectedValueTax.taxState)
        setTaxValue(selectedValueTax.taxValue)
        setEditId(value.id)
    }

    const handleDeleteTax = (id) => {
        setTaxArray([...taxArray].filter((taxObj) => {
            return taxObj.id !== id
        }))
    }

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setShippingArray([...shippingArray, { id: Math.random(), shippingName: shippingName, shippingState: shippingState }])
    }


    return (
        <div className='discount-container'>
            <p className='main'>{`Discounts & Taxes`}</p>
            <div className='discount-container_first'>
                <p className='heading'>Discounts</p>
                <div >
                    <form className='discount-container_first-form' onSubmit={handleSubmit}>
                        <div className='discount-container_first-form_section'>
                            <p>Discount Name</p>
                            <input placeholder='Discount Name' value={discountName} onChange={(e) => { setDiscountName(e.target.value) }} />
                        </div>
                        <div>
                            <p>Discount Value</p>
                            <Select
                                defaultValue="lucy"
                                style={{
                                    width: 120,
                                }}
                                onChange={handleClick}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled">Disabled</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        </div>
                        <div><button className='save-button' type='submit' >Save</button></div>
                    </form>
                </div>
                <div className='discount-output'>
                    <table>
                        {
                            discountArray?.length > 0 &&
                            <tr className='discount-output_head'>
                                <th>Discount Name</th>
                                <th>Discount Value</th>
                                <th></th>
                            </tr>
                        }
                        {
                            discountArray?.map((obj) => {
                                return (
                                    <tr className='discount-output_body'>

                                        <td>{obj.discountName}</td>
                                        <td>{obj.discountTax}</td>
                                        <td><img style={{ width: '18px', height: '18px', marginRight: '30px' }} src={edit} onClick={() => { handlUpdate(obj) }} />
                                            <img style={{ width: '16px', height: '16px' }} src={cross} onClick={() => { handleDelete(obj.id) }} /></td>
                                    </tr>
                                )
                            })
                        }

                    </table>
                </div>
            </div>
            <div className='discount-container_first'>
                <p className='heading'>Taxes</p>
                <div className='sections'>
                    <form className='discount-container_second-form' onSubmit={handleTaxSubmit}>
                        <div>
                            <div className='discount-container_second-form_section'>
                                <p>Tax Value</p>
                                <input placeholder='Colorado Custom' value={taxValue} onChange={(e) => { setTaxValue(e.target.value) }} />
                            </div>
                        </div>
                        <div className='second-section'>
                            <div className='discount-container_second-form_section'>
                                <p>Tax Name</p>
                                <input placeholder='Colorado Custom' value={taxName} onChange={(e) => { setTaxName(e.target.value) }} />
                            </div>
                            <div>


                                <p>State</p>
                                <Select
                                    defaultValue="lucy"
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={handleTaxClick}
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="disabled">Disabled</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </div>
                            <div><button className='save-button' type='submit' >Save</button></div>
                        </div>
                    </form>
                </div>
                <div className='discount-output'>
                    <table>
                        {
                            taxArray?.length > 0 &&
                            <tr className='discount-output_head'>
                                <th>Tax Name</th>
                                <th>State</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                        }
                        {
                            taxArray?.map((obj) => {
                                return (
                                    <tr className='discount-output_body'>

                                        <td>{obj.taxName}</td>
                                        <td>{obj.taxState}</td>
                                        <td>{obj.taxValue}</td>
                                        <td><img style={{ width: '18px', height: '18px', marginRight: '30px' }} src={edit} onClick={() => { handlUpdateTax(obj) }} />
                                            <img style={{ width: '16px', height: '16px' }} src={cross} onClick={() => { handleDeleteTax(obj.id) }} /></td>
                                    </tr>
                                )
                            })
                        }

                    </table>
                </div>
            </div>
            <div className='discount-container_first'>
                <p className='heading'>Shipping</p>
                <div>
                    <form className='discount-container_first-form' onSubmit={handleShippingSubmit}>
                        <div className='discount-container_first-form_section'>
                            <p>Amount</p>
                            <input placeholder='Enter Text' value={shippingName} onChange={(e) => { setShippingName(e.target.value) }} />
                        </div>
                        <div className='discount-container_first-form_section'>
                            <p>Add Shipping Amount</p>
                            <input placeholder='Enter Amount' value={shippingState} onChange={(e) => { setShippingState(e.target.value) }} />
                        </div>
                        <div><button className='save-button' type='submit' >Save</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default DiscountTaxes