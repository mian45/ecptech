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

    let [discounts, setDiscounts] = useState({})

    const [taxName, setTaxName] = useState('')
    const [stateSetting, setStateSetting] = useState("")
    const [taxValue, setTaxValue] = useState('')
    let [tax, setTaxes] = useState([])
    const [taxState, setTaxState] = useState([])

    const [idState, setIdState] = useState(null)


    const [shippingName, setShippingName] = useState('')
    const [shippingState, setShippingState] = useState(0)
    const [shippingArray, setShippingArray] = useState([])

    const [editId, setEditId] = useState("")


    useEffect(() => {
        getState()
    }, [])

    useEffect(() => {
        getDiscount()
        getTaxes()
    }, [])

    const addDiscount = () => {
        var data = new FormData();
        data.append('userId', '44');
        data.append('name', discounts.name);
        data.append('value', discounts.value);
        var config = {
            method: 'post',
            url: 'http://dev.waseem-ecptech.wadic.net/api/addDiscount',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjJkNjMyYTEwZDE5YTllOTQyZWNlZjBjMjRlZmE5ZjBhZWUxZGY4ZmE2MDZkYjAwMDllNjc1MDEyOTgwMjI0MzAzYzNmNDhhMjU4OGY4MjciLCJpYXQiOjE2NjI0ODk3NjEuNjU0MzMyLCJuYmYiOjE2NjI0ODk3NjEuNjU0MzM2LCJleHAiOjE2OTQwMjU3NjEuNjQ5NjEzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.YtL0ZHDefL4TlllfUvbWG4BavLs9FCRiAQDzeDvjXw2sdcmLtK1WMRKzU5gaPi8bZHutmWXVJkdeGl79pNtphcmFEw20tSICTgZ4XQ2lkt5rU0PyG1PFbPOpOHsNU-rsI5VpyRFETKWphawT61eB_raDNYYYmu9uzMdxiJVmcbLqApUKU5F8TGlwUPazEsFQNkHPus9_lH02_t1n8IYHu4tnMrQxDQK7xi40bYcHEz2kmce1NUJp_3N5I-mCY7oOfIbkreURsv6NBt3Hhw1vtu2tSRkfA770mb4gjlAUvx-PZ38ORYbrBNMTK0NZVZ4vKWLw-2Jr-tNZO0lJKRUSoh5HsMj3nBB2snSTcdfINc7rMAnnhI-f3eOsWUjanUbo3ek35eAUyMNR9vYaXHn7M_mZHMAyNWdTlYcyMJr6bMjZMACAqxaSOJSzRzENhVa2sPPoxN1uQu19Y7WbKSjNibdQBJoSH0sD5rP3vnMBOP_mUtTznIZ3rVAcg3TQ8BeJfW_ThgZ9YMUt0cZnM_qP2yMKlCUCOWFvr-1B60M9sqm01xTOQc4pT6GQAugMUBMR8mKas8MC8QiDNQjGScvY3We4FgXz2R3dY9-ral3ppbqfgfPqIwFDFww4xjkkMoS7FS6-ImcT_glfuXxX8_ihTCDphZkZp-tIRddze4kJ8Kw',
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
            url: 'http://dev.waseem-ecptech.wadic.net/api/deleteDiscount',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjJkNjMyYTEwZDE5YTllOTQyZWNlZjBjMjRlZmE5ZjBhZWUxZGY4ZmE2MDZkYjAwMDllNjc1MDEyOTgwMjI0MzAzYzNmNDhhMjU4OGY4MjciLCJpYXQiOjE2NjI0ODk3NjEuNjU0MzMyLCJuYmYiOjE2NjI0ODk3NjEuNjU0MzM2LCJleHAiOjE2OTQwMjU3NjEuNjQ5NjEzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.YtL0ZHDefL4TlllfUvbWG4BavLs9FCRiAQDzeDvjXw2sdcmLtK1WMRKzU5gaPi8bZHutmWXVJkdeGl79pNtphcmFEw20tSICTgZ4XQ2lkt5rU0PyG1PFbPOpOHsNU-rsI5VpyRFETKWphawT61eB_raDNYYYmu9uzMdxiJVmcbLqApUKU5F8TGlwUPazEsFQNkHPus9_lH02_t1n8IYHu4tnMrQxDQK7xi40bYcHEz2kmce1NUJp_3N5I-mCY7oOfIbkreURsv6NBt3Hhw1vtu2tSRkfA770mb4gjlAUvx-PZ38ORYbrBNMTK0NZVZ4vKWLw-2Jr-tNZO0lJKRUSoh5HsMj3nBB2snSTcdfINc7rMAnnhI-f3eOsWUjanUbo3ek35eAUyMNR9vYaXHn7M_mZHMAyNWdTlYcyMJr6bMjZMACAqxaSOJSzRzENhVa2sPPoxN1uQu19Y7WbKSjNibdQBJoSH0sD5rP3vnMBOP_mUtTznIZ3rVAcg3TQ8BeJfW_ThgZ9YMUt0cZnM_qP2yMKlCUCOWFvr-1B60M9sqm01xTOQc4pT6GQAugMUBMR8mKas8MC8QiDNQjGScvY3We4FgXz2R3dY9-ral3ppbqfgfPqIwFDFww4xjkkMoS7FS6-ImcT_glfuXxX8_ihTCDphZkZp-tIRddze4kJ8Kw',
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
            url: 'http://dev.waseem-ecptech.wadic.net/api/addTax',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjJkNjMyYTEwZDE5YTllOTQyZWNlZjBjMjRlZmE5ZjBhZWUxZGY4ZmE2MDZkYjAwMDllNjc1MDEyOTgwMjI0MzAzYzNmNDhhMjU4OGY4MjciLCJpYXQiOjE2NjI0ODk3NjEuNjU0MzMyLCJuYmYiOjE2NjI0ODk3NjEuNjU0MzM2LCJleHAiOjE2OTQwMjU3NjEuNjQ5NjEzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.YtL0ZHDefL4TlllfUvbWG4BavLs9FCRiAQDzeDvjXw2sdcmLtK1WMRKzU5gaPi8bZHutmWXVJkdeGl79pNtphcmFEw20tSICTgZ4XQ2lkt5rU0PyG1PFbPOpOHsNU-rsI5VpyRFETKWphawT61eB_raDNYYYmu9uzMdxiJVmcbLqApUKU5F8TGlwUPazEsFQNkHPus9_lH02_t1n8IYHu4tnMrQxDQK7xi40bYcHEz2kmce1NUJp_3N5I-mCY7oOfIbkreURsv6NBt3Hhw1vtu2tSRkfA770mb4gjlAUvx-PZ38ORYbrBNMTK0NZVZ4vKWLw-2Jr-tNZO0lJKRUSoh5HsMj3nBB2snSTcdfINc7rMAnnhI-f3eOsWUjanUbo3ek35eAUyMNR9vYaXHn7M_mZHMAyNWdTlYcyMJr6bMjZMACAqxaSOJSzRzENhVa2sPPoxN1uQu19Y7WbKSjNibdQBJoSH0sD5rP3vnMBOP_mUtTznIZ3rVAcg3TQ8BeJfW_ThgZ9YMUt0cZnM_qP2yMKlCUCOWFvr-1B60M9sqm01xTOQc4pT6GQAugMUBMR8mKas8MC8QiDNQjGScvY3We4FgXz2R3dY9-ral3ppbqfgfPqIwFDFww4xjkkMoS7FS6-ImcT_glfuXxX8_ihTCDphZkZp-tIRddze4kJ8Kw',
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
            url: 'http://dev.waseem-ecptech.wadic.net/api/editTax',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjJkNjMyYTEwZDE5YTllOTQyZWNlZjBjMjRlZmE5ZjBhZWUxZGY4ZmE2MDZkYjAwMDllNjc1MDEyOTgwMjI0MzAzYzNmNDhhMjU4OGY4MjciLCJpYXQiOjE2NjI0ODk3NjEuNjU0MzMyLCJuYmYiOjE2NjI0ODk3NjEuNjU0MzM2LCJleHAiOjE2OTQwMjU3NjEuNjQ5NjEzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.YtL0ZHDefL4TlllfUvbWG4BavLs9FCRiAQDzeDvjXw2sdcmLtK1WMRKzU5gaPi8bZHutmWXVJkdeGl79pNtphcmFEw20tSICTgZ4XQ2lkt5rU0PyG1PFbPOpOHsNU-rsI5VpyRFETKWphawT61eB_raDNYYYmu9uzMdxiJVmcbLqApUKU5F8TGlwUPazEsFQNkHPus9_lH02_t1n8IYHu4tnMrQxDQK7xi40bYcHEz2kmce1NUJp_3N5I-mCY7oOfIbkreURsv6NBt3Hhw1vtu2tSRkfA770mb4gjlAUvx-PZ38ORYbrBNMTK0NZVZ4vKWLw-2Jr-tNZO0lJKRUSoh5HsMj3nBB2snSTcdfINc7rMAnnhI-f3eOsWUjanUbo3ek35eAUyMNR9vYaXHn7M_mZHMAyNWdTlYcyMJr6bMjZMACAqxaSOJSzRzENhVa2sPPoxN1uQu19Y7WbKSjNibdQBJoSH0sD5rP3vnMBOP_mUtTznIZ3rVAcg3TQ8BeJfW_ThgZ9YMUt0cZnM_qP2yMKlCUCOWFvr-1B60M9sqm01xTOQc4pT6GQAugMUBMR8mKas8MC8QiDNQjGScvY3We4FgXz2R3dY9-ral3ppbqfgfPqIwFDFww4xjkkMoS7FS6-ImcT_glfuXxX8_ihTCDphZkZp-tIRddze4kJ8Kw',
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
            url: 'http://dev.waseem-ecptech.wadic.net/api/deleteTax',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjJkNjMyYTEwZDE5YTllOTQyZWNlZjBjMjRlZmE5ZjBhZWUxZGY4ZmE2MDZkYjAwMDllNjc1MDEyOTgwMjI0MzAzYzNmNDhhMjU4OGY4MjciLCJpYXQiOjE2NjI0ODk3NjEuNjU0MzMyLCJuYmYiOjE2NjI0ODk3NjEuNjU0MzM2LCJleHAiOjE2OTQwMjU3NjEuNjQ5NjEzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.YtL0ZHDefL4TlllfUvbWG4BavLs9FCRiAQDzeDvjXw2sdcmLtK1WMRKzU5gaPi8bZHutmWXVJkdeGl79pNtphcmFEw20tSICTgZ4XQ2lkt5rU0PyG1PFbPOpOHsNU-rsI5VpyRFETKWphawT61eB_raDNYYYmu9uzMdxiJVmcbLqApUKU5F8TGlwUPazEsFQNkHPus9_lH02_t1n8IYHu4tnMrQxDQK7xi40bYcHEz2kmce1NUJp_3N5I-mCY7oOfIbkreURsv6NBt3Hhw1vtu2tSRkfA770mb4gjlAUvx-PZ38ORYbrBNMTK0NZVZ4vKWLw-2Jr-tNZO0lJKRUSoh5HsMj3nBB2snSTcdfINc7rMAnnhI-f3eOsWUjanUbo3ek35eAUyMNR9vYaXHn7M_mZHMAyNWdTlYcyMJr6bMjZMACAqxaSOJSzRzENhVa2sPPoxN1uQu19Y7WbKSjNibdQBJoSH0sD5rP3vnMBOP_mUtTznIZ3rVAcg3TQ8BeJfW_ThgZ9YMUt0cZnM_qP2yMKlCUCOWFvr-1B60M9sqm01xTOQc4pT6GQAugMUBMR8mKas8MC8QiDNQjGScvY3We4FgXz2R3dY9-ral3ppbqfgfPqIwFDFww4xjkkMoS7FS6-ImcT_glfuXxX8_ihTCDphZkZp-tIRddze4kJ8Kw',
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
            url: 'http://dev.waseem-ecptech.wadic.net/api/getStates',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjJkNjMyYTEwZDE5YTllOTQyZWNlZjBjMjRlZmE5ZjBhZWUxZGY4ZmE2MDZkYjAwMDllNjc1MDEyOTgwMjI0MzAzYzNmNDhhMjU4OGY4MjciLCJpYXQiOjE2NjI0ODk3NjEuNjU0MzMyLCJuYmYiOjE2NjI0ODk3NjEuNjU0MzM2LCJleHAiOjE2OTQwMjU3NjEuNjQ5NjEzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.YtL0ZHDefL4TlllfUvbWG4BavLs9FCRiAQDzeDvjXw2sdcmLtK1WMRKzU5gaPi8bZHutmWXVJkdeGl79pNtphcmFEw20tSICTgZ4XQ2lkt5rU0PyG1PFbPOpOHsNU-rsI5VpyRFETKWphawT61eB_raDNYYYmu9uzMdxiJVmcbLqApUKU5F8TGlwUPazEsFQNkHPus9_lH02_t1n8IYHu4tnMrQxDQK7xi40bYcHEz2kmce1NUJp_3N5I-mCY7oOfIbkreURsv6NBt3Hhw1vtu2tSRkfA770mb4gjlAUvx-PZ38ORYbrBNMTK0NZVZ4vKWLw-2Jr-tNZO0lJKRUSoh5HsMj3nBB2snSTcdfINc7rMAnnhI-f3eOsWUjanUbo3ek35eAUyMNR9vYaXHn7M_mZHMAyNWdTlYcyMJr6bMjZMACAqxaSOJSzRzENhVa2sPPoxN1uQu19Y7WbKSjNibdQBJoSH0sD5rP3vnMBOP_mUtTznIZ3rVAcg3TQ8BeJfW_ThgZ9YMUt0cZnM_qP2yMKlCUCOWFvr-1B60M9sqm01xTOQc4pT6GQAugMUBMR8mKas8MC8QiDNQjGScvY3We4FgXz2R3dY9-ral3ppbqfgfPqIwFDFww4xjkkMoS7FS6-ImcT_glfuXxX8_ihTCDphZkZp-tIRddze4kJ8Kw',
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

        }
    }

    const handlUpdate = (value) => {
        setDiscountName(value.name)
        setDiscountTax(value.value)
        setEditId(value.id)
        addDiscount()
    }

    const handleDelete = (objectId, id) => {
        deleteDiscount(id)
        setDiscountArray([...discountArray].filter((discountobj) => {
            return discountobj.id !== objectId
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
        setShippingArray([...shippingArray, { id: Math.random(), shippingName: shippingName, shippingState: shippingState }])
    }

    const getDiscount = () => {
        var data = new FormData();

        var config = {
            method: 'get',
            url: 'http://dev.waseem-ecptech.wadic.net/api/getDiscount?userId=44',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjJkNjMyYTEwZDE5YTllOTQyZWNlZjBjMjRlZmE5ZjBhZWUxZGY4ZmE2MDZkYjAwMDllNjc1MDEyOTgwMjI0MzAzYzNmNDhhMjU4OGY4MjciLCJpYXQiOjE2NjI0ODk3NjEuNjU0MzMyLCJuYmYiOjE2NjI0ODk3NjEuNjU0MzM2LCJleHAiOjE2OTQwMjU3NjEuNjQ5NjEzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.YtL0ZHDefL4TlllfUvbWG4BavLs9FCRiAQDzeDvjXw2sdcmLtK1WMRKzU5gaPi8bZHutmWXVJkdeGl79pNtphcmFEw20tSICTgZ4XQ2lkt5rU0PyG1PFbPOpOHsNU-rsI5VpyRFETKWphawT61eB_raDNYYYmu9uzMdxiJVmcbLqApUKU5F8TGlwUPazEsFQNkHPus9_lH02_t1n8IYHu4tnMrQxDQK7xi40bYcHEz2kmce1NUJp_3N5I-mCY7oOfIbkreURsv6NBt3Hhw1vtu2tSRkfA770mb4gjlAUvx-PZ38ORYbrBNMTK0NZVZ4vKWLw-2Jr-tNZO0lJKRUSoh5HsMj3nBB2snSTcdfINc7rMAnnhI-f3eOsWUjanUbo3ek35eAUyMNR9vYaXHn7M_mZHMAyNWdTlYcyMJr6bMjZMACAqxaSOJSzRzENhVa2sPPoxN1uQu19Y7WbKSjNibdQBJoSH0sD5rP3vnMBOP_mUtTznIZ3rVAcg3TQ8BeJfW_ThgZ9YMUt0cZnM_qP2yMKlCUCOWFvr-1B60M9sqm01xTOQc4pT6GQAugMUBMR8mKas8MC8QiDNQjGScvY3We4FgXz2R3dY9-ral3ppbqfgfPqIwFDFww4xjkkMoS7FS6-ImcT_glfuXxX8_ihTCDphZkZp-tIRddze4kJ8Kw',
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
            url: 'http://dev.waseem-ecptech.wadic.net/api/getTaxes?userId=44',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjJkNjMyYTEwZDE5YTllOTQyZWNlZjBjMjRlZmE5ZjBhZWUxZGY4ZmE2MDZkYjAwMDllNjc1MDEyOTgwMjI0MzAzYzNmNDhhMjU4OGY4MjciLCJpYXQiOjE2NjI0ODk3NjEuNjU0MzMyLCJuYmYiOjE2NjI0ODk3NjEuNjU0MzM2LCJleHAiOjE2OTQwMjU3NjEuNjQ5NjEzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.YtL0ZHDefL4TlllfUvbWG4BavLs9FCRiAQDzeDvjXw2sdcmLtK1WMRKzU5gaPi8bZHutmWXVJkdeGl79pNtphcmFEw20tSICTgZ4XQ2lkt5rU0PyG1PFbPOpOHsNU-rsI5VpyRFETKWphawT61eB_raDNYYYmu9uzMdxiJVmcbLqApUKU5F8TGlwUPazEsFQNkHPus9_lH02_t1n8IYHu4tnMrQxDQK7xi40bYcHEz2kmce1NUJp_3N5I-mCY7oOfIbkreURsv6NBt3Hhw1vtu2tSRkfA770mb4gjlAUvx-PZ38ORYbrBNMTK0NZVZ4vKWLw-2Jr-tNZO0lJKRUSoh5HsMj3nBB2snSTcdfINc7rMAnnhI-f3eOsWUjanUbo3ek35eAUyMNR9vYaXHn7M_mZHMAyNWdTlYcyMJr6bMjZMACAqxaSOJSzRzENhVa2sPPoxN1uQu19Y7WbKSjNibdQBJoSH0sD5rP3vnMBOP_mUtTznIZ3rVAcg3TQ8BeJfW_ThgZ9YMUt0cZnM_qP2yMKlCUCOWFvr-1B60M9sqm01xTOQc4pT6GQAugMUBMR8mKas8MC8QiDNQjGScvY3We4FgXz2R3dY9-ral3ppbqfgfPqIwFDFww4xjkkMoS7FS6-ImcT_glfuXxX8_ihTCDphZkZp-tIRddze4kJ8Kw',
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
    const updateHandler=(obj)=>{
        console.log("obj",obj)
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
                                    <img style={{ width: '16px', height: '16px' }} src={cross} onClick={() => { handleDelete(discounts.id, ids) }} /></td>
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
                                <input type={'number'} placeholder='Colorado Custom' value={taxValue} onChange={(e) => { setTaxValue(e.target.value) }} />
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
                                    defaultValue="Select"
                                    style={{
                                        width: 120,
                                    }}
                                    value={stateSetting}
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
                            <div><button onClick={(e)=>{idState!==null ? handlUpdateTax(e) : handleTaxSubmit(e)}} className='save-button' type='submit' >Save</button></div>
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