import React from "react";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { useNavigate } from "react-router-dom";

export default function GridChart({ total_reviews }) {
  const navigate = useNavigate();
  // Filter reviews based on label
  const positives = total_reviews.filter(
    (item) => item.result.label === "POSITIVE"
  );
  const negatives = total_reviews.filter(
    (item) => item.result.label === "NEGATIVE"
  );
  const neutrals = total_reviews.filter(
    (item) => item.result.label === "NEUTRAL"
  );

  // Map unique product titles to indices
  const productTitles = [
    ...new Set(total_reviews.map((review) => review.productId.title)),
  ];
  const titleToIndex = productTitles.reduce((acc, title, index) => {
    acc[title] = index; // Map each title to an index
    return acc;
  }, {});

  // Function to format data for ScatterChart
  const formatData = (reviews) => {
    return reviews.map((review) => ({
      x: titleToIndex[review.productId.title], // Use index for x axis
      y: review.result.score, // Score as y value
      id: review._id, // Unique ID for each point
      title: review.productId.title, // Original title for reference
    }));
  };

  return (
    <>
      <p
        onClick={() => navigate("/")}
        className="text-center text-blue-500 underline underline-offset-2 mb-5"
      >
        Go&nbsp;to&nbsp;Products
      </p>
      <h1 className="text-center text-xl">Reviews&nbsp;Chart</h1>
      <div className="scrollable-container overflow-x-scroll lg:overflow-x-auto py-10 border-y border-gray-100">
        <div className="min-w-max">
          <ScatterChart
            className="mx-auto"
            width={600}
            height={300}
            series={[
              {
                label: "POSITIVE",
                data: formatData(positives), // Map positives data
                color: "green",
              },
              {
                label: "NEGATIVE",
                data: formatData(negatives), // Map negatives data
                color: "red",
              },
              {
                label: "NEUTRAL",
                data: formatData(neutrals), // Map neutrals data
                color: "gray",
              },
            ]}
            grid={{ vertical: true, horizontal: true }}
            tooltip={({ datum }) => {
              // Custom tooltip to display product title
              return (
                <div>
                  <p>Product: {datum.title}</p>
                  <p>Score: {datum.y}</p>
                  <p>Label: {datum.label}</p>
                </div>
              );
            }}
          />
        </div>
      </div>
    </>
  );
}
