import React, { useState } from "react";
import classes from "./styles.module.scss";
import downIcon from "../../../../../../../images/down-arrow.png";
import blackArrowIcon from "../../../../../../../images/black-arrow.svg";
import CustomCheckbox from "../../../../../../components/customCheckbox";
import editIcon from "../../../../../../../images/edit.png";
import tickIcon from "../../../../../../../images/tick-green.svg";

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
    return (
        <div className={classes["collection-container"]}>
            <div className={classes["collection-label"]}>Shamir Collection</div>
            <CollectionSlot />
        </div>
    );
};

const CollectionSlot = () => {
    const [isEdit, setIsEdit] = useState(false);
    return (
        <>
            {isEdit ? (
                <div className={classes["collection-edit-container"]}>
                    <div className={classes["collection-edit-header-slot"]}>
                        <div className={classes["collection-left-container"]}>
                            <CustomCheckbox
                                label={""}
                                defaultChecked={true || false}
                                onValueChange={(value) => {}}
                                id="isCopayHighIndex"
                                name="isCopayHighIndex"
                                containerClass={classes["checkbox"]}
                            />
                            <div className={classes["edit-content-title"]}>
                                Shamir Autograph III
                            </div>
                        </div>
                        <img
                            src={tickIcon}
                            alt={"icon"}
                            className={classes["tick-icon"]}
                            onClick={() => setIsEdit(false)}
                        />
                    </div>
                    <div className={classes["edit-slot-title"]}>
                        Display Name
                    </div>
                    <input
                        className={classes["edit-slot-input"]}
                        placeholder={"Enter Display Name"}
                    />
                    <div
                        className={classes["edit-slot-title"]}
                        placeholder={"Enter Amount"}
                    >
                        Retail Amount
                    </div>
                    <input className={classes["edit-slot-input"]} />
                </div>
            ) : (
                <div className={classes["collection-show-container"]}>
                    <div className={classes["collection-left-container"]}>
                        <div
                            className={
                                classes["collection-show-content-container"]
                            }
                        >
                            <CustomCheckbox
                                label={""}
                                defaultChecked={true || false}
                                onValueChange={(value) => {}}
                                id="isCopayHighIndex"
                                name="isCopayHighIndex"
                            />
                            <div className={classes["show-content-title"]}>
                                Shamir Autograph III
                            </div>
                            <div className={classes["show-content-heading"]}>
                                Display Name:{" "}
                                <span className={classes["show-content-value"]}>
                                    ---
                                </span>
                            </div>
                            <div className={classes["show-content-heading"]}>
                                Retail Amount:{" "}
                                <span className={classes["show-content-value"]}>
                                    ---
                                </span>
                            </div>
                        </div>
                    </div>
                    <img
                        src={editIcon}
                        alt={"icon"}
                        className={classes["edit-icon"]}
                        onClick={() => setIsEdit(true)}
                    />
                </div>
            )}
        </>
    );
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
    const [selectedRow, setSelectedRow] = useState("");
    const onBrandRowClick = (value) => {
        setSelectedRow(value);
    };
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
            <LensLabelSlot title={"Shamir"} onRowClick={onBrandRowClick} />
            <LensLabelSlot title={"Essilor"} onRowClick={onBrandRowClick} />
            <LensLabelSlot title={"Hoya"} onRowClick={onBrandRowClick} />
            <LensLabelSlot
                title={"Signet Armorlite"}
                onRowClick={onBrandRowClick}
            />
            <LensLabelSlot title={"Maui Jim"} onRowClick={onBrandRowClick} />
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
