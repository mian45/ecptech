import React , {useState} from "react";
import CalculatorScreen from "./components/calculatorPage";
import classes from "./styles.module.scss";
import { Col, Row } from "antd";
import CustomLoader from "../../components/customLoader";

const Calculator = () => {
    return (
        <Row className={classes["root-container"]}>
            <Col className={classes["container"]} xs={24}>
                <div className={classes["page-title"]}>Create Invoice</div>
                <CalculatorScreen/>
            </Col>
            
        </Row>
    );
};

export default Calculator;
