import React from "react";
import classes from "./styles.module.scss";

const HotSellingProducts = () => {
    return (
        <div className={classes["container"]}>
            <div className={classes["label"]}>Hot Selling Products</div>
            <div className={classes["products"]}>
                {hotProducts.map((product, index) => {
                    return (
                        <HotSellingProductsSlot
                            key={index}
                            data={product}
                            index={index + 1}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default HotSellingProducts;

const HotSellingProductsSlot = ({ data, index }) => {
    return (
        <div className={classes["slot-container"]}>
            <div className={classes["slot-icon"]}>{index}</div>
            <div className={classes["sub-container"]}>
                <div className={classes["title"]}>{data.title}</div>
                <div className={classes["subtitle"]}>{data.subtitle} sales</div>
            </div>
        </div>
    );
};

const hotProducts = [
    {
        title: "Double-Gauss lens",
        subtitle: 230,
    },
    {
        title: "Inverted telephoto (retrofocus)",
        subtitle: 130,
    },
    {
        title: "Frazier lens.",
        subtitle: 90,
    },
];
