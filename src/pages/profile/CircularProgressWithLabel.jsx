import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

function CircularProgressWithLabel({ progress }) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100px",
        width: "100px",
      }}
    >
      <CircularProgress
        value={progress}
        color="primary"
        variant="determinate"
        thickness={5}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${progress}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;
