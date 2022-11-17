import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { Box } from "@mui/material";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


export default function Subscriptions({ data }) {
  return (
    <Box>
      <Box component="p" sx={{ fontSize: 20, textAlign: "center" }}>
        Subscriptions By Topic
      </Box>
      <PolarArea data={{ ...data, borderWidth: 1 }} />
    </Box>
  );
}
