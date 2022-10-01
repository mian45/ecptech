import React from "react";
import classes from "../styles.module.scss";

const UserInfo = ({ receipt }) => {
    return (
        <div className={classes["sub-left-container"]}>
            <InfoSlot
                title={"Invoice Name"}
                subTitle={`${receipt?.values?.invoiceName}`}
            />
            <InfoSlot
                title={"Customer Name"}
                subTitle={`${receipt?.userInfo?.firstName} ${receipt?.userInfo?.lastName}`}
            />
            <InfoSlot
                title={"Date of Birth"}
                subTitle={receipt?.userInfo?.dob}
            />
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
        </div>
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
