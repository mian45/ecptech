import React, { useEffect, useState } from 'react';
import './style.scss';

import edit from "../../images/edit.png"
import cross from "../../images/cross.png"

import { Select } from 'antd';
import axios from 'axios';
const { Option } = Select;

const DiscountTaxes = () => {
    const [discountName, setDiscountName] = useState('')
    const [discountTax, setDiscountTax] = useState('')
    const [discountArray, setDiscountArray] = useState([])
    let [discounts, setDiscounts] = useState()


    const [taxName, setTaxName] = useState('')
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
    }, [])

    useEffect(() => {
        getDiscount()
        getTaxes()
        getShipping()
    }, [])

    const addDiscount = () => {
        var data = new FormData();
        data.append('userId', '44');
        data.append('name', discounts.name);
        data.append('value', discounts.value);
        var config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/addDiscount`,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGFjYWEzM2Y0NGY2YjI2NDQ1ZmUxZTEyYzhlMTU3MmIyODI1NTdmYjM0YTI0Y2IyNWI1YzkxNmZiNDczMGEzNTg5NmI2MTJhYTI0OWEwMmYiLCJpYXQiOjE2NjMwMDg3ODUuNDE1Mjc2LCJuYmYiOjE2NjMwMDg3ODUuNDE1MjgsImV4cCI6MTY5NDU0NDc4NS40MTAwNDQsInN1YiI6IjEwIiwic2NvcGVzIjpbXX0.jNSgXRmHSENfv1GacNbGoXQ2rxVokWi0xhNRDgEMPQj9VpiADmfqJkOWrbmZ54d6xPONQhB8txdpgBRjGA8PozQov3cIpfkRxW-99uIpzU8Hm1y4r5vDJrBf9DIsG5XwoLwCdhuwOpB-DOnubSYgrYHJkK86dvlhe5VS5Sk74kTw7LNta3jsG1z8xytr1aWGAiJPvut1kk84Zvkl692rfP9bqsSQXp0TJQGrcH49vJmVvlvcwfEkYR15evvmBMS2Kfn5h6OXVflqg2QG2iIE8HsJAtlcs5oTuzitrNwoLPw0ixVvz-83Nc9VLPoLHj020HZx4ix-knSUDm3REywKr9LNv0mCP8G3BRWA68SaOkw_-zlxwjpsjP-Su5GsRDAfDGvknN4INiqD6vzi2zPvQ_DuwSTvrB-UMpU44UxR4QQNwJKTKdhE37iBqlPVftHmp-Uz1m0EDBAdkZegx1r7iQto4kXoCmKYCDtFfXbkROXi0qYZIPMFMcpuy7NZaFP4haB7OEl4YaEhs697O6HCF-kLWWvzBCHDjmNjR2zErIelamukisC7qGKQo6G_T6v-oYjOEt_5pKlDrJZ0VgGd2nRcslPqcZiIX3O_ljR5UIKqX71fG1aaoDrh84HnG0URhc1CcJTggutb_02w8W8wLtdMl75jh0Uylm1j4EACRgM',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const deleteDiscount = (id) => {
        var data = new FormData();
        data.append('id', id);

        var config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/deleteDiscount`,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGFjYWEzM2Y0NGY2YjI2NDQ1ZmUxZTEyYzhlMTU3MmIyODI1NTdmYjM0YTI0Y2IyNWI1YzkxNmZiNDczMGEzNTg5NmI2MTJhYTI0OWEwMmYiLCJpYXQiOjE2NjMwMDg3ODUuNDE1Mjc2LCJuYmYiOjE2NjMwMDg3ODUuNDE1MjgsImV4cCI6MTY5NDU0NDc4NS40MTAwNDQsInN1YiI6IjEwIiwic2NvcGVzIjpbXX0.jNSgXRmHSENfv1GacNbGoXQ2rxVokWi0xhNRDgEMPQj9VpiADmfqJkOWrbmZ54d6xPONQhB8txdpgBRjGA8PozQov3cIpfkRxW-99uIpzU8Hm1y4r5vDJrBf9DIsG5XwoLwCdhuwOpB-DOnubSYgrYHJkK86dvlhe5VS5Sk74kTw7LNta3jsG1z8xytr1aWGAiJPvut1kk84Zvkl692rfP9bqsSQXp0TJQGrcH49vJmVvlvcwfEkYR15evvmBMS2Kfn5h6OXVflqg2QG2iIE8HsJAtlcs5oTuzitrNwoLPw0ixVvz-83Nc9VLPoLHj020HZx4ix-knSUDm3REywKr9LNv0mCP8G3BRWA68SaOkw_-zlxwjpsjP-Su5GsRDAfDGvknN4INiqD6vzi2zPvQ_DuwSTvrB-UMpU44UxR4QQNwJKTKdhE37iBqlPVftHmp-Uz1m0EDBAdkZegx1r7iQto4kXoCmKYCDtFfXbkROXi0qYZIPMFMcpuy7NZaFP4haB7OEl4YaEhs697O6HCF-kLWWvzBCHDjmNjR2zErIelamukisC7qGKQo6G_T6v-oYjOEt_5pKlDrJZ0VgGd2nRcslPqcZiIX3O_ljR5UIKqX71fG1aaoDrh84HnG0URhc1CcJTggutb_02w8W8wLtdMl75jh0Uylm1j4EACRgM',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const addTax = () => {
        var data = new FormData();
        data.append('userId', '44');
        data.append('stateId', stateSetting);
        data.append('name', taxName);
        data.append('value', taxValue);

        var config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/addTax`,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGFjYWEzM2Y0NGY2YjI2NDQ1ZmUxZTEyYzhlMTU3MmIyODI1NTdmYjM0YTI0Y2IyNWI1YzkxNmZiNDczMGEzNTg5NmI2MTJhYTI0OWEwMmYiLCJpYXQiOjE2NjMwMDg3ODUuNDE1Mjc2LCJuYmYiOjE2NjMwMDg3ODUuNDE1MjgsImV4cCI6MTY5NDU0NDc4NS40MTAwNDQsInN1YiI6IjEwIiwic2NvcGVzIjpbXX0.jNSgXRmHSENfv1GacNbGoXQ2rxVokWi0xhNRDgEMPQj9VpiADmfqJkOWrbmZ54d6xPONQhB8txdpgBRjGA8PozQov3cIpfkRxW-99uIpzU8Hm1y4r5vDJrBf9DIsG5XwoLwCdhuwOpB-DOnubSYgrYHJkK86dvlhe5VS5Sk74kTw7LNta3jsG1z8xytr1aWGAiJPvut1kk84Zvkl692rfP9bqsSQXp0TJQGrcH49vJmVvlvcwfEkYR15evvmBMS2Kfn5h6OXVflqg2QG2iIE8HsJAtlcs5oTuzitrNwoLPw0ixVvz-83Nc9VLPoLHj020HZx4ix-knSUDm3REywKr9LNv0mCP8G3BRWA68SaOkw_-zlxwjpsjP-Su5GsRDAfDGvknN4INiqD6vzi2zPvQ_DuwSTvrB-UMpU44UxR4QQNwJKTKdhE37iBqlPVftHmp-Uz1m0EDBAdkZegx1r7iQto4kXoCmKYCDtFfXbkROXi0qYZIPMFMcpuy7NZaFP4haB7OEl4YaEhs697O6HCF-kLWWvzBCHDjmNjR2zErIelamukisC7qGKQo6G_T6v-oYjOEt_5pKlDrJZ0VgGd2nRcslPqcZiIX3O_ljR5UIKqX71fG1aaoDrh84HnG0URhc1CcJTggutb_02w8W8wLtdMl75jh0Uylm1j4EACRgM',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
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
        console.log(values, 'values');
        var data = new FormData();
        data.append('id', idState);
        data.append('stateId', stateSetting);
        data.append('name', taxName);
        data.append('value', taxValue);

        var config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/editTax`,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGFjYWEzM2Y0NGY2YjI2NDQ1ZmUxZTEyYzhlMTU3MmIyODI1NTdmYjM0YTI0Y2IyNWI1YzkxNmZiNDczMGEzNTg5NmI2MTJhYTI0OWEwMmYiLCJpYXQiOjE2NjMwMDg3ODUuNDE1Mjc2LCJuYmYiOjE2NjMwMDg3ODUuNDE1MjgsImV4cCI6MTY5NDU0NDc4NS40MTAwNDQsInN1YiI6IjEwIiwic2NvcGVzIjpbXX0.jNSgXRmHSENfv1GacNbGoXQ2rxVokWi0xhNRDgEMPQj9VpiADmfqJkOWrbmZ54d6xPONQhB8txdpgBRjGA8PozQov3cIpfkRxW-99uIpzU8Hm1y4r5vDJrBf9DIsG5XwoLwCdhuwOpB-DOnubSYgrYHJkK86dvlhe5VS5Sk74kTw7LNta3jsG1z8xytr1aWGAiJPvut1kk84Zvkl692rfP9bqsSQXp0TJQGrcH49vJmVvlvcwfEkYR15evvmBMS2Kfn5h6OXVflqg2QG2iIE8HsJAtlcs5oTuzitrNwoLPw0ixVvz-83Nc9VLPoLHj020HZx4ix-knSUDm3REywKr9LNv0mCP8G3BRWA68SaOkw_-zlxwjpsjP-Su5GsRDAfDGvknN4INiqD6vzi2zPvQ_DuwSTvrB-UMpU44UxR4QQNwJKTKdhE37iBqlPVftHmp-Uz1m0EDBAdkZegx1r7iQto4kXoCmKYCDtFfXbkROXi0qYZIPMFMcpuy7NZaFP4haB7OEl4YaEhs697O6HCF-kLWWvzBCHDjmNjR2zErIelamukisC7qGKQo6G_T6v-oYjOEt_5pKlDrJZ0VgGd2nRcslPqcZiIX3O_ljR5UIKqX71fG1aaoDrh84HnG0URhc1CcJTggutb_02w8W8wLtdMl75jh0Uylm1j4EACRgM',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
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
        var data = new FormData();
        data.append('id', tid);

        var config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/deleteTax`,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGFjYWEzM2Y0NGY2YjI2NDQ1ZmUxZTEyYzhlMTU3MmIyODI1NTdmYjM0YTI0Y2IyNWI1YzkxNmZiNDczMGEzNTg5NmI2MTJhYTI0OWEwMmYiLCJpYXQiOjE2NjMwMDg3ODUuNDE1Mjc2LCJuYmYiOjE2NjMwMDg3ODUuNDE1MjgsImV4cCI6MTY5NDU0NDc4NS40MTAwNDQsInN1YiI6IjEwIiwic2NvcGVzIjpbXX0.jNSgXRmHSENfv1GacNbGoXQ2rxVokWi0xhNRDgEMPQj9VpiADmfqJkOWrbmZ54d6xPONQhB8txdpgBRjGA8PozQov3cIpfkRxW-99uIpzU8Hm1y4r5vDJrBf9DIsG5XwoLwCdhuwOpB-DOnubSYgrYHJkK86dvlhe5VS5Sk74kTw7LNta3jsG1z8xytr1aWGAiJPvut1kk84Zvkl692rfP9bqsSQXp0TJQGrcH49vJmVvlvcwfEkYR15evvmBMS2Kfn5h6OXVflqg2QG2iIE8HsJAtlcs5oTuzitrNwoLPw0ixVvz-83Nc9VLPoLHj020HZx4ix-knSUDm3REywKr9LNv0mCP8G3BRWA68SaOkw_-zlxwjpsjP-Su5GsRDAfDGvknN4INiqD6vzi2zPvQ_DuwSTvrB-UMpU44UxR4QQNwJKTKdhE37iBqlPVftHmp-Uz1m0EDBAdkZegx1r7iQto4kXoCmKYCDtFfXbkROXi0qYZIPMFMcpuy7NZaFP4haB7OEl4YaEhs697O6HCF-kLWWvzBCHDjmNjR2zErIelamukisC7qGKQo6G_T6v-oYjOEt_5pKlDrJZ0VgGd2nRcslPqcZiIX3O_ljR5UIKqX71fG1aaoDrh84HnG0URhc1CcJTggutb_02w8W8wLtdMl75jh0Uylm1j4EACRgM',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const addShipping = () => {
        var data = new FormData();
        data.append('userId', '44');
        data.append('name', shipping.name);
        data.append('value', shipping.value);

        var config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/addShipping`,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGFjYWEzM2Y0NGY2YjI2NDQ1ZmUxZTEyYzhlMTU3MmIyODI1NTdmYjM0YTI0Y2IyNWI1YzkxNmZiNDczMGEzNTg5NmI2MTJhYTI0OWEwMmYiLCJpYXQiOjE2NjMwMDg3ODUuNDE1Mjc2LCJuYmYiOjE2NjMwMDg3ODUuNDE1MjgsImV4cCI6MTY5NDU0NDc4NS40MTAwNDQsInN1YiI6IjEwIiwic2NvcGVzIjpbXX0.jNSgXRmHSENfv1GacNbGoXQ2rxVokWi0xhNRDgEMPQj9VpiADmfqJkOWrbmZ54d6xPONQhB8txdpgBRjGA8PozQov3cIpfkRxW-99uIpzU8Hm1y4r5vDJrBf9DIsG5XwoLwCdhuwOpB-DOnubSYgrYHJkK86dvlhe5VS5Sk74kTw7LNta3jsG1z8xytr1aWGAiJPvut1kk84Zvkl692rfP9bqsSQXp0TJQGrcH49vJmVvlvcwfEkYR15evvmBMS2Kfn5h6OXVflqg2QG2iIE8HsJAtlcs5oTuzitrNwoLPw0ixVvz-83Nc9VLPoLHj020HZx4ix-knSUDm3REywKr9LNv0mCP8G3BRWA68SaOkw_-zlxwjpsjP-Su5GsRDAfDGvknN4INiqD6vzi2zPvQ_DuwSTvrB-UMpU44UxR4QQNwJKTKdhE37iBqlPVftHmp-Uz1m0EDBAdkZegx1r7iQto4kXoCmKYCDtFfXbkROXi0qYZIPMFMcpuy7NZaFP4haB7OEl4YaEhs697O6HCF-kLWWvzBCHDjmNjR2zErIelamukisC7qGKQo6G_T6v-oYjOEt_5pKlDrJZ0VgGd2nRcslPqcZiIX3O_ljR5UIKqX71fG1aaoDrh84HnG0URhc1CcJTggutb_02w8W8wLtdMl75jh0Uylm1j4EACRgM',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const deleteShipping = (id) => {
        var data = new FormData();
        data.append('id', id);

        var config = {
            method: 'post',
            url: `${process.env.MIX_REACT_APP_URL}/api/deleteShipping`,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGFjYWEzM2Y0NGY2YjI2NDQ1ZmUxZTEyYzhlMTU3MmIyODI1NTdmYjM0YTI0Y2IyNWI1YzkxNmZiNDczMGEzNTg5NmI2MTJhYTI0OWEwMmYiLCJpYXQiOjE2NjMwMDg3ODUuNDE1Mjc2LCJuYmYiOjE2NjMwMDg3ODUuNDE1MjgsImV4cCI6MTY5NDU0NDc4NS40MTAwNDQsInN1YiI6IjEwIiwic2NvcGVzIjpbXX0.jNSgXRmHSENfv1GacNbGoXQ2rxVokWi0xhNRDgEMPQj9VpiADmfqJkOWrbmZ54d6xPONQhB8txdpgBRjGA8PozQov3cIpfkRxW-99uIpzU8Hm1y4r5vDJrBf9DIsG5XwoLwCdhuwOpB-DOnubSYgrYHJkK86dvlhe5VS5Sk74kTw7LNta3jsG1z8xytr1aWGAiJPvut1kk84Zvkl692rfP9bqsSQXp0TJQGrcH49vJmVvlvcwfEkYR15evvmBMS2Kfn5h6OXVflqg2QG2iIE8HsJAtlcs5oTuzitrNwoLPw0ixVvz-83Nc9VLPoLHj020HZx4ix-knSUDm3REywKr9LNv0mCP8G3BRWA68SaOkw_-zlxwjpsjP-Su5GsRDAfDGvknN4INiqD6vzi2zPvQ_DuwSTvrB-UMpU44UxR4QQNwJKTKdhE37iBqlPVftHmp-Uz1m0EDBAdkZegx1r7iQto4kXoCmKYCDtFfXbkROXi0qYZIPMFMcpuy7NZaFP4haB7OEl4YaEhs697O6HCF-kLWWvzBCHDjmNjR2zErIelamukisC7qGKQo6G_T6v-oYjOEt_5pKlDrJZ0VgGd2nRcslPqcZiIX3O_ljR5UIKqX71fG1aaoDrh84HnG0URhc1CcJTggutb_02w8W8wLtdMl75jh0Uylm1j4EACRgM',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    const getState = () => {
        var data = new FormData();

        var config = {
            method: 'get',
            url: `${process.env.MIX_REACT_APP_URL}/api/getStates`,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGFjYWEzM2Y0NGY2YjI2NDQ1ZmUxZTEyYzhlMTU3MmIyODI1NTdmYjM0YTI0Y2IyNWI1YzkxNmZiNDczMGEzNTg5NmI2MTJhYTI0OWEwMmYiLCJpYXQiOjE2NjMwMDg3ODUuNDE1Mjc2LCJuYmYiOjE2NjMwMDg3ODUuNDE1MjgsImV4cCI6MTY5NDU0NDc4NS40MTAwNDQsInN1YiI6IjEwIiwic2NvcGVzIjpbXX0.jNSgXRmHSENfv1GacNbGoXQ2rxVokWi0xhNRDgEMPQj9VpiADmfqJkOWrbmZ54d6xPONQhB8txdpgBRjGA8PozQov3cIpfkRxW-99uIpzU8Hm1y4r5vDJrBf9DIsG5XwoLwCdhuwOpB-DOnubSYgrYHJkK86dvlhe5VS5Sk74kTw7LNta3jsG1z8xytr1aWGAiJPvut1kk84Zvkl692rfP9bqsSQXp0TJQGrcH49vJmVvlvcwfEkYR15evvmBMS2Kfn5h6OXVflqg2QG2iIE8HsJAtlcs5oTuzitrNwoLPw0ixVvz-83Nc9VLPoLHj020HZx4ix-knSUDm3REywKr9LNv0mCP8G3BRWA68SaOkw_-zlxwjpsjP-Su5GsRDAfDGvknN4INiqD6vzi2zPvQ_DuwSTvrB-UMpU44UxR4QQNwJKTKdhE37iBqlPVftHmp-Uz1m0EDBAdkZegx1r7iQto4kXoCmKYCDtFfXbkROXi0qYZIPMFMcpuy7NZaFP4haB7OEl4YaEhs697O6HCF-kLWWvzBCHDjmNjR2zErIelamukisC7qGKQo6G_T6v-oYjOEt_5pKlDrJZ0VgGd2nRcslPqcZiIX3O_ljR5UIKqX71fG1aaoDrh84HnG0URhc1CcJTggutb_02w8W8wLtdMl75jh0Uylm1j4EACRgM',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setTaxState(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleClick = (value) => {
        setDiscountTax(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            discounts.name = discountName;
            discounts.value = discountTax
            setDiscounts(discounts)
            setEditId("")
            setDiscountName("")
            setDiscountTax("")
            addDiscount()
        }
    }

    const handlUpdate = (value) => {
        setDiscountName(value.name)
        setDiscountTax(value.value)
        setEditId(value.id)
        addDiscount()
    }

    const handleDelete = (id) => {
        deleteDiscount(id)
        setDiscountArray([...discountArray].filter((discountobj) => {
            return discountobj.id !== id
        }))
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
            addDiscount()
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
        var data = new FormData();

        var config = {
            method: 'get',
            url: `${process.env.MIX_REACT_APP_URL}/api/getDiscount?userId=44`,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGFjYWEzM2Y0NGY2YjI2NDQ1ZmUxZTEyYzhlMTU3MmIyODI1NTdmYjM0YTI0Y2IyNWI1YzkxNmZiNDczMGEzNTg5NmI2MTJhYTI0OWEwMmYiLCJpYXQiOjE2NjMwMDg3ODUuNDE1Mjc2LCJuYmYiOjE2NjMwMDg3ODUuNDE1MjgsImV4cCI6MTY5NDU0NDc4NS40MTAwNDQsInN1YiI6IjEwIiwic2NvcGVzIjpbXX0.jNSgXRmHSENfv1GacNbGoXQ2rxVokWi0xhNRDgEMPQj9VpiADmfqJkOWrbmZ54d6xPONQhB8txdpgBRjGA8PozQov3cIpfkRxW-99uIpzU8Hm1y4r5vDJrBf9DIsG5XwoLwCdhuwOpB-DOnubSYgrYHJkK86dvlhe5VS5Sk74kTw7LNta3jsG1z8xytr1aWGAiJPvut1kk84Zvkl692rfP9bqsSQXp0TJQGrcH49vJmVvlvcwfEkYR15evvmBMS2Kfn5h6OXVflqg2QG2iIE8HsJAtlcs5oTuzitrNwoLPw0ixVvz-83Nc9VLPoLHj020HZx4ix-knSUDm3REywKr9LNv0mCP8G3BRWA68SaOkw_-zlxwjpsjP-Su5GsRDAfDGvknN4INiqD6vzi2zPvQ_DuwSTvrB-UMpU44UxR4QQNwJKTKdhE37iBqlPVftHmp-Uz1m0EDBAdkZegx1r7iQto4kXoCmKYCDtFfXbkROXi0qYZIPMFMcpuy7NZaFP4haB7OEl4YaEhs697O6HCF-kLWWvzBCHDjmNjR2zErIelamukisC7qGKQo6G_T6v-oYjOEt_5pKlDrJZ0VgGd2nRcslPqcZiIX3O_ljR5UIKqX71fG1aaoDrh84HnG0URhc1CcJTggutb_02w8W8wLtdMl75jh0Uylm1j4EACRgM',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                let discountTax = response.data.data
                setDiscounts(discountTax)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const getTaxes = () => {
        var data = new FormData();

        var config = {
            method: 'get',
            url: `${process.env.MIX_REACT_APP_URL}/api/getTaxes?userId=44`,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGFjYWEzM2Y0NGY2YjI2NDQ1ZmUxZTEyYzhlMTU3MmIyODI1NTdmYjM0YTI0Y2IyNWI1YzkxNmZiNDczMGEzNTg5NmI2MTJhYTI0OWEwMmYiLCJpYXQiOjE2NjMwMDg3ODUuNDE1Mjc2LCJuYmYiOjE2NjMwMDg3ODUuNDE1MjgsImV4cCI6MTY5NDU0NDc4NS40MTAwNDQsInN1YiI6IjEwIiwic2NvcGVzIjpbXX0.jNSgXRmHSENfv1GacNbGoXQ2rxVokWi0xhNRDgEMPQj9VpiADmfqJkOWrbmZ54d6xPONQhB8txdpgBRjGA8PozQov3cIpfkRxW-99uIpzU8Hm1y4r5vDJrBf9DIsG5XwoLwCdhuwOpB-DOnubSYgrYHJkK86dvlhe5VS5Sk74kTw7LNta3jsG1z8xytr1aWGAiJPvut1kk84Zvkl692rfP9bqsSQXp0TJQGrcH49vJmVvlvcwfEkYR15evvmBMS2Kfn5h6OXVflqg2QG2iIE8HsJAtlcs5oTuzitrNwoLPw0ixVvz-83Nc9VLPoLHj020HZx4ix-knSUDm3REywKr9LNv0mCP8G3BRWA68SaOkw_-zlxwjpsjP-Su5GsRDAfDGvknN4INiqD6vzi2zPvQ_DuwSTvrB-UMpU44UxR4QQNwJKTKdhE37iBqlPVftHmp-Uz1m0EDBAdkZegx1r7iQto4kXoCmKYCDtFfXbkROXi0qYZIPMFMcpuy7NZaFP4haB7OEl4YaEhs697O6HCF-kLWWvzBCHDjmNjR2zErIelamukisC7qGKQo6G_T6v-oYjOEt_5pKlDrJZ0VgGd2nRcslPqcZiIX3O_ljR5UIKqX71fG1aaoDrh84HnG0URhc1CcJTggutb_02w8W8wLtdMl75jh0Uylm1j4EACRgM',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                let taxes = response.data.data;
                setTaxes(taxes)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const getShipping = () => {
        var data = new FormData();

        var config = {
            method: 'get',
            url: `${process.env.MIX_REACT_APP_URL}/api/getShipping?userId=44`,
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGFjYWEzM2Y0NGY2YjI2NDQ1ZmUxZTEyYzhlMTU3MmIyODI1NTdmYjM0YTI0Y2IyNWI1YzkxNmZiNDczMGEzNTg5NmI2MTJhYTI0OWEwMmYiLCJpYXQiOjE2NjMwMDg3ODUuNDE1Mjc2LCJuYmYiOjE2NjMwMDg3ODUuNDE1MjgsImV4cCI6MTY5NDU0NDc4NS40MTAwNDQsInN1YiI6IjEwIiwic2NvcGVzIjpbXX0.jNSgXRmHSENfv1GacNbGoXQ2rxVokWi0xhNRDgEMPQj9VpiADmfqJkOWrbmZ54d6xPONQhB8txdpgBRjGA8PozQov3cIpfkRxW-99uIpzU8Hm1y4r5vDJrBf9DIsG5XwoLwCdhuwOpB-DOnubSYgrYHJkK86dvlhe5VS5Sk74kTw7LNta3jsG1z8xytr1aWGAiJPvut1kk84Zvkl692rfP9bqsSQXp0TJQGrcH49vJmVvlvcwfEkYR15evvmBMS2Kfn5h6OXVflqg2QG2iIE8HsJAtlcs5oTuzitrNwoLPw0ixVvz-83Nc9VLPoLHj020HZx4ix-knSUDm3REywKr9LNv0mCP8G3BRWA68SaOkw_-zlxwjpsjP-Su5GsRDAfDGvknN4INiqD6vzi2zPvQ_DuwSTvrB-UMpU44UxR4QQNwJKTKdhE37iBqlPVftHmp-Uz1m0EDBAdkZegx1r7iQto4kXoCmKYCDtFfXbkROXi0qYZIPMFMcpuy7NZaFP4haB7OEl4YaEhs697O6HCF-kLWWvzBCHDjmNjR2zErIelamukisC7qGKQo6G_T6v-oYjOEt_5pKlDrJZ0VgGd2nRcslPqcZiIX3O_ljR5UIKqX71fG1aaoDrh84HnG0URhc1CcJTggutb_02w8W8wLtdMl75jh0Uylm1j4EACRgM',
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
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
                        <div>
                            <p>Discount Value</p>
                            <Select
                                defaultValue="Select"
                                style={{
                                    width: 120,
                                }}
                                onChange={handleClick}
                                value={discountTax || "Select"}
                            >
                                <Option value={10}>10</Option>
                                <Option value={20}>20</Option>
                                <Option value={30}>30</Option>
                                <Option value={40}>40</Option>
                            </Select>
                        </div>
                        <div><button onClick={handleSubmit} className='save-button' type='submit' >Save</button></div>
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
                            discounts &&
                            <tr className='discount-output_body'>

                                <td>{discounts.name}</td>
                                <td>{discounts.value}</td>
                                <td><img style={{ width: '18px', height: '18px', marginRight: '30px' }} src={edit} onClick={() => { handlUpdate(discounts) }} />
                                    <img style={{ width: '16px', height: '16px' }} src={cross} onClick={() => { handleDelete(discounts.id) }} /></td>
                            </tr>

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
                                <input type={'number'} min={0} placeholder='Enter Tax Name' value={taxValue} onChange={(e) => { setTaxValue(e.target.value) }} />
                            </div>
                        </div>
                        <div className='second-section'>
                            <div className='discount-container_second-form_section'>
                                <p>Tax Name</p>
                                <input placeholder='Select State' value={taxName} onChange={(e) => { setTaxName(e.target.value) }} />
                            </div>
                            <div>


                                <p>State</p>
                                <Select
                                    defaultValue="Select"
                                    style={{
                                        width: 120,
                                    }}
                                    value={stateSetting || "Select"}
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
                            <div><button onClick={(e) => { idState !== null ? handlUpdateTax(e) : handleTaxSubmit(e) }} className='save-button' type='submit' >Save</button></div>
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
                                <th>Amount</th>
                                <th></th>
                            </tr>
                        }
                        {
                            tax?.length > 0 && tax?.map((obj) => {
                                return (
                                    <tr className='discount-output_body'>

                                        <td>{obj.name}</td>
                                        <td>{obj.state_id}</td>
                                        <td>{obj.value}</td>
                                        <td><img style={{ width: '18px', height: '18px', marginRight: '30px' }} src={edit} onClick={() => { updateHandler(obj) }} />
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
                    <form className='discount-container_first-form'>
                        <div className='discount-container_first-form_section'>
                            <p>Amount</p>
                            <input placeholder='Enter Text' value={shippingName} onChange={(e) => { setShippingName(e.target.value) }} />
                        </div>
                        <div className='discount-container_first-form_section'>
                            <p>Add Shipping Amount</p>
                            <input placeholder='Enter Amount' type={'number'} min={0} value={shippingState} onChange={(e) => { setShippingState(e.target.value) }} />
                        </div>
                        <div><button onClick={handleShippingSubmit} className='save-button' type='submit' >Save</button></div>
                    </form>
                </div>
                <div className='discount-output'>
                    <table>
                        {
                            shipping &&
                            <tr className='discount-output_head'>
                                <th>Enter Label</th>
                                <th>Add Shipping Amount</th>
                                <th></th>
                            </tr>
                        }
                        {
                            shipping &&
                            <tr className='discount-output_body'>

                                <td>{shipping.name}</td>
                                <td>{shipping.value}</td>
                                <td><img style={{ width: '18px', height: '18px', marginRight: '30px' }} src={edit} onClick={() => { handlUpdateShipping(shipping) }} />
                                    <img style={{ width: '16px', height: '16px' }} src={cross} onClick={() => { handleDeleteShipping(shipping.id) }} /></td>
                            </tr>

                        }

                    </table>
                </div>
            </div>
        </div>
    )
}
export default DiscountTaxes