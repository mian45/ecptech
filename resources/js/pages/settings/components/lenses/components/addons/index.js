import React, { useState, useEffect } from "react";
import classes from "./styles.module.scss";
import downIcon from "../../../../../../../images/down-arrow.png";
import blackArrowIcon from "../../../../../../../images/black-arrow.svg";
import CustomCheckbox from "../../../../../../components/customCheckbox";
import editIcon from "../../../../../../../images/edit.png";
import tickIcon from "../../../../../../../images/tick-green.svg";
import Axios from "../../../../../../Http";
import { connect } from "react-redux";

const Addons = ({ userId }) => {
    const [addonsList, setAddonsList] = useState([]);
    const [changedAddOnList, setChangedAddOnList] = useState([]);
    const [selectedAddons, setSelectedAddons] = useState("");
    const [selectedRow, setSelectedRow] = useState("");

    useEffect(() => {
        const getLenses = async () => {
            try {
                await Axios.get(
                    `${process.env.MIX_REACT_APP_URL}/api/addon-settings`,
                    {
                        params: { userId: userId },
                    }
                ).then((res) => {
                    const newData = res.data.data?.map((item) => {
                        if (
                            item.price != null &&
                            item.price != undefined &&
                            item.price != ""
                        ) {
                            return {
                                ...item,
                                price: item.price.split(".", 2)[0],
                            };
                        } else {
                            return item;
                        }
                    });
                    setAddonsList(newData);
                });
            } catch (err) {
                console.log("error while get lenses");
            }
        };
        getLenses();
    }, []);

    const submitLensesData = async () => {
        try {
            const payload = {
                data: addonsList,
            };
            await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/add-addon-setting`,
                payload
            );
        } catch (err) {
            console.log("error while update lenses");
        }
    };

    const onLensTypeClick = (value) => {
        setSelectedAddons(value);
        setSelectedRow(value);
    };

    return (
        <>
            <div className={classes["container"]}>
                <div className={classes["left-container"]}>
                    <LensesTypeList
                        onClick={onLensTypeClick}
                        lenses={addonsList}
                        selectedRow={selectedRow}
                    />
                </div>
                <div className={classes["right-container"]}>
                    <CollectionSection
                        addons={addonsList}
                        selectedAddons={selectedAddons}
                        setLensesList={setAddonsList}
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
export default connect(mapStateToProps)(Addons);

const CollectionSection = ({ addons, selectedAddons, setLensesList }) => {
    const [addonsList, setAddonsList] = useState([]);
    const getCollections = () => {
        const data = addons.filter((item, index) => {
            if (item.title === selectedAddons) {
                return item.addons;
            }
        });
        if (data.length != 0) {
            const newData = data[0]?.addons?.map((item) => {
                if (
                    item.price != null &&
                    item.price != undefined &&
                    item.price != ""
                ) {
                    return { ...item, price: item.price.split(".", 2)[0] };
                } else {
                    return item;
                }
            });
            setAddonsList(newData);
        } else {
            setAddonsList([]);
        }
    };
    useEffect(() => {
        getCollections();
    }, [selectedAddons]);
    const handleCheckbox = (value, collection) => {
        const newData = addonsList?.map((item) => {
            if (item.id === collection.id) {
                return { ...item, status: value ? "active" : "inactive" };
            } else {
                return item;
            }
        });
        const data = addons?.map((item, index) => {
            if (item.title === selectedAddons) {
                return { ...item, addons: newData };
            } else {
                return item;
            }
        });
        setLensesList(data);
        setAddonsList(newData);
    };
    const handleDisplayNameChange = (value, collection) => {
        const newData = addonsList?.map((item) => {
            if (item.id === collection.id) {
                return { ...item, display_name: value };
            } else {
                return item;
            }
        });
        const data = addons?.map((item, index) => {
            if (item.title === selectedAddons) {
                return { ...item, addons: newData };
            } else {
                return item;
            }
        });
        setLensesList(data);
        setAddonsList(newData);
    };
    const handleAmountNameChange = (value, collection) => {
        const newData = addonsList?.map((item) => {
            if (item.id === collection.id) {
                return { ...item, price: value };
            } else {
                return item;
            }
        });
        const data = addons?.map((item, index) => {
            if (item.title === selectedAddons) {
                return { ...item, addons: newData };
            } else {
                return item;
            }
        });
        setLensesList(data);
        setAddonsList(newData);
    };
    if (!selectedAddons) return <></>;
    return (
        <div className={classes["collection-container"]}>
            <div
                className={classes["collection-label"]}
            >{`${selectedAddons}`}</div>
            {addonsList?.map((collection, index) => (
                <CollectionSlot
                    key={`${collection?.title || ""}+${index}`}
                    collection={collection}
                    handleCheckbox={handleCheckbox}
                    handleDisplayNameChange={handleDisplayNameChange}
                    handleAmountNameChange={handleAmountNameChange}
                />
            ))}
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
                        <div
                            className={`${classes["collection-left-container"]} ${classes["animated-title"]}`}
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
                    </div>{" "}
                    <div className={classes["edit-slot-sub-wrapper"]}>
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
                            value={collection?.price}
                            onChange={(e) => {
                                const re = /^\d+(\d{3})*(\.\d{0,2})?$/;
                                if (
                                    e.target.value === "" ||
                                    re.test(e.target.value)
                                ) {
                                    handleAmountNameChange(
                                        e?.target?.value,
                                        collection
                                    );
                                }
                            }}
                        />
                    </div>
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
                                        {collection?.price || "---"}
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

const LensesTypeList = ({ onClick, lenses, selectedRow }) => {
    return (
        <div className={classes["lenses-list-container"]}>
            <div className={classes["lenses-list-title"]}>Add On</div>
            {lenses?.map((lens, index) => {
                return (
                    <LensLabelSlot
                        title={lens?.title || ""}
                        onClick={() => onClick(lens?.title)}
                        key={index}
                        active={lens?.title === selectedRow}
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
