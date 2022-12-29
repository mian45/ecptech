import { Col } from "antd";
import React from "react";
import { CompareStrings } from "../../../../../../../utils/utils";
import { FramePriceSlot } from "../../frameDetails/frameDetails";
import {
    RenderChemistrieClipPrice,
    RenderEdgeCoatingPrice,
    RenderLensOptionsPrice,
    RenderOneYearWarrentyPrice,
    RenderOverSizeLensPrice,
    RenderScratchCoatingPrice,
} from "../lensPricesHelper";

const RenderSpectra = ({ receipt, calculatorObj, type }) => {
    if (receipt?.values?.visionPlan === "Spectra") {
        switch (type) {
            case "Chemistrie Clip":
                return (
                    <RenderChemistrieClip
                        receipt={receipt}
                        calculatorObj={calculatorObj}
                    />
                );
            case "Edge Coating":
                return (
                    <RenderEdgeCoating
                        receipt={receipt}
                        calculatorObj={calculatorObj}
                    />
                );
            case "Miscellaneous Lens Options":
                return (
                    <RenderLensOptions
                        receipt={receipt}
                        calculatorObj={calculatorObj}
                    />
                );
            case "One Year Scratch Warranty":
                return (
                    <RenderOnerYearWarrenty
                        receipt={receipt}
                        calculatorObj={calculatorObj}
                    />
                );
            case "Oversize Lenses":
                return (
                    <RenderOverSizeLenses
                        receipt={receipt}
                        calculatorObj={calculatorObj}
                    />
                );
            case "Scratch Coating":
                return (
                    <RenderScratchCoating
                        receipt={receipt}
                        calculatorObj={calculatorObj}
                    />
                );

            default:
                return <></>;
        }
    }
    return <></>;
};
export default RenderSpectra;

const RenderChemistrieClip = ({ receipt, calculatorObj }) => {
    return CompareStrings(receipt?.values?.chemistrieClip?.status, "Yes") &&
        receipt?.values?.chemistrieClip?.type > 0 ? (
        <Col xs={24}>
            <FramePriceSlot
                title={`Chemistrie Clip`}
                price={`$${
                    RenderChemistrieClipPrice(calculatorObj, receipt?.values) ||
                    0
                }`}
            />
        </Col>
    ) : (
        <></>
    );
};

const RenderEdgeCoating = ({ receipt, calculatorObj }) => {
    return CompareStrings(receipt?.values?.edgeCoating?.status, "Yes") &&
        receipt?.values?.edgeCoating?.type > 0 ? (
        <Col xs={24}>
            <FramePriceSlot
                title={`Edge Coating`}
                price={`$${
                    RenderEdgeCoatingPrice(calculatorObj, receipt?.values) || 0
                }`}
            />
        </Col>
    ) : (
        <></>
    );
};

const RenderLensOptions = ({ receipt, calculatorObj }) => {
    return CompareStrings(receipt?.values?.lensOptions?.status, "Yes") &&
        receipt?.values?.lensOptions?.type > 0 ? (
        <Col xs={24}>
            <FramePriceSlot
                title={`Miscellaneous Lens Options`}
                price={`$${
                    RenderLensOptionsPrice(calculatorObj, receipt?.values) || 0
                }`}
            />
        </Col>
    ) : (
        <></>
    );
};

const RenderOnerYearWarrenty = ({ receipt, calculatorObj }) => {
    return CompareStrings(receipt?.values?.scratchWarrenty?.status, "Yes") ? (
        <Col xs={24}>
            <FramePriceSlot
                title={`One Year Scratch Warranty`}
                price={`$${RenderOneYearWarrentyPrice(receipt?.values) || 0}`}
            />
        </Col>
    ) : (
        <></>
    );
};

const RenderOverSizeLenses = ({ receipt, calculatorObj }) => {
    return CompareStrings(receipt?.values?.overSizeLens?.status, "Yes") &&
        receipt?.values?.overSizeLens?.type > 0 ? (
        <Col xs={24}>
            <FramePriceSlot
                title={`Oversize Lenses`}
                price={`$${
                    RenderOverSizeLensPrice(calculatorObj, receipt?.values) || 0
                }`}
            />
        </Col>
    ) : (
        <></>
    );
};

const RenderScratchCoating = ({ receipt, calculatorObj }) => {
    return CompareStrings(receipt?.values?.scratchCoating?.status, "Yes") ? (
        <Col xs={24}>
            <FramePriceSlot
                title={`Scratch Coating`}
                price={`$${
                    RenderScratchCoatingPrice(calculatorObj, receipt?.values) ||
                    0
                }`}
            />
        </Col>
    ) : (
        <></>
    );
};
