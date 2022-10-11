import React, { useState } from "react";
import classes from "./styles.module.scss";
import downIcon from "../../../../../../../images/down-arrow.png";
import blackArrowIcon from "../../../../../../../images/black-arrow.svg";

const LensesType = () => {
    const [isBrands, setIsBrands] = useState(false);

    const onLensTypeClick = () => {
        setIsBrands(true);
    };
    const onGoBackClick = () => {
        setIsBrands(false);
    };
    return (
        <div className={classes["container"]}>
            <div className={classes["left-container"]}>
                {isBrands ? (
                    <LensesTypeBrandsList onBackClick={onGoBackClick} />
                ) : (
                    <LensesTypeList onClick={onLensTypeClick} />
                )}
            </div>
            <div className={classes["right-container"]}>
                <CollectionSection />
            </div>
        </div>
    );
};

export default LensesType;

const CollectionSection = () => {
    return <div className={classes["collection-container"]}></div>;
};

const LensesTypeList = ({ onClick }) => {
    return (
        <div className={classes["lenses-list-container"]}>
            <div className={classes["lenses-list-title"]}>Lens Types</div>
            <LensLabelSlot title={"Single Vision"} onClick={onClick} />
            <LensLabelSlot title={"PAL"} onClick={onClick} />
            <LensLabelSlot title={"NVF"} onClick={onClick} />
            <LensLabelSlot title={"Bifocal / Trifocal"} onClick={onClick} />
        </div>
    );
};

const LensesTypeBrandsList = ({ onBackClick }) => {
    return (
        <div className={classes["lenses-list-container"]}>
            <div className={classes["lenses-list-back"]} onClick={onBackClick}>
                <img
                    src={blackArrowIcon}
                    alt={"icon"}
                    className={classes["black-icon"]}
                />
                <div className={classes["lenses-list-brand-title"]}>Brands</div>
            </div>
            <LensLabelSlot title={"Shamir"} />
            <LensLabelSlot title={"Essilor"} />
            <LensLabelSlot title={"Hoya"} />
            <LensLabelSlot title={"Signet Armorlite"} />
            <LensLabelSlot title={"Maui Jim"} />
        </div>
    );
};

const LensLabelSlot = ({ title, onClick }) => {
    const [isHover, setIsHover] = useState(false);
    return (
        <div
            className={`${classes["lenses-label-slot-container"]} ${
                isHover && classes["slot-color"]
            }`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={onClick}
        >
            <div className={classes["lenses-label-slot-title"]}>{title}</div>
            {isHover && (
                <img
                    src={downIcon}
                    alt={"icon"}
                    className={classes["lenses-label-slot-icon"]}
                />
            )}
        </div>
    );
};
