import React from 'react';
import {Avatar} from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';


const BackgroundLetterAvatars = ({fullName, width= 40 , height= 40,fontSize = 18}) => {
    const stringToColor = (string) => {
        let hash = 0;
        let i;
        let color = '#';
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }
        return color;
    }

    const stringAvatar = (name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
                width: width,
                height: height,
                fontSize:fontSize
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <Avatar   {...stringAvatar(fullName)}  />
    );
};

export default BackgroundLetterAvatars;