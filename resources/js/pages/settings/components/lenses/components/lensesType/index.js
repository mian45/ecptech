import React, { useState, useEffect } from "react";
import classes from "./styles.module.scss";
import downIcon from "../../../../../../../images/down-arrow.png";
import blackArrowIcon from "../../../../../../../images/black-arrow.svg";
import CustomCheckbox from "../../../../../../components/customCheckbox";
import editIcon from "../../../../../../../images/edit.png";
import tickIcon from "../../../../../../../images/tick-green.svg";
import Axios from "../../../../../../Http";
import { connect } from "react-redux";

const LensesType = ({ userId }) => {
    const [isBrands, setIsBrands] = useState(false);
    const [lensesList, setLensesList] = useState([]);
    const [selectedLensType, setSelectedLensType] = useState("");

    useEffect(() => {
        const getLenses = async () => {
            try {
                const res = await Axios.get(
                    `${process.env.MIX_REACT_APP_URL}/api/get-lense-features-brands`,
                    {
                        params: { userId: userId },
                    }
                );
                console.log("res", res?.data?.data);
                setLensesList(res?.data?.data || []);
            } catch (err) {
                console.log("error while get lenses");
            }
        };
        getLenses();
    }, []);

    const onLensTypeClick = (value) => {
        setIsBrands(true);
        setSelectedLensType(value);
    };
    const onGoBackClick = () => {
        setIsBrands(false);
    };
    return (
        <div className={classes["container"]}>
            <div className={classes["left-container"]}>
                {isBrands ? (
                    <LensesTypeBrandsList
                        onBackClick={onGoBackClick}
                        selectedLensType={selectedLensType}
                        lenses={lensesList}
                    />
                ) : (
                    <LensesTypeList
                        onClick={onLensTypeClick}
                        lenses={lensesList}
                    />
                )}
            </div>
            <div className={classes["right-container"]}>
                <CollectionSection />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    userId: state.Auth?.user?.id,
});
export default connect(mapStateToProps)(LensesType);

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
                    <div className={classes["edit-slot-title"]}>
                        Retail Amount
                    </div>
                    <input
                        className={classes["edit-slot-input"]}
                        placeholder={"Enter Amount"}
                    />
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
                            <div className={classes["collection-content"]}>
                                <div className={classes["show-content-title"]}>
                                    Shamir Autograph III
                                </div>
                                <div
                                    className={classes["show-content-heading"]}
                                >
                                    Display Name:{" "}
                                    <span
                                        className={
                                            classes["show-content-value"]
                                        }
                                    >
                                        ---
                                    </span>
                                </div>
                                <div
                                    className={classes["show-content-heading"]}
                                >
                                    Retail Amount:{" "}
                                    <span
                                        className={
                                            classes["show-content-value"]
                                        }
                                    >
                                        ---
                                    </span>
                                </div>
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

const LensesTypeList = ({ onClick, lenses }) => {
    return (
        <div className={classes["lenses-list-container"]}>
            <div className={classes["lenses-list-title"]}>Lens Types</div>
            {lenses.map((lens, index) => {
                return (
                    <LensLabelSlot
                        title={lens?.title || ""}
                        onClick={() => onClick(lens?.title || "")}
                        key={index}
                    />
                );
            })}
        </div>
    );
};

const LensesTypeBrandsList = ({ onBackClick, selectedLensType, lenses }) => {
    const [selectedRow, setSelectedRow] = useState("");
    const getBrandsList = () => {
        const brand = lenses.find((lens) => lens?.title === selectedLensType);
        return brand?.brands || [];
    };
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
            {getBrandsList()?.map((brand, index) => {
                return (
                    <LensLabelSlot
                        key={index}
                        title={brand?.title}
                        onClick={() => onBrandRowClick(brand?.title)}
                        active={brand?.title === selectedRow}
                    />
                );
            })}
        </div>
    );
};

const LensLabelSlot = ({ title, onClick, active }) => {
    const [isHover, setIsHover] = useState(false);
    return (
        <div
            className={`${classes["lenses-label-slot-container"]} ${
                (active || isHover) && classes["slot-color"]
            }`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={onClick}
        >
            <div className={classes["lenses-label-slot-title"]}>{title}</div>
            {(active || isHover) && (
                <img
                    src={downIcon}
                    alt={"icon"}
                    className={classes["lenses-label-slot-icon"]}
                />
            )}
        </div>
    );
};
