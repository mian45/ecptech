import { DavisVisionJson } from "./plansJson/davisVision";
import { EyemedJson } from "./plansJson/eyemed";
import { VspAdvantageJson } from "./plansJson/vspAdvantage";
import { VspChoiceJson } from "./plansJson/vspChoice";
import { VspSignatureJson } from "./plansJson/vspSignature";
import { PrivatePayJson } from "./plansJson/privatePay";

export const benifitsOptions = () => {
    return { yes: "Yes", no: "Only multiple pair benefit only at this time" };
};
export const yesNoOptions = () => {
    return { yes: "Yes", no: "No" };
};

export const Plans = () => {
    return {
        en: {
            "VSP Signature": VspSignatureJson(),
            "VSP Choice": VspChoiceJson(),
            "VSP Advantage": VspAdvantageJson(),
            Eyemed: EyemedJson(),
            "Davis Vision": DavisVisionJson(),
            "Private Pay": PrivatePayJson(),
        },
    };
};
