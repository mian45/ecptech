import dayjs from "dayjs";
import React , {useState} from "react";
import classes from "./styles.module.scss";
import Axios from "../../../../Http"
const AddCardModal = ({ show, onClose }) => {
    const [cardNumber,setCardNumber]=useState("")
    const [validNumber,setValidNumber]=useState(false)
    const [name,setName]=useState("");
    const [date,setDate]=useState("");
    const [cvc,setCvc]=useState("");
    const [validCvc,setValidCvc]=useState(false);
    const [checked,setChecked]=useState(false);
    const [nameValidation,setNameValidation]=useState(false);
    const [dateValidation,setDateValidation]=useState(false);

    function stripeCardNumberValidation(number) {
        const regexPattern = {
        MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
        VISA: /^4[0-9]{2,}$/,
        AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
        DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
        DINERS_CLUB: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
        JCB: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/
        };
        for (const card in regexPattern) {
        if (number.replace(/[^\d]/g, "").match(regexPattern[card])) {
        if (number) {
        return number &&
        /^[1-6]{1}[0-9]{14,15}$/i.test(
        number.replace(/[^\d]/g, "").trim()
        )
        ? setValidNumber(false)
        : setValidNumber(true);
        }
        }
        }
        setValidNumber(true)
        }
    const postCard=async ()=>{
        
        try {
            if(nameValidation){
                return 
            }else if(dateValidation){
                return 
            }
            else if(validCvc){
                return 
            }else if(validNumber){
                return
            }
            const data = new FormData();
                    data.append('card_no', cardNumber);
                    data.append('card_name', name);
                    data.append('card_expiry', date);
                    data.append('ccv', cvc);

      const res=  await Axios.post(
            `${process.env.MIX_REACT_APP_URL}/api/add-card`,
            data
        ); 
        onClose()
            console.log("the response is here",res)
        } catch (err) {
            console.log("Error while delete Staff", err);
        }
    }
    return (
        <>
            {show ? (
                <div className={classes["backdrop"]} onClick={onClose}>
                    <div
                        className={classes["container"]}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={classes["label"]}>
                            Enter your card details
                        </div>
                        <div className={classes["sub-label"]}>
                            By adding new card, your old card will be removed.
                        </div>
                        <div className={classes["input-label"]}>
                            Card Number
                        </div>
                        <input
                            placeholder="Enter Card Number"
                            className={classes["input"]}
                            type="number"
                            value={cardNumber}
                            onChange={(e)=>{setCardNumber(e.target.value)}}
                            onBlur={(e)=>{stripeCardNumberValidation(e.target.value)}}
                        />
                        {validNumber?<label className={classes["validation-error"]}>Please enter valid card number</label>:""}
                        <div className={classes["input-label"]}>
                            Card Holder Name
                        </div>
                        <input
                        value={name}
                            placeholder="Enter Card Holder Name"
                            className={classes["input"]}
                            onChange={(e)=>{setName(e.target.value)}}
                            onBlur={(e)=>{
                                if(name==""){
                                    setNameValidation(true)
                                }else{
                                    setNameValidation(false)
                                }
                            }}
                        />
                        {nameValidation?<label  className={classes["validation-error"]}>Name is required</label>:""}
                        <div className={classes["inline-input"]}>
                            <div className={classes["inline-left-input"]}>
                                <div className={classes["input-label"]}>
                                    Card Expiry
                                </div>
                                <input
                                    placeholder="MM/YY"
                                    min={new Date()}
                                    className={classes["input"]}
                                    data-date-format="mm/yy"
                                    onChange={(e)=>{setDate(dayjs(new Date(e.target.value)).format("MM/YY"))}}
                                    type={"month"}
                                    onBlur={(e)=>{
                                        if(date==""){
                                            setDateValidation(true)
                                        }else{
                                            setDateValidation(false)
                                        }
                                    }}
                                    
                                />
                                {dateValidation?<label  className={classes["validation-error"]}> Date is required</label>:""}
                            </div>
                            <div className={classes["inline-right-input"]}>
                                <div className={classes["input-label"]}>
                                    CCV
                                </div>
                                <input
                                    placeholder="CCV No."
                                    type={"number"}
                                    className={classes["input"]}
                                    value={cvc}
                                    onChange={(e)=>{setCvc(e.target.value)}}
                                    onBlur={(e)=>{if(cvc.length<3){
                                        setValidCvc(true)
                                    }else{setValidCvc(false)}}}
                                />
                                {validCvc?<label  className={classes["validation-error"]}>Please enter valid Cvc</label>:""}
                            </div>
                        </div>
                        <div className={classes["terms"]}>
                            <input
                                type={"checkbox"}
                                value={checked}
                                className={classes["checkbox"]}
                                onChange={(e)=>{setChecked(!checked)}}
                            />
                            
                            <div className={classes["term-line"]}>
                                By adding card you are agreed with us to charge
                                your card for subscription.
                            </div>
                        </div>
                        <button className={classes["button"]} onClick={()=>{postCard()}}>Add Card</button>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default AddCardModal;
