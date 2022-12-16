import { Col, Collapse, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import PlanTitles from "../../../../data/plansTitles/planTitles";
import { RenderBlueLight } from "../../helpers/pricesHelper/calculateDavisPrice";
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
    RenderAdditionalLens,
} from "./lensPricesHelper";

const { Panel } = Collapse;

const LensesDetails = ({
    receipt,
    calculatorObj,
    lensPrices,
    davisMaterials,
    language,
}) => {
    const currentPlan = receipt?.values?.visionPlan;
    const { materialCopayTitle } = PlanTitles(
        language,
        receipt?.values?.visionPlan
    );

    const renderLensesCopay = () => {
        const price =
            calculateLensesCopaysFee(
                receipt?.values,
                calculatorObj,
                lensPrices,
                currentPlan === "Private Pay" ? true : false,
                davisMaterials
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
                            davisMaterials={davisMaterials}
                            materialCopayTitle={materialCopayTitle}
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
const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(LensesDetails);

const GetLensPriceByPlan = ({
    receipt,
    calculatorObj,
    lensPrices,
    davisMaterials,
    materialCopayTitle,
}) => {
    const photochromicPrice = RenderPhotochromicPrices(
        receipt?.values,
        calculatorObj
    );
    const copay = parseFloat(receipt?.values?.materialCopay || 0);
    const materialCopay = copay?.toFixed(2);
    const antiReflectivePrice = RenderAntireflectivePrices(
        receipt?.values,
        calculatorObj
    );
    return (
        <Row>
            {(materialCopay > 0 || materialCopay < 0) && (
                <Col xs={24}>
                    <FramePriceSlot
                        title={materialCopayTitle}
                        price={`$${materialCopay || 0}`}
                    />
                </Col>
            )}
            {receipt?.values?.isLensBenifit ===
                "Only multiple pair benefit only at this time" && (
                <Col xs={24} className={classes["self-pay"]}>
                    Estimates under Private Pay
                </Col>
            )}
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
                    } ( Lens Material: ${receipt?.values?.lensMaterial} )`}
                    price={`$${RenderLensMaterialPrice(
                        receipt?.values,
                        calculatorObj,
                        lensPrices,
                        davisMaterials
                    )}`}
                />
            </Col>

            {receipt?.values?.photochromics?.status === "Yes" && (
                <Col xs={24}>
                    <FramePriceSlot
                        title={`Photochromics: ${receipt?.values?.photochromics?.type}`}
                        price={`$${photochromicPrice || 0}`}
                    />
                </Col>
            )}
            {receipt?.values?.antiReflectiveProperties?.status === "Yes" && (
                <Col xs={24}>
                    <FramePriceSlot
                        title={`Anti-Reflective Properties: ${receipt?.values?.antiReflectiveProperties?.type}`}
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
            {(receipt?.values?.visionPlan === "Eyemed" ||
                receipt?.values?.visionPlan === "Davis Vision") &&
                receipt?.values?.slabOff?.status === "Yes" && (
                    <Col xs={24}>
                        <FramePriceSlot
                            title={`Slab Off`}
                            price={`$${
                                RenderAdditionalLens(
                                    receipt?.values,
                                    calculatorObj,
                                    "Slab off"
                                ) || 0
                            }`}
                        />
                    </Col>
                )}
            {(receipt?.values?.visionPlan === "Eyemed" ||
                receipt?.values?.visionPlan === "Davis Vision") &&
                receipt?.values?.specialtyLens?.status === "Yes" && (
                    <Col xs={24}>
                        <FramePriceSlot
                            title={`Specialty Lens`}
                            price={`$${
                                RenderAdditionalLens(
                                    receipt?.values,
                                    calculatorObj,
                                    "Speciality Lens"
                                ) || 0
                            }`}
                        />
                    </Col>
                )}
            {(receipt?.values?.visionPlan === "Eyemed" ||
                receipt?.values?.visionPlan === "Davis Vision") &&
                receipt?.values?.polish?.status === "Yes" &&
                receipt?.values?.polish?.type && (
                    <Col xs={24}>
                        <FramePriceSlot
                            title={`Polish: ${receipt?.values?.polish?.type}`}
                            price={`$${
                                RenderAdditionalLens(
                                    receipt?.values,
                                    calculatorObj,
                                    "Polish"
                                ) || 0
                            }`}
                        />
                    </Col>
                )}
            {receipt?.values?.visionPlan === "Davis Vision" &&
                receipt?.values?.blueLight === "Yes" && (
                    <Col xs={24}>
                        <FramePriceSlot
                            title={`Blue Light Filtering`}
                            price={`$${
                                RenderBlueLight(
                                    calculatorObj,
                                    receipt?.values
                                ) || 0
                            }`}
                        />
                    </Col>
                )}
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
