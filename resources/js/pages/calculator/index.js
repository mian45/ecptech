import React , {useState} from "react";
import CalculatorScreen from "./components/calculatorPage";
import classes from "./styles.module.scss";
import { Col, Row } from "antd";
import CustomLoader from "../../components/customLoader";

const Calculator = () => {
    const [loading, setLoading] = useState(false)
    return (
        <Row className={classes["root-container"]}>
            {
                loading == true ?
                <CustomLoader buttonBool={false}/> : 
            <Col className={classes["container"]} xs={24}>
                <div className={classes["page-title"]}>Create Invoice</div>
                <CalculatorScreen setLoading={setLoading} loading={loading} />
            </Col>
            }
        </Row>
    );
};

export default Calculator;
