import React, { Dispatch, SetStateAction, useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import { grey } from '@mui/material/colors';
import './settings.scss';

const Settings = (props: { withSeven: boolean, setWithSeven: Dispatch<SetStateAction<boolean>>, useScaleMode?: boolean, setUseScaleMode?: Dispatch<SetStateAction<boolean>>, useAllStrings?: boolean, setUseAllStrings?: Dispatch<SetStateAction<boolean>> }) => {

    const [showDialog, setShowDialog] = useState(false);

    const onClickIcon = () => {
        setShowDialog(showDialog => !showDialog);
    }

    return <>
        <div className="settings-icon-container">
            <SettingsIcon onClick={onClickIcon} className="settings-icon" />
        </div>
        {
            showDialog &&
            <div className="settings-dialog">
                <div className="settings-header">
                    <CloseIcon className="close" onClick={onClickIcon} />
                </div>
                <div className="check-option">
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
                {
                    props.useScaleMode !== undefined && props.setUseScaleMode !== undefined &&
                    <div className="check-option">
                        Include Scale
                        <Checkbox
                            checked={props.useScaleMode}
                            onChange={() => props.setUseScaleMode?.(useScaleMode => !useScaleMode)}
                            sx={{
                                color: grey[800],
                                '&.Mui-checked': {
                                    color: grey[600],
                                },
                            }}
                        />
                    </div>
                }
                {
                    props.useAllStrings !== undefined && props.setUseAllStrings !== undefined &&
                    <div className="check-option">
                        Use All Strings
                        <Checkbox
                            checked={props.useAllStrings}
                            onChange={() => props.setUseAllStrings?.(useAllStrings => !useAllStrings)}
                            sx={{
                                color: grey[800],
                                '&.Mui-checked': {
                                    color: grey[600],
                                },
                            }}
                        />
                    </div>
                }
            </div>
        }
    </>

}

export default Settings;