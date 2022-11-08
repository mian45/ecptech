import React, { useEffect, useState } from "react";
import "./style.scss";
import { connect } from "react-redux";

import edit from "../../images/edit.png";
import cross from "../../images/cross.png";
import ShippingSettings from "./shipping";
import { Select } from "antd";
import axios from "axios";
const { Option } = Select;
import { Switch } from "antd";
import CustomLoader from "../components/customLoader";
import DeleteModal from "../components/deleteModal/index"
const label = { inputProps: { "aria-label": "Switch demo" } };
const DiscountTaxes = (props) => {
    const [discountName, setDiscountName] = useState("");
    const [discountTax, setDiscountTax] = useState("");
    const [discountId, setDiscountId] = useState(null);
    const [discountArray, setDiscountArray] = useState([]);
    let [discounts, setDiscounts] = useState([]);
    const token = localStorage.getItem("access_token");

    const [taxName, setTaxName] = useState("Sales Tax");
    const [stateSetting, setStateSetting] = useState("");
    const [taxValue, setTaxValue] = useState("");
    let [tax, setTaxes] = useState([]);
    const [taxState, setTaxState] = useState([]);
    const [idState, setIdState] = useState(null);

    const [shippingName, setShippingName] = useState("");
    const [shippingState, setShippingState] = useState("");
    const [shippingArray, setShippingArray] = useState([]);
    let [shipping, setShipping] = useState();
    
    const [showDeleteTaxes,setShowDeleteTaxes]=useState(false)
    const [deleteTaxesId,setDeleteTaxesId]=useState(0)
    const [showDeleteDiscount,setShowDeleteDiscount]=useState(false)
    const [deleteDiscountId,setDeleteDiscountId]=useState(0)

    const [editId, setEditId] = useState("");
    const [loading , setLoading] = useState(false)
    const [discountButtonLoader , setDiscountButtonLoader] = useState(false)
    const [taxButtonLoader , setTaxButtonLoader] = useState(false)
    

    useEffect(() => {
        getState();
        getDiscount();
        getTaxes();
        getShipping();
    }, []);

    const addDiscount = () => {
        setDiscountButtonLoader(true);
        let data = new FormData();
        data.append("userId", props.userID);
        data.append("name", discountName);
        data.append("value", new Number(discountTax));
        let config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/add-discount`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setDiscountId(null);
                setDiscountName("");
                setDiscountTax("");
                getDiscount();
                setDiscountButtonLoaderButtonLoader(false)
            })
            .catch(function (error) {
                setDiscountButtonLoaderButtonLoader(true);
                console.log(error);
            });
    };

    const deleteDiscount = (id) => {
        let data = new FormData();
        data.append("id", id);

        let config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/delete-discount`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                getDiscount();
                setShowDeleteDiscount(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const addTax = () => {
        setTaxButtonLoader(true)
        let data = new FormData();
        data.append("userId", props.userID);
        data.append("stateId", stateSetting);
        data.append("name", taxName);
        data.append("value", taxValue);

        let config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/add-tax`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                setTaxName("");
                setTaxValue("");
                setIdState(null);
                getTaxes();
                setTaxButtonLoader(false)
            })
            .catch(function (error) {
                console.log(error);
                setTaxButtonLoader(false)
            });
    };

    const editTax = (values) => {
        setTaxButtonLoaderButtonLoader(true)
        let data = new FormData();
        data.append("id", idState);
        data.append("stateId", stateSetting);
        data.append("name", taxName);
        data.append("value", taxValue);

        let config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/edit-tax`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                getTaxes();
                setTaxName("");
                setStateSetting("");
                setTaxValue("");
                setIdState(null);
                setTaxButtonLoader(false)
            })
            .catch(function (error) {
                console.log(error);
                setTaxButtonLoader(false)
            });
    };

    const deleteTax = (tid) => {
        let data = new FormData();
        data.append("id", tid);

        let config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/delete-tax`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                setShowDeleteTaxes(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const addShipping = () => {
        let data = new FormData();
        data.append("userId", props.userID);
        data.append("name", shipping.name);
        data.append("value", shipping.value);

        let config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/add-shipping`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {})
            .catch(function (error) {
                console.log(error);
            });
    };

    const deleteShipping = (id) => {
        let data = new FormData();
        data.append("id", id);

        let config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/delete-shipping`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {})
            .catch(function (error) {
                console.log(error);
            });
    };

    const getState = () => {
        let data = new FormData();
        let config = {
            method: "get",
            url: `${process.env.MIX_REACT_APP_URL}/api/get-states`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                setTaxState(response.data.data);
                setStateSetting(response.data.data[0].id)
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const updateDiscount = () => {
        setButtonLoader(true)
        var data = new FormData();
        data.append("id", discountId);
        data.append("name", discountName);
        data.append("value", new Number(discountTax));
        var config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/edit-discount`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                setEditId(null);
                setDiscountName("");
                setDiscountTax("");
                setDiscountId(null);
                getDiscount();
                setButtonLoader(false)
            })
            .catch(function (error) {
                console.log(error);
                setButtonLoader(false)
            });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (discountId !== null) {
            updateDiscount();
        } else {
            addDiscount();
        }
    };

    const handlUpdate = (value) => {
        setDiscountName(value.name);
        setDiscountTax(value.value);
        setDiscountId(value.id);
    };

    const handleDelete = (id) => {
        setDeleteDiscountId(id)
        setShowDeleteDiscount(true)
    };

    const handleTaxSubmit = (e) => {
        e.preventDefault();

        addTax();
        setTaxes([
            ...tax,
            { name: taxName, state_id: stateSetting, value: taxValue },
        ]);
    };

    const handlUpdateTax = (e) => {
        e.preventDefault();
        editTax();
    };

    const handleDeleteTax = (id) => {
        setDeleteTaxesId(id)
        setShowDeleteTaxes(true);
       
    };
    const handleShippingSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            shipping.name = shippingName;
            shipping.value = shippingState;
            setShipping(shipping);
            setEditId("");
            setShippingName("");
            setShippingState("");
            addShipping();
        } else {
            setShipping({ name: shippingName, value: shippingState });
            addShipping();
        }
    };

    const handlUpdateShipping = (value) => {
        setShippingName(value.name);
        setShippingState(value.value);
        setEditId(value.id);
        addShipping();
    };

    const handleDeleteShipping = (id) => {
        // deleteShipping(id);
        setShippingArray(
            [...shippingArray].filter((discountobj) => {
                return discountobj.id !== id;
            })
        );
    };

    const getDiscount = () => {
        setLoading(true)
        let data = new FormData();

        let config = {
            method: "get",
            url: `${process.env.MIX_REACT_APP_URL}/api/get-discount?userId=${props.userID}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                setDiscounts(response.data.data);
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
            });
    };

    const getTaxes = () => {
        setLoading(true)
        let data = new FormData();

        let config = {
            method: "get",
            url: `${process.env.MIX_REACT_APP_URL}/api/get-taxes?userId=${props.userID}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                let taxes = response.data.data;
                setTaxes(taxes);
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
            });
    };

    const getShipping = () => {
        setLoading(true)
        let data = new FormData();

        let config = {
            method: "get",
            url: `${process.env.MIX_REACT_APP_URL}/api/get-shipping?userId=${props.userID}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                let shippingTax = response.data.data;
                setShipping(shippingTax);
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
            });
    };

    const updateHandler = (obj) => {
        setIdState(obj.id);
        setTaxName(obj.name);
        setStateSetting(obj.state.id);
        setTaxValue(obj.value);
    };
    const onChangeDiscountActive = (e, disc, index) => {
        let data = new FormData();
        data.append("discount_id", disc.id);
        data.append("status", e ? "active" : "inactive");
        let config = {
            method: "post",
            url: `${process.env.MIX_REACT_APP_URL}/api/discount-status`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                getDiscount();
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
            
                loading == true ?
                <CustomLoader buttonBool={false}  />:
        <> 
            {showDeleteTaxes?
            <DeleteModal accept={()=>{
                deleteTax(deleteTaxesId);
                setTaxes(
                    [...tax].filter((taxObj) => {
                        return taxObj.id !== deleteTaxesId;
                    })
                );
            }}
            open={showDeleteTaxes}
            cancel={()=>{setShowDeleteTaxes(false)}}/> :null}
            {showDeleteDiscount?
            <DeleteModal accept={()=>{
                deleteDiscount(deleteDiscountId);
            }}
            cancel={()=>{setShowDeleteDiscount(false)}}
            open={showDeleteDiscount}
            /> :null}
              <div className="discount-container discount-tax">
            <p className="main discount-container-page-title">{`Discounts & Taxes`}</p>
            <div className="discount-container_first discount-tax-con">
                <p className="heading">Discounts</p>
                <div>
                    <form className="discount-container_first-form">
                        <div className="discount-container_first-form_section">
                            <p className="input-title">Discount Name</p>
                            <input
                                placeholder="Discount Name"
                                value={discountName}
                                onChange={(e) => {
                                    setDiscountName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="discount-container_first-form_section">
                            <p className="input-title">
                                Discount Value (Percentage)
                            </p>
                            <input
                                type={"text"}
                                placeholder="Discount Value"
                                value={`${discountTax}`}
                                onChange={(e) => {
                                    const regix = new RegExp(
                                        "^[0-9]*[/.]?([0-9]*)?$"
                                    );

                                    if (regix.test(e.target.value)) {
                                        if (
                                            e.target.value <= 100 &&
                                            e.target.value >= 0
                                        ) {
                                            setDiscountTax(e.target.value);
                                        } else if (!e.target.value) {
                                            setDiscountTax("");
                                        }
                                    } else if (!e.target.value) {
                                        setDiscountTax("");
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <button
                                onClick={handleSubmit}
                                className={`save-button ${
                                    !discountName || !discountTax
                                        ? "disable"
                                        : ""
                                } `}
                                type="submit"
                            >
                                {
                                    discountButtonLoader == true ? 
                                    <>
                                    <p>Add</p> 
                                    <CustomLoader buttonBool={true}/>
                                    </> :
                                    'Add'
                                }
                            </button>
                        </div>
                    </form>
                </div>
                <div className="discount-output">
                    <table className="table-color">
                        {discounts && (
                            <tr className="discount-output_head">
                                <th>Discount Name</th>
                                <th>Discount Value</th>
                                <th></th>
                            </tr>
                        )}
                        {discounts.length > 0 &&
                            discounts.map((dis, index) => {
                                return (
                                    <tr className="discount-output_body discount-row">
                                        <td className="row-1">{dis.name}</td>
                                        <td>{dis.value} %</td>
                                        <td className="discount-col-3">
                                            <img
                                                style={{
                                                    width: "18px",
                                                    height: "18px",
                                                    marginRight: "30px",
                                                    cursor: "pointer",
                                                }}
                                                src={edit}
                                                onClick={() => {
                                                    handlUpdate(dis);
                                                }}
                                            />
                                            <img
                                                style={{
                                                    width: "16px",
                                                    height: "16px",
                                                    cursor: "pointer",
                                                }}
                                                src={cross}
                                                onClick={() => {
                                                    handleDelete(dis.id);
                                                }}
                                            />
                                            <Switch
                                                {...label}
                                               className="switch-margin"
                                                checked={
                                                    dis?.status == "active"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) => {
                                                    onChangeDiscountActive(
                                                        e,
                                                        dis,
                                                        index
                                                    );
                                                }}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                    </table>
                </div>
            </div>
            <div className="discount-container_first discount-tax-con">
                <p className="heading">Taxes</p>
                <div className="sections">
                    <form
                        className="discount-container_second-form"
                        onSubmit={handleTaxSubmit}
                    >
                        <div>

                        </div>
                        <div className="second-section">
                            <div className="discount-container_second-form_section">
                                <p className="input-title">Tax Name</p>
                                <input
                                    placeholder="Enter Tax Name"
                                    value={taxName}
                                    onChange={(e) => {
                                        setTaxName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="discount-container_second-form_section">
                                <p className="input-title">Tax Value (Percentage)</p>
                                <input
                                    type={"number"}
                                    min={0}
                                    placeholder="Add Percentage"
                                    value={taxValue}

                                    onChange={(e) => {
                                        const regix = new RegExp(
                                            "^[0-9]*[/.]?([0-9]*)?$"
                                        );

                                        if (regix.test(e.target.value)) {
                                            if (
                                                e.target.value <= 100 &&
                                                e.target.value >= 0
                                            ) {
                                                setTaxValue(e.target.value);
                                            } else if (!e.target.value) {
                                                setTaxValue("");
                                            }
                                        } else if (!e.target.value) {
                                            setTaxValue("");
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <button
                                    onClick={(e) => {
                                        idState !== null
                                            ? handlUpdateTax(e)
                                            : handleTaxSubmit(e);
                                    }}
                                    className={`save-button ${
                                        !taxName  || !taxValue
                                            ? "disable"
                                            : ""
                                    } `}
                                    type="submit"
                                >
                                    {
                                    taxButtonLoader == true ? 
                                    <>
                                    <p>Add</p> 
                                    <CustomLoader buttonBool={true}/>
                                    </>  :
                                    'Add'
                                }
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="discount-output">
                    <table className="table-color">
                        {tax?.length > 0 && (
                            <tr className="discount-output_head">
                                <th>Tax Name</th>
                                <th>Tax Value</th>
                                <th></th>
                            </tr>
                        )}
                        {tax?.length > 0 &&
                            tax?.map((obj) => {
                                return (
                                    <tr className="discount-output_body discount-row">
                                        <td className="row-1">{obj.name}</td>
                                        <td>{obj.value}%</td>
                                        <td className="col-4 custom-tax-col-3">
                                            <img
                                                style={{
                                                    width: "18px",
                                                    height: "18px",
                                                    marginRight: "30px",
                                                    cursor: "pointer",
                                                }}
                                                src={edit}
                                                onClick={() => {
                                                    updateHandler(obj);
                                                }}
                                            />
                                            <img
                                                style={{
                                                    width: "16px",
                                                    height: "16px",
                                                    cursor: "pointer",
                                                }}
                                                src={cross}
                                                onClick={() => {
                                                    handleDeleteTax(obj.id);
                                                }}
                                            />
                                            <Switch
                                                {...label}
                                                className="switch-margin"
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                    </table>
                </div>
            </div>
            <ShippingSettings />
        </div></>
      
    );
};

const mapStateToProps = (state) => ({
    userID: state.Auth.user?.id,
    token: state.Auth.token,
});
export default connect(mapStateToProps)(DiscountTaxes);
