import React, { useEffect } from "react";
import classes from "./styles.module.scss";
import Axios from "../../Http";
import { connect } from "react-redux";

const HotSellingProducts = ({ userId }) => {
    const [products, setProducts] = useState([]);
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
                const productsList = res?.data?.data;
                productsList.sort((a, b) => a.no - b.no);
                setProducts(productsList);
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
                {products.map((product, index) => {
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
                <div className={classes["title"]}>{data?.name || ""}</div>
                <div className={classes["subtitle"]}>
                    {data?.sale_count || ""} sales
                </div>
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
