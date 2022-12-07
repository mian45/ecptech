import React,{useEffect,useState} from "react";
import CardPayment from "./cardPayment";
import classes from "./styles.module.scss";
import { Col, Row,message } from 'antd';
import AddCardModal from "./cardPayment/components/AddCardModal";
import Axios from "../Http";
const Payments = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [showAddCard, setShowAddCard] = useState(false);
    const handleCloseModal = () => {
        setShowAddCard(false);
    };
    const [cardData, setCardData] = useState({});
    useEffect(() => {
        getPaymentMethod(false);
    }, []);
    const getPaymentMethod = async (isShow) => {
        try {
            const res = await Axios.get(
                `${process.env.MIX_REACT_APP_URL}/api/get-card`
            );
            setCardData(res.data.data);
            if (isShow) {
                messageApi.open({
                    type: "success",
                    content: res.data.message,
                    duration: 5,
                    className: 'custom-postion',
                });
            }
        } catch (err) {
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: 'custom-postion-error',
            });
        }
    };
    return (
        <>{contextHolder}
         {showAddCard && (
        <AddCardModal show={showAddCard} onClose={handleCloseModal} getPaymentMethod={getPaymentMethod} />
        )}
        <Row className={classes["root-container"]}>
            <Col className={classes["container"]}>
                <Col xs={24} className={classes["left-container"]}>
                    <CardPayment setShowAddCard={(e)=>{setShowAddCard(e)}} cardData={cardData}/>
                </Col>
                <Col className={classes["right-container"]}></Col>
            </Col>
        </Row>
        </>
    );
};

export default Payments;
