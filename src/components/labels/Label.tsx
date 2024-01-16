import React from "react";
import "./Label.scss";

const Label = (props: { label: string }) => {
    return (
        <div className="label">
            {props.label}
        </div>
    )
}

export default Label;