import { Box, Typography } from "@mui/material";
import React from "react";
import ScreenShot from "./ScreenShot.js";

function getTweetBody(bigTable) {
    return '';
}

export default function NextMatchesView({bigTable}) {
    return (
        <ScreenShot label="big-table" tweetBody={getTweetBody(bigTable)}>
        <Box sx={{ margin: 1, padding: 1, maxWidth: 480 }}>
            <Typography variant="h5">Next Matches</Typography>
        </Box>
        </ScreenShot>
    );
}