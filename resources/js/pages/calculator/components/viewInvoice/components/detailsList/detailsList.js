import { Col } from "antd";
import React from "react";
import {
    getPrivatePayAntireflective,
    getPrivatePayGlasses,
    getPrivatePayLensPices,
    getPrivatePayMaterialPices,
    getPrivatePayPhotochromic,
    InvoiceBoldSlot,
    InvoiceSlot,
} from "../..";
import {
    calculateLensesCopaysFee,
    GetFrameFee,
    GetFrameRetailFee,
} from "../../helpers/pricesHelper/calculateOtherPlansPrices";
import {
    CalculateTotalPrice,
    CalculateWithTaxesTotalPrice,
    GetAppliedDiscount,
} from "../../helpers/pricesHelper/calculateTotalPrice";
import classes from "./style.module.scss";

const DetailsList = ({
    receipt,
    calculatorObj,
    lensPrices,
    totalPrice,
    withoutTaxPrice,
}) => {
    const getLensRetailFee = () => {
        let price = 0;
        price =
            price +
            parseFloat(
                getPrivatePayLensPices(calculatorObj, receipt, lensPrices)
            );
        price =
            price +
            parseFloat(
                getPrivatePayMaterialPices(calculatorObj, receipt, lensPrices)
            );
        if (receipt?.values?.photochromics?.status === "Yes") {
            price =
                price +
                parseFloat(
                    getPrivatePayPhotochromic(
                        receipt?.values?.photochromics?.type,
                        calculatorObj
                    )
                );
        } else {
            price = price + 0;
        }

        if (receipt?.values?.antiReflectiveProperties?.status === "Yes") {
            const total = getPrivatePayAntireflective(
                receipt?.values?.antiReflectiveProperties?.type,
                calculatorObj
            );
            price = price + (total || 0);
        } else {
            price = price + 0;
        }
        price = price + getPrivatePayGlasses(receipt, calculatorObj);

        return (price || 0).toFixed(2);
    };

    const currentPlan = receipt?.values?.visionPlan;

    const getTax = () => {
        let totalTax = 0;
        calculatorObj?.tax?.forEach((element) => {
            if (element?.status === "active") {
                totalTax = totalTax + parseFloat(element?.value || 0);
            }
        });
        const totalPrice = CalculateTotalPrice(
            receipt?.values,
            calculatorObj,
            lensPrices
        );
        const taxValue = totalPrice * (totalTax || 0);
        return taxValue / 100;
    };
    const glassesCost = () => {
        let total = 0;
        if (receipt?.values?.frameOrder?.type === "New Frame Purchase") {
            total =
                total + parseFloat(receipt?.values?.frameOrder?.retailFee || 0);
        }
        total =
            total +
            parseFloat(GetFrameRetailFee(calculatorObj, receipt?.values) || 0);
        return total;
    };

    return (
        <Col className={classes["container"]}>
            <InvoiceSlot
                title={"Frame:"}
                subTitle={`$${
                    GetFrameFee(
                        receipt?.values,
                        currentPlan === "Private Pay" ? true : false
                    ) || 0
                }`}
            />
            <InvoiceSlot
                title={"Lenses/Copays:"}
                subTitle={`$${
                    calculateLensesCopaysFee(
                        receipt?.values,
                        calculatorObj,
                        lensPrices,
                        currentPlan === "Private Pay" ? true : false
                    ) || 0
                }`}
            />
            {getSelectionDetails(receipt)?.map((item, index) => {
                return (
                    <div key={index} className={classes["description"]}>
                        {item}
                    </div>
                );
            })}
            {receipt?.values?.shipping?.status === "Yes" && (
                <InvoiceSlot
                    title={"Shipping:"}
                    subTitle={`$${
                        parseFloat(calculatorObj?.shipping || 0) || 0
                    }`}
                />
            )}
            <InvoiceSlot title={"Tax:"} subTitle={`$${getTax() || 0}`} />
            <InvoiceSlot
                title={"Discount:"}
                subTitle={`$${(
                    GetAppliedDiscount(
                        CalculateTotalPrice(
                            receipt?.values,
                            calculatorObj,
                            lensPrices
                        ),
                        receipt?.values
                    ) || 0
                )?.toFixed(2)}`}
            />
            <InvoiceBoldSlot
                title={"Your glasses would have cost:"}
                subTitle={`$${glassesCost()}`}
            />
            <InvoiceBoldSlot
                title={"Your cost with insurance:"}
                subTitle={`$${(
                    CalculateWithTaxesTotalPrice(
                        receipt?.values,
                        calculatorObj,
                        lensPrices
                    ) || 0
                ).toFixed(2)}`}
            />
        </Col>
    );
};
export default DetailsList;
const getSelectionDetails = (receipt) => {
    const result = [];
    //materials
    const lensMaterial = receipt?.values?.lensMaterial;

    if (lensMaterial === "Polycarbonate") {
        result.push(
            "Polycarbonate lenses are thinner, lighter weight, and impact resistant space-age lenses."
        );
    }

    if (lensMaterial === "Hi Index 1.67") {
        result.push(
            "1.67 high index lens material makes your lenses thinner and lighter in weight. These lenses can be up to 50% thinner than traditional plastic lenses."
        );
    }
    if (lensMaterial === "Hi index 1.70 and above") {
        result.push(
            "1.74 High Index Lenses are the thinnest, lightest-weight lenses on the market today. Depending on your prescription a 1.74 High Index Lens can be more than 50% thinner than traditional plastic lenses."
        );
    }
    //lenses
    const lensType = receipt?.values?.lensType?.type;
    if (lensType === "Single Vision") {
        result.push("Single Vision");
    }
    if (lensType === "PAL") {
        result.push(
            "Progressive lenses (no-line bifocals) provide precise vision at all ranges of distance, intermediate and near."
        );
    }

    if (lensType === "Bifocal") {
        result.push(
            "Bifocal lenses will have a line and focus distant images in the top half of the glasses and focus near images in the bottom half of the glasses."
        );
    }
    if (lensType === "Trifocal") {
        result.push(
            "Bifocal lenses will have a line and focus distant images in the top half of the glasses and focus near images in the bottom half of the glasses."
        );
    }
    //Antireflective
    const antireflective = receipt?.values?.antiReflectiveProperties?.type;
    if (antireflective === "Crizal Sapphire 360 UV") {
        result.push(
            "Viso Pro is the most sophisticated no-glare technology on the market today. It allows for superior cleaning, resists smudges, and provides superior no-glare protection."
        );
    }
    if (antireflective === "Crizal Avance UV") {
        result.push(
            "Viso XC+UV no-glare technology provides dust and dirt repellence for clearer vision and less cleaning. They reduce glare, resist scratching, repel water, resist smudges and provide UV protection."
        );
    }
    if (antireflective === "Crizal Easy UV") {
        result.push(
            "Crizal Easy no-glare technology makes your lenses easier to clean than ordinary lenses. They reduce glare, resist scratching, repel water, resist smudges and provide UV protection."
        );
    }
    //photochromic
    const photochromic = receipt?.values?.photochromics?.type;
    if (photochromic === "Transition Signature") {
        result.push(
            "The newest generation of transitions lenses darken well in UV light and lighten completely indoors. Transitions options come in grey, brown, or green."
        );
    }
    if (photochromic === "Transition XTRActive") {
        result.push(
            "Transitions XTRA Active darken more than any other Transitions lens. They always has a slight tint indoors and darken slightly behind a windshield."
        );
    }
    //sunglasses
    if (receipt?.values?.sunGlassesLens?.lensType === "Polarized") {
        result.push(
            "Polarized lenses are top-of-the line sunglasses that remove glare and light from reflected surfaces. Polarization is an excellent option for driving and outdoor use."
        );
    }
    if (receipt?.values?.sunGlassesLens?.lensType === "Tint") {
        result.push(
            "Tinted lenses provide relief from light sensitivity and come in a variety of colors and darkness levels"
        );
    }
    if (receipt?.values?.sunGlassesLens?.mirrorCoating === "Yes") {
        result.push(
            "Mirrored sunglasses have a reflective optical coating on the outside of the lenses to make them appear like small mirrors. They come in a variety of colors and can add a flashy appearance to your sunglasses."
        );
    }
    return result;
};
