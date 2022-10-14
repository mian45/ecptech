import React from "react";
import classes from "./styles.module.scss";

const AddonSettings = () => {
    return (
        <>
            <div className={classes["container"]}>
                <div className={classes["left-container"]}>
                    {/* <LensLabelSlot /> */}
                </div>
                <div className={classes["right-container"]}>
                    {/* <CollectionSection
                        selectedRow={selectedRow}
                        lenses={lensesList}
                        selectedLensType={selectedLensType}
                        setLensesList={setLensesList}
                    /> */}
                </div>
            </div>
            <div className={classes["save-button-wrapper"]}>
                <button
                    className={classes["save-button"]}
                    // onClick={submitLensesData}
                >
                    Save
                </button>
            </div>
        </>
    );
};
export default AddonSettings;

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
            {["", ""]?.map((brand, index) => {
                return (
                    <LensLabelSlot
                        key={index}
                        title={brand?.title || ""}
                        onClick={() => onBrandRowClick(brand?.title || "")}
                        active={brand?.title === selectedRow}
                    />
                );
            })}
        </div>
    );
};
