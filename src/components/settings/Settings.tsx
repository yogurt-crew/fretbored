import React, { Dispatch, SetStateAction, useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import { grey } from '@mui/material/colors';
import './settings.scss';

const Settings = (props: { withSeven: boolean, setWithSeven: Dispatch<SetStateAction<boolean>>, useScaleMode: boolean, setUseScaleMode: Dispatch<SetStateAction<boolean>> }) => {

    const [showDialog, setShowDialog] = useState(false);

    const onClickIcon = () => {
        setShowDialog(showDialog => !showDialog);
    }

    return <>
        <div onClick={onClickIcon} className="settings-icon">
            <SettingsIcon />
        </div>
        {
            showDialog &&
            <div className="settings-dialog">
                <div className="settings-header">
                    <CloseIcon className="close" onClick={onClickIcon} />
                </div>
                <div className="seven">
                    Include Seven
                    <Checkbox
                        checked={props.withSeven}
                        onChange={() => props.setWithSeven(withSeven => !withSeven)}
                        sx={{
                            color: grey[800],
                            '&.Mui-checked': {
                                color: grey[600],
                            },
                        }}
                    />
                </div>
                <div className="scale">
                    Include Scale
                    <Checkbox
                        checked={props.useScaleMode}
                        onChange={() => props.setUseScaleMode(useScaleMode => !useScaleMode)}
                        sx={{
                            color: grey[800],
                            '&.Mui-checked': {
                                color: grey[600],
                            },
                        }}
                    />
                </div>
            </div>
        }
    </>

}

export default Settings;