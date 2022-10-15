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
    const [selectedRow, setSelectedRow] = useState("");

    useEffect(() => {
        const getLenses = async () => {
            try {
                const res = await Axios.get(
                    `${process.env.MIX_REACT_APP_URL}/api/get-lense-features-brands`,
                    {
                        params: { userId: userId },
                    }
                );
                setLensesList(res?.data?.data || []);
            } catch (err) {
                console.log("error while get lenses");
            }
        };
        getLenses();
    }, []);

    const submitLensesData = async () => {
        try {
            const payload = {
                user_id: userId,
                data: lensesList,
            };
            await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/update-lense-setting`,
                payload
            );
        } catch (err) {
            console.log("error while update lenses");
        }
    };

    const onLensTypeClick = (value) => {
        setIsBrands(true);
        setSelectedLensType(value);
    };
    const onGoBackClick = () => {
        setSelectedRow("")
        setIsBrands(false);

    };
    return (
        <>
            <div className={classes["container"]}>
                <div className={classes["left-container"]}>
                    {isBrands ? (
                        <LensesTypeBrandsList
                            onBackClick={onGoBackClick}
                            selectedLensType={selectedLensType}
                            lenses={lensesList}
                            selectedRow={selectedRow}
                            setSelectedRow={setSelectedRow}
                        />
                    ) : (
                        <LensesTypeList
                            onClick={onLensTypeClick}
                            lenses={lensesList}
                        />
                    )}
                </div>
                <div className={classes["right-container"]}>
                    <CollectionSection
                        selectedRow={selectedRow}
                        lenses={lensesList}
                        selectedLensType={selectedLensType}
                        setLensesList={setLensesList}
                    />
                </div>
            </div>
            <div className={classes["save-button-wrapper"]}>
                <button
                    className={classes["save-button"]}
                    onClick={submitLensesData}
                >
                    Save
                </button>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    userId: state.Auth?.user?.id,
});
export default connect(mapStateToProps)(LensesType);

const CollectionSection = ({
    selectedRow,
    lenses,
    selectedLensType,
    setLensesList,
}) => {
    const getCollections = () => {
        const brand = lenses.find((lens) => lens?.title === selectedLensType);
        const collection = brand?.brands.find(
            (singleBrand) => singleBrand?.title === selectedRow
        );
        return collection?.collections;
    };
    const handleCheckbox = (value, collection) => {
        const lens = [...lenses];

        const lensType = [...lens].find(
            (lens) => lens?.title === selectedLensType
        );
        const brand = lensType?.brands.find(
            (singleBrand) => singleBrand?.title === selectedRow
        );
        const selectedCollection = brand?.collections.find(
            (collec) => collec?.id === collection?.id
        );
        selectedCollection.status = value === true ? "active" : "inactive";
        setLensesList([...lens]);
    };
    const handleDisplayNameChange = (value, collection) => {
        const lens = [...lenses];

        const lensType = [...lens].find(
            (lens) => lens?.title === selectedLensType
        );
        const brand = lensType?.brands.find(
            (singleBrand) => singleBrand?.title === selectedRow
        );
        const selectedCollection = brand?.collections.find(
            (collec) => collec?.id === collection?.id
        );
        selectedCollection.display_name = value;
        setLensesList([...lens]);
    };
    const handleAmountNameChange = (value, collection) => {
        const lens = [...lenses];

        const lensType = [...lens].find(
            (lens) => lens?.title === selectedLensType
        );
        const brand = lensType?.brands.find(
            (singleBrand) => singleBrand?.title === selectedRow
        );
        const selectedCollection = brand?.collections.find(
            (collec) => collec?.id === collection?.id
        );
        selectedCollection.custom_price = value;
        setLensesList([...lens]);
    };
    if (!selectedRow) return <></>;
    return (
        <div className={classes["collection-container"]}>
            <div
                className={classes["collection-label"]}
            >{`${selectedRow} Brands`}</div>
            {getCollections()?.map((collection, index) => {
                return (
                    <CollectionSlot
                        key={`${collection?.title || ""}+${index}`}
                        collection={collection}
                        handleCheckbox={handleCheckbox}
                        handleDisplayNameChange={handleDisplayNameChange}
                        handleAmountNameChange={handleAmountNameChange}
                    />
                );
            })}
        </div>
    );
};

export const CollectionSlot = ({
    collection,
    handleCheckbox,
    handleDisplayNameChange,
    handleAmountNameChange,
}) => {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
            {isEdit ? (
                <div
                    className={classes["collection-edit-container"]}
                    id={collection?.title}
                >
                    <div className={classes["collection-edit-header-slot"]}>
                        <div className={classes["collection-left-container"]}>
                            <CustomCheckbox
                                label={""}
                                defaultChecked={
                                    collection?.status === "active"
                                        ? true
                                        : false
                                }
                                onValueChange={(value) => {
                                    handleCheckbox(value, collection);
                                }}
                                containerClass={classes["checkbox"]}
                            />
                            <div className={classes["edit-content-title"]}>
                                {collection?.title || ""}
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
                        value={collection?.display_name || ""}
                        onChange={(e) =>
                            handleDisplayNameChange(
                                e?.target?.value,
                                collection
                            )
                        }
                    />
                    <div className={classes["edit-slot-title"]}>
                        Retail Amount
                    </div>
                    <input
                        className={classes["edit-slot-input"]}
                        placeholder={"Enter Amount"}
                        value={collection?.custom_price || ""}
                        onChange={(e) =>{
                            const re = /^[0-9\b]+$/;
                            if (e.target.value === '' || re.test(e.target.value)) {
                                handleAmountNameChange(e?.target?.value, collection)
                             }}
                            
                        }
                    />
                </div>
            ) : (
                <div
                    className={classes["collection-show-container"]}
                    id={collection?.title}
                >
                    <div className={classes["collection-left-container"]}>
                        <div
                            className={
                                classes["collection-show-content-container"]
                            }
                        >
                            <CustomCheckbox
                                label={""}
                                defaultChecked={
                                    collection?.status === "active"
                                        ? true
                                        : false
                                }
                                onValueChange={(value) => {
                                    handleCheckbox(value, collection);
                                }}
                                containerClass={classes["checkbox"]}
                            />
                            <div className={classes["collection-content"]}>
                                <div className={classes["show-content-title"]}>
                                    {collection?.title || ""}
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
                                        {collection?.display_name || "---"}
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
                                        {collection?.custom_price || "---"}
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

const LensesTypeBrandsList = ({
    onBackClick,
    selectedLensType,
    lenses,
    setSelectedRow,
    selectedRow,
}) => {
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
                <div className={classes["lenses-list-brand-title"]}>
                    Manufacturers
                </div>
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

export const LensLabelSlot = ({ title, onClick, active }) => {
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
