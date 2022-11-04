import React, { useState, useEffect } from "react";
import "../style.scss";
import Axios from "../../Http";
import { connect } from "react-redux";
import edit from "../../../images/edit.png";
import cross from "../../../images/cross.png";
import DeleteModal from "../../components/deleteModal/index"
const ShippingSettings = ({ userId }) => {
    const [shippingName, setShippingName] = useState("");
    const [shippingAmount, setShippingAmount] = useState("");
    const [shipping, setShipping] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showDeleteShipping,setShowDeleteShipping]=useState(false)
    const [deleteShippingId,setDeleteShippingId]=useState(0)
    useEffect(() => {
        const getShipping = async () => {
            try {
                const res = await Axios.get(
                    process.env.MIX_REACT_APP_URL + "/api/get-shipping",
                    { params: { userId: userId } }
                );
                const shippingData = res?.data?.data;
                setShipping({ ...shippingData });
            } catch (err) {
                console.log("error while get shipping");
            }
        };
        getShipping();
    }, []);

    const handleUpdateShipping = async (data) => {
        setShippingName(data?.name);
        setShippingAmount(data?.value);
        setIsSubmitted(false);
    };
    const deleteShipping=async(id)=>{
        try {
            await Axios.post(
                process.env.MIX_REACT_APP_URL + "/api/delete-shipping",
                { id: id }
            );
            setShipping({});
            setIsSubmitted(false);
            setShowDeleteShipping(false)
        } catch (err) {
            console.log("error while delete shipping");
        }
    }
    const handleDeleteShipping = async (id) => {
       setDeleteShippingId(id);
       setShowDeleteShipping(true)
    };
    const handleShippingSubmit = async (e) => {
        e?.preventDefault();

        try {
            const payload = {
                userId: userId,
                name: shippingName,
                value: shippingAmount,
            };
            const res = await Axios.post(
                process.env.MIX_REACT_APP_URL + "/api/add-shipping",
                payload
            );
            setShipping(res?.data?.data);
            setShippingName("");
            setShippingAmount("");
            setIsSubmitted(true);
        } catch (err) {
            console.log("error while adding shipping");
        }
    };

    return (
        <>
        {showDeleteShipping?
            <DeleteModal accept={()=>{
                deleteShipping(deleteShippingId);
    
            }}
            cancel={()=>{setShowDeleteShipping(false)}}/> :null}
            <div className="discount-container_first discount-tax-con">
            <p className="heading">Shipping</p>
            <div>
                <form className="discount-container_first-form">
                    <div className="discount-container_first-form_section">
                        <p className="input-title">Enter Label</p>
                        <input
                            placeholder="Enter Text"
                            value={shippingName}
                            onChange={(e) => {
                                setShippingName(e.target.value);
                            }}
                            disabled={isSubmitted}
                        />
                    </div>
                    <div className="discount-container_first-form_section">
                        <p className="input-title">Add Shipping Amount</p>
                        <input
                            placeholder="Enter Amount"
                            type={"number"}
                            min={0}
                            value={shippingAmount}
                            onChange={(e) => {
                                setShippingAmount(e.target.value);
                            }}
                            disabled={isSubmitted}
                        />
                    </div>
                    <div>
                        <button
                            onClick={handleShippingSubmit}
                            className={`save-button ${
                                !shippingName || !shippingAmount
                                    ? "disable"
                                    : ""
                            } `}
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
            <div className="discount-output">
                <table>
                    {Object.keys(shipping).length > 0 && (
                        <tr className="discount-output_head">
                            <th>Shipping Label</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    )}
                    {Object.keys(shipping).length > 0 && (
                        <tr className="discount-output_body">
                            <td>{shipping.name}</td>
                            <td>${shipping.value}</td>
                            <td className="shipping-custom-col-3">
                                <img
                                    style={{
                                        width: "18px",
                                        height: "18px",
                                        marginRight: "30px",
                                        cursor: "pointer",
                                    }}
                                    src={edit}
                                    onClick={() => {
                                        handleUpdateShipping(shipping);
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
                                        handleDeleteShipping(shipping.id);
                                    }}
                                />
                            </td>
                        </tr>
                    )}
                </table>
            </div>
        </div>
        </>
        
    );
};
const mapStateToProps = (state) => ({
    userId: state.Auth.user?.id,
    token: state.Auth.token,
});
export default connect(mapStateToProps)(ShippingSettings);
