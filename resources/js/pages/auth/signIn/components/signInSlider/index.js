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
import { Col,Row } from "antd";

const SignInSlider = () => {
    SwiperCore.use([Autoplay]);
    return (
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
                        <Col>
                        <Row className={`${classes["card-container"]}`} justify="center"align="middle">
                            <Col xs={18}>
                            <img
                                src={item?.icon}
                                alt={"icon"}
                                className={classes["card-image"]}
                            /></Col>
                        </Row>
                        <Row xs={18} justify="center" align="middle" className={classes["title"]}>
                            <Col xs={24}> 
                                {item?.title}
                           </Col>
                            <Col xs={24} className={classes["subtitle"]}>
                                {item?.subtitle}
                            </Col>
                        </Row>
                        </Col>
                        
                    </SwiperSlide>
                );
            })}
        </Swiper>
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
