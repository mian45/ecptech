import React from "react";
import classes from "./styles.module.scss";
import sliderCard from "../../../../../../images/slider-card.png";

import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Navigation,
    Pagination,
    Mousewheel,
    Keyboard,
    Autoplay,
} from "swiper";

const SignInSlider = () => {
    SwiperCore.use([Autoplay]);
    return (
        <div className={classes["container"]}>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
                loop
                autoplay={true}
            >
                {SLIDER_DATA.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className={`${classes["card-container"]}`}>
                                <img
                                    src={item?.icon}
                                    alt={"icon"}
                                    className={classes["card-image"]}
                                />
                            </div>
                            <div className={classes["text-box"]}>
                                <div className={classes["title"]}>
                                    {item?.title}
                                </div>
                                <div className={classes["subtitle"]}>
                                    {item?.subtitle}
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};
export default SignInSlider;

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
        title: "Meet our new visual calculator",
        subtitle:
            "Welcome to Urban Optics. Please put your login credentials below to start using the app.",
    },
    {
        id: 2,
        icon: sliderCard,
        title: "Meet our new visual calculator",
        subtitle:
            "Welcome to Urban Optics. Please put your login credentials below to start using the app.",
    },
];
