import React, { useState, useEffect } from "react";
import classes from "./styles.module.scss";
import downIcon from "../../../../../../../images/down-arrow.png";
import blackArrowIcon from "../../../../../../../images/black-arrow.svg";
import CustomCheckbox from "../../../../../../components/customCheckbox";
import editIcon from "../../../../../../../images/edit.png";
import tickIcon from "../../../../../../../images/tick-green.svg";
import Axios from "../../../../../../Http";
import { connect } from "react-redux";
import { Row, Col, message, Tooltip } from "antd";
const LensesType = ({ userId, plan }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [lensesMaterialAddApi, lensesMaterialAddHolder] =
        message.useMessage();
    const [isBrands, setIsBrands] = useState(false);
    const [lensesList, setLensesList] = useState([]);
    const [selectedLensType, setSelectedLensType] = useState("");
    const [selectedRow, setSelectedRow] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isChange, setIsChange] = useState(false);
    const [isCategories, setIsCategories] = useState(false);
    const [isSubCat, setIsSubCat] = useState(false);
    const [selectedSubCat, setSelecetedSubCat] = useState("");
    useEffect(() => {
        if (userId == null) return;
        const getLenses = async () => {
            try {
                setIsBrands(false);
                setIsCategories(false);
                setIsSubCat(false);
                setSelectedRow("");
                setSelecetedSubCat("");
                setSelectedCategory("");
                const res = await Axios.get(
                    `${process.env.MIX_REACT_APP_URL}/api/get-lense-features-brands?plan=${plan}`,
                    {
                        params: { userId: userId },
                    }
                );
                console.log(res?.data?.data[plan]);
                setLensesList(res?.data?.data[plan] || []);
            } catch (err) {
                console.log("error while get lenses");
                message.destroy();
                messageApi.open({
                    type: "error",
                    content: err.response.data.message,
                    duration: 5,
                    className: "custom-postion-error",
                });
            }
        };
        getLenses();
    }, [userId, plan]);

    const submitLensesData = async () => {
        setIsChange(false);
        try {
            const payload = {
                user_id: userId,
                data: {
                    [plan]: lensesList,
                },
            };
            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/update-lense-setting`,
                payload
            );
            message.destroy();
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: "custom-postion",
            });
        } catch (err) {
            console.log("error while update lenses");
            message.destroy();
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: "custom-postion-error",
            });
        }
    };

    const onLensTypeClick = (value) => {
        if (
            (plan == "spectra" && value == "PAL") ||
            (plan == "vba" && value == "PAL") ||
            (plan == "vba" && value == "Single Vision")
        ) {
            setIsCategories(true);
            setSelectedLensType(value);
        } else {
            setIsBrands(true);
            setSelectedLensType(value);
        }
    };
    const onGoBackClick = () => {
        setIsBrands(false);
        setSelectedRow("");
    };
    const onGoBackClickCatClick = () => {
        setIsCategories(false);
        setSelectedCategory("");
    };
    const onGoBackClickSubCatClick = () => {
        setSelecetedSubCat("");
        setIsSubCat(false);
    };
    return (
        <>
            <Row className={classes["container"]}>
                <div>{contextHolder}</div>
                <Col xs={24} md={9} className={classes["left-container"]}>
                    {isBrands ? (
                        <LensesTypeBrandsList
                            onBackClick={onGoBackClick}
                            selectedLensType={selectedLensType}
                            lenses={lensesList}
                            selectedRow={selectedRow}
                            setSelectedRow={setSelectedRow}
                            selectedCategory={selectedCategory}
                            selectedSubCat={selectedSubCat}
                        />
                    ) : isSubCat ? (
                        <LensesTypeSubCategoryList
                            onBackClick={onGoBackClickSubCatClick}
                            selectedLensType={selectedLensType}
                            lenses={lensesList}
                            selectedRow={selectedSubCat}
                            selectedCategory={selectedCategory}
                            setSelectedRow={(e) => {
                                setIsBrands(true);
                                setSelecetedSubCat(e);
                            }}
                        />
                    ) : isCategories ? (
                        <LensesTypeCategoryList
                            onBackClick={onGoBackClickCatClick}
                            selectedLensType={selectedLensType}
                            lenses={lensesList}
                            selectedRow={selectedCategory}
                            setSelectedRow={(e) => {
                                if (
                                    plan == "vba" &&
                                    selectedLensType == "Single Vision"
                                ) {
                                    setIsSubCat(true);
                                    setSelectedCategory(e);
                                } else {
                                    setIsBrands(true);
                                    setSelectedCategory(e);
                                }
                            }}
                        />
                    ) : (
                        <LensesTypeList
                            onClick={onLensTypeClick}
                            lenses={lensesList}
                        />
                    )}
                </Col>
                <Col xs={24} md={15} className={classes["right-container"]}>
                    <CollectionSection
                        selectedRow={selectedRow}
                        selectedCategory={selectedCategory}
                        lenses={lensesList}
                        selectedLensType={selectedLensType}
                        setLensesList={setLensesList}
                        setIsChange={setIsChange}
                        plan={plan}
                        selectedSubCat={selectedSubCat}
                    />
                </Col>
            </Row>
            <Row className={classes["save-button-wrapper"]}>
                <Col xs={24}>
                    <button
                        className={classes["save-button"]}
                        onClick={submitLensesData}
                        disabled={!isChange}
                    >
                        Save
                    </button>
                </Col>
            </Row>
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
    setIsChange,
    selectedCategory,
    selectedSubCat,
}) => {
    const getCollections = () => {
        if (selectedSubCat !== "") {
            const lens = lenses.find(
                (category) => category?.title === selectedLensType
            );
            const categories = lens?.categories.find(
                (category) => category?.title === selectedCategory
            );
            const subCat = categories?.sub_categories.find(
                (category) => category?.title === selectedSubCat
            );
            const collection = subCat?.brands.find(
                (singleBrand) => singleBrand?.title === selectedRow
            );
            return collection?.collections || [];
        } else if (selectedCategory !== "") {
            const lens = lenses.find(
                (category) => category?.title === selectedLensType
            );
            const categories = lens?.categories.find(
                (category) => category?.title === selectedCategory
            );
            const collection = categories?.brands.find(
                (singleBrand) => singleBrand?.title === selectedRow
            );
            return collection?.collections || [];
        } else {
            const brand = lenses.find(
                (lens) => lens?.title === selectedLensType
            );
            const collection = brand?.brands.find(
                (singleBrand) => singleBrand?.title === selectedRow
            );
            return collection?.collections;
        }
    };
    const handleCheckbox = (value, collection) => {
        setIsChange(true);
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
        setIsChange(true);
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
        setIsChange(true);
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
    const handleCheckboxCat = (value, collection) => {
        setIsChange(true);
        const lens = [...lenses];

        const lensType = [...lens].find(
            (lens) => lens?.title === selectedLensType
        );
        const categories = lensType?.categories.find(
            (category) => category?.title === selectedCategory
        );
        const brand = categories?.brands.find(
            (singleBrand) => singleBrand?.title === selectedRow
        );
        const selectedCollection = brand?.collections.find(
            (collec) => collec?.id === collection?.id
        );
        selectedCollection.status = value === true ? "active" : "inactive";
        setLensesList([...lens]);
    };
    const handleDisplayNameChangeCat = (value, collection) => {
        setIsChange(true);
        const lens = [...lenses];

        const lensType = [...lens].find(
            (lens) => lens?.title === selectedLensType
        );
        const categories = lensType?.categories.find(
            (category) => category?.title === selectedCategory
        );
        const brand = categories?.brands.find(
            (singleBrand) => singleBrand?.title === selectedRow
        );
        const selectedCollection = brand?.collections.find(
            (collec) => collec?.id === collection?.id
        );
        selectedCollection.display_name = value;
        setLensesList([...lens]);
    };
    const handleAmountNameChangeCat = (value, collection) => {
        setIsChange(true);
        const lens = [...lenses];

        const lensType = [...lens].find(
            (lens) => lens?.title === selectedLensType
        );
        const categories = lensType?.categories.find(
            (category) => category?.title === selectedCategory
        );
        const brand = categories?.brands.find(
            (singleBrand) => singleBrand?.title === selectedRow
        );
        const selectedCollection = brand?.collections.find(
            (collec) => collec?.id === collection?.id
        );
        selectedCollection.custom_price = value;
        setLensesList([...lens]);
    };
    const handleCheckboxSubCat = (value, collection) => {
        setIsChange(true);
        const lens = [...lenses];

        const lensType = [...lens].find(
            (lens) => lens?.title === selectedLensType
        );
        const categories = lensType?.categories.find(
            (category) => category?.title === selectedCategory
        );
        const subCat = categories?.sub_categories.find(
            (category) => category?.title === selectedSubCat
        );
        const brand = subCat?.brands.find(
            (singleBrand) => singleBrand?.title === selectedRow
        );
        const selectedCollection = brand?.collections.find(
            (collec) => collec?.id === collection?.id
        );
        selectedCollection.status = value === true ? "active" : "inactive";
        setLensesList([...lens]);
    };
    const handleDisplayNameChangeSubCat = (value, collection) => {
        setIsChange(true);
        const lens = [...lenses];

        const lensType = [...lens].find(
            (lens) => lens?.title === selectedLensType
        );
        const categories = lensType?.categories.find(
            (category) => category?.title === selectedCategory
        );
        const subCat = categories?.sub_categories.find(
            (category) => category?.title === selectedSubCat
        );
        const brand = subCat?.brands.find(
            (singleBrand) => singleBrand?.title === selectedRow
        );
        const selectedCollection = brand?.collections.find(
            (collec) => collec?.id === collection?.id
        );
        selectedCollection.display_name = value;
        setLensesList([...lens]);
    };
    const handleAmountNameChangeSubCat = (value, collection) => {
        setIsChange(true);
        const lens = [...lenses];

        const lensType = [...lens].find(
            (lens) => lens?.title === selectedLensType
        );
        const categories = lensType?.categories.find(
            (category) => category?.title === selectedCategory
        );
        const subCat = categories?.sub_categories.find(
            (category) => category?.title === selectedSubCat
        );
        const brand = subCat?.brands.find(
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
                        handleCheckbox={(e, m) => {
                            selectedSubCat !== ""
                                ? handleCheckboxSubCat(e, m)
                                : selectedCategory !== ""
                                ? handleCheckboxCat(e, m)
                                : handleCheckbox(e, m);
                        }}
                        handleDisplayNameChange={(e, m) => {
                            selectedSubCat !== ""
                                ? handleDisplayNameChangeSubCat(e, m)
                                : selectedCategory !== ""
                                ? handleDisplayNameChangeCat(e, m)
                                : handleDisplayNameChange(e, m);
                            handleAmountNameChangeCat;
                        }}
                        handleAmountNameChange={(e, m) => {
                            selectedSubCat !== ""
                                ? handleAmountNameChangeSubCat(e, m)
                                : selectedCategory !== ""
                                ? handleAmountNameChangeCat(e, m)
                                : handleAmountNameChange(e, m);
                        }}
                        prompt="Click to edit name of lens that calculator displays"
                    />
                );
            })}
        </div>
    );
};

export const CollectionSlot = ({
    id,
    collection,
    handleCheckbox,
    handleDisplayNameChange,
    handleAmountNameChange,
    prompt,
}) => {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
            {isEdit ? (
                <Row
                    justify="space-between"
                    align="top"
                    className={classes["collection-edit-container"]}
                    id={collection?.title}
                >
                    <Col className={classes["checkbox-title"]} xs={24}>
                        Click to Display as Option on Calculator
                    </Col>
                    <Col
                        xs={24}
                        className={classes["collection-edit-header-slot"]}
                    >
                        <Row className={classes["row-box"]}>
                            <Col xs={2}>
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
                            </Col>
                            <Col
                                xs={17}
                                className={classes["edit-content-title"]}
                            >
                                {collection?.title || ""}
                            </Col>

                            <Col xs={3} className={classes["edit-container"]}>
                                <img
                                    src={tickIcon}
                                    alt={"icon"}
                                    className={classes["tick-icon"]}
                                    onClick={() => setIsEdit(false)}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Row className={classes["edit-slot-sub-wrapper"]}>
                        <Col xs={2}></Col>
                        <Col xs={19}>
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
                        </Col>
                    </Row>
                </Row>
            ) : (
                <Row
                    className={classes["collection-show-container"]}
                    id={collection?.title}
                >
                    <Col className={classes["checkbox-title"]} xs={24}>
                        Click to Display as Option on Calculator
                    </Col>
                    <Col xs={18}>
                        <Row
                            className={
                                classes["collection-show-content-container"]
                            }
                        >
                            <Col xs={3}>
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
                            </Col>
                            <Col xs={18}>
                                <Row className={classes["collection-content"]}>
                                    <Col
                                        xs={24}
                                        className={
                                            classes["show-content-title"]
                                        }
                                    >
                                        {collection?.title || ""}
                                    </Col>
                                    <Col
                                        xs={24}
                                        className={
                                            classes["show-content-heading"]
                                        }
                                    >
                                        Display Name:{" "}
                                        <span
                                            className={
                                                classes["show-content-value"]
                                            }
                                        >
                                            {collection?.display_name || "---"}
                                        </span>
                                    </Col>
                                    <Col
                                        xs={24}
                                        className={
                                            classes["show-content-heading"]
                                        }
                                    >
                                        Retail Amount:{" "}
                                        <span
                                            className={
                                                classes["show-content-value"]
                                            }
                                        >
                                            {collection?.custom_price || "---"}
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6} className={classes["edit-container"]}>
                        <Tooltip title={prompt} color={"#6fa5cb"} key={0}>
                            <img
                                src={editIcon}
                                alt={"icon"}
                                className={classes["edit-icon"]}
                                onClick={() => setIsEdit(true)}
                            />
                        </Tooltip>
                    </Col>
                </Row>
            )}
        </>
    );
};

const LensesTypeList = ({ onClick, lenses }) => {
    return (
        <div className={classes["lenses-list-container"]}>
            <div className={classes["lenses-list-title"]}>Lens Types</div>
            {lenses?.map((lens, index) => {
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
    selectedCategory,
    selectedSubCat,
}) => {
    const getBrandsList = () => {
        if (selectedSubCat !== "") {
            const lens = lenses.find(
                (category) => category?.title === selectedLensType
            );
            const categories = lens?.categories.find(
                (category) => category?.title === selectedCategory
            );
            const subCat = categories?.sub_categories.find(
                (category) => category?.title === selectedSubCat
            );
            return subCat?.brands || [];
        } else if (selectedCategory !== "") {
            const lens = lenses.find(
                (category) => category?.title === selectedLensType
            );
            const categories = lens?.categories.find(
                (category) => category?.title === selectedCategory
            );
            return categories?.brands || [];
        } else {
            const brand = lenses.find(
                (lens) => lens?.title === selectedLensType
            );
            return brand?.brands || [];
        }
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
const LensesTypeCategoryList = ({
    onBackClick,
    selectedLensType,
    lenses,
    setSelectedRow,
    selectedRow,
}) => {
    const getCategoriesList = () => {
        const category = lenses.find(
            (lens) => lens?.title === selectedLensType
        );
        return category?.categories || [];
    };
    const onCategoryRowClick = (value) => {
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
                    Categories
                </div>
            </div>
            {getCategoriesList()?.map((category, index) => {
                return (
                    <LensLabelSlot
                        key={index}
                        title={category?.title}
                        onClick={() => onCategoryRowClick(category?.title)}
                        active={category?.title === selectedRow}
                    />
                );
            })}
        </div>
    );
};
const LensesTypeSubCategoryList = ({
    onBackClick,
    selectedLensType,
    lenses,
    setSelectedRow,
    selectedRow,
    selectedCategory,
}) => {
    const getSubCategoriesList = () => {
        const lens = lenses.find((lens) => lens?.title === selectedLensType);
        const category = lens?.categories.find(
            (cat) => cat?.title === selectedCategory
        );
        return category?.sub_categories || [];
    };
    const onCategoryRowClick = (value) => {
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
                    SubCategories
                </div>
            </div>
            {getSubCategoriesList()?.map((category, index) => {
                return (
                    <LensLabelSlot
                        key={index}
                        title={category?.title}
                        onClick={() => onCategoryRowClick(category?.title)}
                        active={category?.title === selectedRow}
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
