import { Col, Collapse, Row } from "antd";
import React from "react";
import { calculateLensesCopaysFee } from "../../helpers/pricesHelper/calculateOtherPlansPrices";
import { GetSelectionDetails } from "../../helpers/selectedMenuList";
import {
    FramePriceSlot,
    RenderMinusIcon,
    RenderPlusIcon,
} from "../frameDetails/frameDetails";
import classes from "./lensesDetails.module.scss";
import {
    RenderAntireflectivePrices,
    RenderBasePrice,
    RenderCoatingFee,
    RenderLensMaterialPrice,
    RenderPhotochromicPrices,
    RenderPolarizedFee,
    RenderTintFee,
} from "./lensPricesHelper";

const { Panel } = Collapse;

const LensesDetails = ({ receipt, calculatorObj, lensPrices }) => {
    const currentPlan = receipt?.values?.visionPlan;

    const renderLensesCopay = () => {
        const price =
            calculateLensesCopaysFee(
                receipt?.values,
                calculatorObj,
                lensPrices,
                currentPlan === "Private Pay" ? true : false
            ) || 0;
        return (price || 0).toFixed(2);
    };
    return (
        <Row>
            <Col xs={24}>
                <Collapse
                    bordered={false}
                    expandIcon={({ isActive }) =>
                        isActive ? <RenderMinusIcon /> : <RenderPlusIcon />
                    }
                >
                    <Panel
                        header="Lenses"
                        key="1"
                        className={classes["panel"]}
                        extra={`$${renderLensesCopay()}`}
                    >
                        <GetLensPriceByPlan
                            receipt={receipt}
                            calculatorObj={calculatorObj}
                            lensPrices={lensPrices}
                        />
                    </Panel>
                </Collapse>
                <Row className={classes["description-container"]}>
                    {GetSelectionDetails(receipt)?.map((item, index) => {
                        return (
                            <Col
                                xs={24}
                                key={index}
                                className={classes["description"]}
                            >
                                {item}
                            </Col>
                        );
                    })}
                </Row>
            </Col>
        </Row>
    );
};
export default LensesDetails;

const GetLensPriceByPlan = ({ receipt, calculatorObj, lensPrices }) => {
    const photochromicPrice = RenderPhotochromicPrices(
        receipt?.values,
        calculatorObj
    );
    const materialCopay = (receipt?.values?.materialCopay || 0).toFixed(2);
    const antiReflectivePrice = RenderAntireflectivePrices(
        receipt?.values,
        calculatorObj
    );
    return (
        <Row>
            <Col xs={24}>
                <FramePriceSlot
                    title={`${
                        receipt?.values?.lensType?.brand || ""
                    } ( Base fee )`}
                    price={`$${RenderBasePrice(
                        receipt?.values,
                        calculatorObj,
                        lensPrices
                    )}`}
                />
            </Col>
            <Col xs={24}>
                <FramePriceSlot
                    title={`${
                        receipt?.values?.lensType?.brand || ""
                    } ( Lens Material ${receipt?.values?.lensMaterial} )`}
                    price={`$${RenderLensMaterialPrice(
                        receipt?.values,
                        calculatorObj,
                        lensPrices
                    )}`}
                />
            </Col>
            {(materialCopay > 0 || materialCopay < 0) && (
                <Col xs={24}>
                    <FramePriceSlot
                        title={"Material Copay"}
                        price={`$${materialCopay || 0}`}
                    />
                </Col>
            )}
            {receipt?.values?.photochromics?.status === "Yes" && (
                <Col xs={24}>
                    <FramePriceSlot
                        title={`Photochromic Option: ${receipt?.values?.photochromics?.type}`}
                        price={`$${photochromicPrice || 0}`}
                    />
                </Col>
            )}
            {receipt?.values?.antiReflectiveProperties?.status === "Yes" && (
                <Col xs={24}>
                    <FramePriceSlot
                        title={`Antireflective Properties: ${receipt?.values?.antiReflectiveProperties?.type}`}
                        price={`$${antiReflectivePrice || 0}`}
                    />
                </Col>
            )}
            <RenderPolirized calculatorObj={calculatorObj} receipt={receipt} />
            <RenderTint calculatorObj={calculatorObj} receipt={receipt} />
            <RenderMirrorCoating
                calculatorObj={calculatorObj}
                receipt={receipt}
            />
        </Row>
    );
};

const RenderPolirized = ({ receipt, calculatorObj }) => {
    const polarizedFee = RenderPolarizedFee(receipt?.values, calculatorObj);

    if (
        receipt?.values?.sunGlassesLens?.status === "Yes" &&
        receipt?.values?.sunGlassesLens?.lensType === "Polarized"
    )
        return (
            <Col xs={24}>
                <FramePriceSlot
                    title={`Polarized Fee`}
                    price={`$${polarizedFee || 0}`}
                />
            </Col>
        );
    return <></>;
};

const RenderTint = ({ receipt, calculatorObj }) => {
    const TintFee = RenderTintFee(receipt?.values, calculatorObj);

    if (
        receipt?.values?.sunGlassesLens?.status === "Yes" &&
        receipt?.values?.sunGlassesLens?.lensType === "Tint"
    )
        return (
            <Col xs={24}>
                <FramePriceSlot title={`Tint Fee`} price={`$${TintFee || 0}`} />
            </Col>
        );
    return <></>;
};

const RenderMirrorCoating = ({ receipt, calculatorObj }) => {
    const coatingFee = RenderCoatingFee(receipt?.values, calculatorObj);

    if (
        receipt?.values?.sunGlassesLens?.status === "Yes" &&
        receipt?.values?.sunGlassesLens?.mirrorCoating === "Yes"
    )
        return (
            <Col xs={24}>
                <FramePriceSlot
                    title={`Mirror Coating: ${receipt?.values?.sunGlassesLens?.coatingType}`}
                    price={`$${coatingFee || 0}`}
                />
            </Col>
        );
    return <></>;
};
