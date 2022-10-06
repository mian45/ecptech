import React, { useEffect, useState } from 'react';
import './style.scss';
import { connect } from "react-redux";

import edit from "../../images/edit.png"
import cross from "../../images/cross.png"

import { Select } from 'antd';
import axios from 'axios';
const { Option } = Select;
import { Switch } from 'antd';
const label = { inputProps: { 'aria-label': 'Switch demo' } }
const DiscountTaxes = (props) => {
    const [discountName, setDiscountName] = useState('')
    const [discountTax, setDiscountTax] = useState('')
    const [discountId,setDiscountId]=useState(null)
    const [discountArray, setDiscountArray] = useState([])
    let [discounts, setDiscounts] = useState([])


    const [taxName, setTaxName] = useState('Sales Tax')
    const [stateSetting, setStateSetting] = useState('')
    const [taxValue, setTaxValue] = useState('')
    let [tax, setTaxes] = useState([])
    const [taxState, setTaxState] = useState([])
    const [idState, setIdState] = useState(null)


    const [shippingName, setShippingName] = useState('')
    const [shippingState, setShippingState] = useState('')
    const [shippingArray, setShippingArray] = useState([])
    let [shipping, setShipping] = useState()

    const [editId, setEditId] = useState("")

    useEffect(() => {
        getState()
        getDiscount()
        getTaxes()
        getShipping()
    }, [])

    const addDiscount = () => {
        let data = new FormData();
        data.append('userId', props.userID);
        data.append('name', discountName);
        data.append('value', new Number(discountTax));
        let config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/add-discount`,
            headers: {
                'Authorization': `Bearer ${props.token}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setDiscountId(null)
        setDiscountName("")
        setDiscountTax("")
        getDiscount()
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const deleteDiscount = (id) => {
        let data = new FormData();
        data.append('id', id);

        let config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/delete-discount`,
            headers: {
                'Authorization': `Bearer ${props.token}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                getDiscount()
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const addTax = () => {
        let data = new FormData();
        data.append('userId', props.userID);
        data.append('stateId', stateSetting);
        data.append('name', taxName);
        data.append('value', taxValue);

        let config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/addTax`,
            headers: {
                'Authorization': `Bearer ${props.token}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setTaxName("")
                setStateSetting("")
                setTaxValue("")
                setIdState(null)
                getTaxes()
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const editTax = (values) => {
        let data = new FormData();
        data.append('id', idState);
        data.append('stateId', stateSetting);
        data.append('name', taxName);
        data.append('value', taxValue);

        let config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/editTax`,
            headers: {
                'Authorization': `Bearer ${props.token}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                getTaxes();

                setTaxName("")
                setStateSetting("")
                setTaxValue("")
                setIdState(null)

            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const deleteTax = (tid) => {
        let data = new FormData();
        data.append('id', tid);

        let config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/deleteTax`,
            headers: {
                'Authorization': `Bearer ${props.token}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const addShipping = () => {
        let data = new FormData();
        data.append('userId', props.userID);
        data.append('name', shipping.name);
        data.append('value', shipping.value);

        let config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/addShipping`,
            headers: {
                'Authorization': `Bearer ${props.token}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const deleteShipping = (id) => {
        let data = new FormData();
        data.append('id', id);

        let config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/deleteShipping`,
            headers: {
                'Authorization': `Bearer ${props.token}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    const getState = () => {
        let data = new FormData();

        let config = {
            method: 'get',
            url: `${process.env.MIX_REACT_APP_URL}/api/getStates`,
            headers: {
                'Authorization': `Bearer ${props.token}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setTaxState(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const updateDiscount=()=>{
        var data = new FormData();
data.append('id', discountId);
data.append('name', discountName);
data.append('value', new Number(discountTax));

var config = {
  method: 'post',
  url: `${process.env.MIX_REACT_APP_URL}/api/edit-discount`,
  headers: {
      'Authorization': `Bearer ${props.token}`,
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  setEditId(null)
        setDiscountName("")
        setDiscountTax("")
        setDiscountId(null)
        getDiscount()
})
.catch(function (error) {
  console.log(error);
});
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (discountId!==null) {
            updateDiscount()
        }
        else {
            addDiscount()
        }
    }

    const handlUpdate = (value) => {
        setDiscountName(value.name)
        setDiscountTax(value.value)
        setDiscountId(value.id);
    }

    const handleDelete = (id) => {
        deleteDiscount(id)
    }


    const handleTaxSubmit = (e) => {
        e.preventDefault();

        addTax()
        setTaxes([...tax, { name: taxName, state_id: stateSetting, value: taxValue }])

    }


    const handlUpdateTax = (e) => {
        e.preventDefault()
        editTax()

    }

    const handleDeleteTax = (id) => {
        deleteTax(id)
        setTaxes([...tax].filter((taxObj) => {
            return taxObj.id !== id
        }))
    }

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            shipping.name = shippingName;
            shipping.value = shippingState
            setShipping(shipping)
            setEditId("")
            setShippingName("")
            setShippingState("")
            addShipping()
        }

        else {
            setShipping({ name: shippingName, value: shippingState })
            addShipping()
        }
    }

    const handlUpdateShipping = (value) => {
        setShippingName(value.name)
        setShippingState(value.value)
        setEditId(value.id)
        addShipping()
    }

    const handleDeleteShipping = (id) => {
        deleteShipping(id)
        setShippingArray([...shippingArray].filter((discountobj) => {
            return discountobj.id !== id
        }))
    }

    const getDiscount = () => {
        let data = new FormData();

        let config = {
            method: 'get',
            url: `${process.env.MIX_REACT_APP_URL}/api/get-discount?userId=${props.userID}`,
            headers: {
                'Authorization': `Bearer ${props.token}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setDiscounts(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const getTaxes = () => {
        let data = new FormData();

        let config = {
            method: 'get',
            url: `${process.env.MIX_REACT_APP_URL}/api/getTaxes?userId=${props.userID}`,
            headers: {
                'Authorization': `Bearer ${props.token}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                let taxes = response.data.data;
                setTaxes(taxes)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const getShipping = () => {
        let data = new FormData();

        let config = {
            method: 'get',
            url: `${process.env.MIX_REACT_APP_URL}/api/getShipping?userId=${props.userID}`,
            headers: {
                'Authorization': `Bearer ${props.token}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                let shippingTax = response.data.data
                setShipping(shippingTax)
            })
            .catch(function (error) {
                console.log(error);
            });

    }
   
    const updateHandler = (obj) => {
        setIdState(obj.id)
        setTaxName(obj.name)
        setStateSetting(obj.state.id)
        setTaxValue(obj.value)
    }
    const  onChangeDiscountActive=(e,disc,index)=>{
            let data = new FormData();
            data.append('discount_id', disc.id);
            data.append('status', e?"active":"inactive");
            let config = {
                method: 'post',
                url: `${process.env.MIX_REACT_APP_URL}/api/discount-status`,
                headers: {
                    'Authorization': `Bearer ${props.token}`,
                },
                data: data
            };
    
            axios(config)
                .then(function (response) {
                    getDiscount()
                })
                .catch(function (error) {
                    console.log(error);
                });
    
        
    }
    return (
        <div className='discount-container'>
            <p className='main'>{`Discounts & Taxes`}</p>
            <div className='discount-container_first'>
                <p className='heading'>Discounts</p>
                <div >
                    <form className='discount-container_first-form'>
                        <div className='discount-container_first-form_section'>
                            <p>Discount Name</p>
                            <input placeholder='Discount Name' value={discountName} onChange={(e) => { setDiscountName(e.target.value) }} />
                        </div>
                        <div className='discount-container_first-form_section'>
                            <p>Discount Value</p>
                            <input placeholder='Discount Value' value={`${discountTax}%`} onChange={(e) => { setDiscountTax(new Number(e.target.value.replace(/\D/g, "")>100?100:e.target.value.replace(/\D/g, ""))) }} />
                        </div>
                        <div><button onClick={handleSubmit} className={`save-button ${!discountName || !discountTax ? 'disable' : ''} `} type='submit' >Save</button></div>
                    </form>
                </div>
                <div className='discount-output'>
                    <table>
                        {
                            discounts &&
                            <tr className='discount-output_head'>
                                <th>Discount Name</th>
                                <th>Discount Value</th>
                                <th></th>
                            </tr>
                        }
                        {
                            discounts.length>0 &&
                            discounts.map((dis,index)=>{
                                return <tr className='discount-output_body'>

                                <td>{dis.name}</td>
                                <td>{dis.value} %</td>
                                <td><img style={{ width: '18px', height: '18px', marginRight: '30px', cursor: 'pointer' }} src={edit} onClick={() => { handlUpdate(dis) }} />
                                    <img style={{ width: '16px', height: '16px', cursor: 'pointer' }} src={cross} onClick={() => { handleDelete(dis.id) }} />
                                    <Switch {...label} style={{marginLeft:"10px"}} 
                                    checked={dis?.status=="active"?true:false}
                                    onChange={(e)=>{
                                        onChangeDiscountActive(e,dis,index)
                                    }}/></td>
                            </tr>
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
                                <input type={'number'} min={0} placeholder='Add Percentage' value={taxValue} onChange={(e) => { setTaxValue(e.target.value) }} />
                            </div>
                        </div>
                        <div className='second-section'>
                            <div className='discount-container_second-form_section'>
                                <p>Tax Name</p>
                                <input placeholder='Enter Tax Name' value={taxName} onChange={(e) => { setTaxName(e.target.value) }} />
                            </div>
                            <div>


                                <p>State</p>
                                <Select
                                    defaultValue="Select State"
                                    style={{
                                        width: 120,
                                    }}
                                    value={stateSetting || "Select State"}
                                    onChange={(e) => {
                                        setStateSetting(e)
                                    }}
                                >
                                    {
                                        taxState && taxState.map((obj, i) => {
                                            return (
                                                <Option key={i} value={obj.id}>{obj.name}</Option>

                                            )
                                        })
                                    }
                                </Select>
                            </div>
                            <div><button onClick={(e) => { idState !== null ? handlUpdateTax(e) : handleTaxSubmit(e) }} className={`save-button ${!taxName || !stateSetting || !taxValue ? 'disable' : ''} `} type='submit' >Save</button></div>
                        </div>
                    </form>
                </div>
                <div className='discount-output'>
                    <table>
                        {
                            tax?.length > 0 &&
                            <tr className='discount-output_head'>
                                <th>Tax Name</th>
                                <th>State</th>
                                <th>Tax Value</th>
                                <th></th>
                            </tr>
                        }
                        {
                            tax?.length > 0 && tax?.map((obj) => {
                                return (
                                    <tr className='discount-output_body'>

                                        <td>{obj.name}</td>
                                        <td>{taxState && taxState.filter((state, i) => state.id==obj.state_id).map(state=>{return state.name})}</td>
                                        <td>{obj.value}%</td>
                                        <td><img style={{ width: '18px', height: '18px', marginRight: '30px', cursor: 'pointer' }} src={edit} onClick={() => { updateHandler(obj) }} />
                                            <img style={{ width: '16px', height: '16px', cursor: 'pointer' }} src={cross} onClick={() => { handleDeleteTax(obj.id) }} /></td>
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
                    <form className='discount-container_first-form'>
                        <div className='discount-container_first-form_section'>
                            <p>Enter Label</p>
                            <input placeholder='Enter Text' value={shippingName} onChange={(e) => { setShippingName(e.target.value) }} />
                        </div>
                        <div className='discount-container_first-form_section'>
                            <p>Add Shipping Amount</p>
                            <input placeholder='Enter Amount' type={'number'} min={0} value={shippingState} onChange={(e) => { setShippingState(e.target.value) }} />
                        </div>
                        <div><button onClick={handleShippingSubmit} className={`save-button ${!shippingName || !shippingState ? 'disable' : ''} `} type='submit' >Save</button></div>
                    </form>
                </div>
                <div className='discount-output'>
                    <table>
                        {
                            shipping &&
                            <tr className='discount-output_head'>
                                <th>Shipping Label</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                        }
                        {
                            shipping &&
                            <tr className='discount-output_body'>

                                <td>{shipping.name}</td>
                                <td>${shipping.value}</td>
                                <td><img style={{ width: '18px', height: '18px', marginRight: '30px', cursor: 'pointer' }} src={edit} onClick={() => { handlUpdateShipping(shipping) }} />
                                    <img style={{ width: '16px', height: '16px', cursor: 'pointer' }} src={cross} onClick={() => { handleDeleteShipping(shipping.id) }} /></td>
                            </tr>

                        }

                    </table>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

    userID: state.Auth.user?.id,
    token: state.Auth.token
});
export default connect(mapStateToProps)(DiscountTaxes)