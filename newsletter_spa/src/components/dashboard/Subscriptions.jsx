import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const data2 = {
  labels: ["Cars", "Sports", "Kitchen", "Garden", "Games", "Fashon"],
  datasets: [
    {
      label: "# of Subs",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
      borderWidth: 1,
    },
  ],
};

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
