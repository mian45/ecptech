import React, { useState, useEffect } from "react";
import classes from "./styles.module.scss";
import sliderArrow from "../../../../../../images/slider-arrow.png";
import sliderCard from "../../../../../../images/slider-card.png";

const SignInSlider = () => {
    const [activeCard, setActiveCard] = useState(0);

    const onBackClick = () => {
        if (activeCard === 0) {
            setActiveCard(2);
        } else {
            setActiveCard(activeCard - 1);
        }
    };
    const onNextClick = () => {
        if (activeCard === 2) {
            setActiveCard(0);
        } else {
            setActiveCard(activeCard + 1);
        }
    };

    return (
        <div className={classes["container"]}>
            <SliderCard
                activeIndex={activeCard}
                onBackClick={onBackClick}
                onNextClick={onNextClick}
            />
        </div>
    );
};
export default SignInSlider;

const SliderCard = ({ onNextClick, onBackClick, activeIndex }) => {
    return (
        <div className={`${classes["card-container"]}`}>
            <div className={classes["image-container"]}>
                <img
                    src={sliderArrow}
                    alt={"icon"}
                    className={classes["left-icon"]}
                    onClick={onBackClick}
                />
                <img
                    src={SLIDER_DATA[activeIndex]?.icon}
                    alt={"icon"}
                    className={classes["card-image"]}
                />
                <img
                    src={sliderArrow}
                    alt={"icon"}
                    className={classes["right-icon"]}
                    onClick={onNextClick}
                />
            </div>
            <div className={classes["text-box"]}>
                <div className={classes["title"]}>
                    {SLIDER_DATA[activeIndex]?.title}
                </div>
                <div className={classes["subtitle"]}>
                    {SLIDER_DATA[activeIndex]?.subtitle}
                </div>
            </div>
            <div className={classes["dot-container"]}>
                {[1, 2, 3]?.map((_, index) => {
                    return (
                        <div
                            key={index}
                            className={
                                SLIDER_DATA[activeIndex]?.id === index
                                    ? classes["active-dot"]
                                    : classes["dot"]
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};

const SLIDER_DATA = [
    {
        id: 0,
        icon: sliderCard,
        title: "Meet our new visual calculator",
        subtitle:
            "Welcome to Urban Optics. Please put your login credentials below to start using the app.",
    },
    {
        id: 1,
        icon: sliderCard,
        title: "Welcome to Urban Optics",
        subtitle:
            "Welcome to Urban Optics. Please put your login credentials below to start using the app.",
    },
    {
        id: 2,
        icon: sliderCard,
        title: "Meet our new benifits",
        subtitle:
            "Welcome to Urban Optics. Please put your login credentials below to start using the app.",
    },
];
