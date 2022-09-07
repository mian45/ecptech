import React, { useState } from 'react';
import './style.scss';

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



    const handleClick = (value) => {
        setDiscountTax(value);
        console.log(discountTax);
    }

    const handleSubmit = (e) => {
        setDiscountArray([...discountArray, { id: Math.random(), discountName: discountName, discountTax: discountTax }])
        e.preventDefault();
    }

    const handleTaxClick = (value) => {
        setTaxState(value);
    }


    const handleTaxSubmit = (e) => {
        e.preventDefault();
        setTaxArray([...taxArray, { id: Math.random(), taxName: taxName, taxState: taxState, taxValue: taxValue }])
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
                                <Option value="disabled" disabled>
                                    Disabled
                                </Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        </div>
                        <div><button className='save-button' type='submit' >Save</button></div>
                    </form>
                </div>
                <div className='discount-output'>
                    {
                        discountArray?.length > 0 &&
                        <thead className='discount-output_head'>
                            <th>Discount Name</th>
                            <th>Discount Value</th>
                            <th></th>
                        </thead>
                    }
                    {
                        discountArray?.map((obj) => {
                            return (
                                <tbody className='discount-output_body'>
                                    <td>{obj.discountName}</td>
                                    <td>{obj.discountTax}</td>
                                    <td></td>
                                </tbody>
                            )
                        })
                    }
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
                                    <Option value="disabled" disabled>
                                        Disabled
                                    </Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </div>
                            <div><button className='save-button' type='submit' >Save</button></div>
                        </div>
                    </form>
                </div>
                <div className='discount-output'>
                    {
                        taxArray?.length > 0 &&
                        <thead className='discount-output_head'>
                            <th>Discount Name</th>
                            <th>Discount Value</th>
                            <th>Amount</th>
                            <th></th>
                        </thead>
                    }
                    {
                        taxArray?.map((obj) => {
                            return (
                                <tbody className='discount-output_body'>
                                    <td>{obj.taxName}</td>
                                    <td>{obj.taxState}</td>
                                    <td>{obj.taxValue}</td>
                                    <td></td>
                                </tbody>
                            )
                        })
                    }
                </div>
            </div>
            <div className='discount-container_first'>
                <p className='heading'>Shipping</p>
                <div>
                    <form className='discount-container_first-form' onSubmit={handleShippingSubmit}>
                        <div className='discount-container_first-form_section'>
                            <p>Tax Name</p>
                            <input placeholder='Colorado Custom' value={shippingName} onChange={(e) => { setShippingName(e.target.value) }} />
                        </div>
                        <div className='discount-container_first-form_section'>
                            <p>State</p>
                            <input placeholder='Colorado Custom' value={shippingState} onChange={(e) => { setShippingState(e.target.value) }} />
                        </div>
                        <div><button className='save-button' type='submit' >Save</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default DiscountTaxes