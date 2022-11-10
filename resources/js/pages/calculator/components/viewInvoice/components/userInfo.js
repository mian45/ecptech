import React from "react";
import classes from "../styles.module.scss";
import dayjs from "dayjs";
import { Col } from "antd";

const UserInfo = ({ receipt }) => {
    const date = new Date(receipt?.userInfo?.dob || new Date());
    const dob = dayjs(date).format("MMM DD, YYYY");
    return (
        <Col className={classes["sub-left-container"]}>
            <InfoSlot
                title={"Invoice Name"}
                subTitle={`${receipt?.values?.invoiceName}`}
            />
            <InfoSlot
                title={"Customer Name"}
                subTitle={`${receipt?.userInfo?.firstName} ${receipt?.userInfo?.lastName}`}
            />
            <InfoSlot title={"Date of Birth"} subTitle={dob || ""} />
            <InfoSlot
                title={"Email"}
                subTitle={(receipt?.userInfo?.email || "").slice(0, 20)}
            />
            {receipt?.userInfo?.phoneNo && (
                <InfoSlot
                    title={"Phone Number"}
                    subTitle={receipt?.userInfo?.phoneNo}
                />
            )}
        </Col>
    );
};

export default UserInfo;

const InfoSlot = ({ title, subTitle }) => {
    return (
        <div className={classes["info-slot-container"]}>
            <div className={classes["info-slot-title"]}>{title}</div>
            <div className={classes["info-slot-subtitle"]}>{subTitle}</div>
        </div>
    );
};
