import React, { Dispatch, SetStateAction, useState } from "react";
import Home from '@mui/icons-material/Home';
import './HomeIcon.scss';

const HomeIcon = (props: {setChoose: () => void }) => {

    return <>
        <div onClick={props.setChoose} className="settings-icon">
            <Home />
        </div>
    </>

}

export default HomeIcon;