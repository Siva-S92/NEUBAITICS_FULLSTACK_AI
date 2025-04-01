import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function DataGridDemo({ total_reviews }) {
  // Prepare the rows by mapping and flattening the review data
  const rows = total_reviews.map((review, index) => ({
    id: review._id.toString(), // Ensure the ID is a string for DataGrid
    title: review.productId.title,
    category: review.productId.category,
    price: review.productId.price,
    description: review.productId.description || "No description", // Add description if available
    thumbnail: review.productId.thumbnail,
    username: review.userId.username,
    email: review.userId.email,
    comment: review.comment,
    label: review.result.label,
    score: parseFloat(review.result.score), // Ensure the score is a number
  }));

  // Define the columns with flex for auto width
  const cols = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", flex: 1, minWidth: 150 },
    { field: "category", headerName: "Category", flex: 1, minWidth: 150 },
    { field: "price", headerName: "Price", flex: 1, minWidth: 150 },
    { field: "description", headerName: "Description", flex: 1, minWidth: 350 },
    { field: "thumbnail", headerName: "Thumbnail", flex: 1, minWidth: 350 },
    { field: "username", headerName: "Username", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
    { field: "comment", headerName: "Comment", flex: 1, minWidth: 150 },
    { field: "label", headerName: "Label", flex: 1, minWidth: 150 },
    { field: "score", headerName: "Score", type: "number", flex: 1, minWidth: 150 },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={cols}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}


