import React, { useEffect } from "react";
import classes from "./styles.module.scss";
import Axios from "../../Http";
import { connect } from "react-redux";

const HotSellingProducts = ({ userId }) => {
    useEffect(() => {
        const getHotSellingProducts = async () => {
            try {
                const productsObject = {
                    start_date: "08/01/2022",
                    end_date: "10/13/2022",
                    user_id: userId,
                };
                const res = await Axios.post(
                    `${process.env.MIX_REACT_APP_URL}/api/hot-selling-products`,
                    productsObject
                );
                console.log("res hot selling products", res);
            } catch (err) {
                console.log("Error while fetch products", err);
            }
        };
        getHotSellingProducts();
    }, []);
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

const mapStateToProps = (state) => ({
    userId: state.Auth?.user?.id,
});

export default connect(mapStateToProps)(HotSellingProducts);

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
