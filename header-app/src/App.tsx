import React from "react"; // Must be imported for webpack to work

import { Box, Typography, Stack } from "@mui/material";
// const Header = React.lazy(() => import("HeaderApp/Header"));

function App() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          bgcolor: "success.main",
          width: "100%",
        }}
      >
        <Stack direction="row" justifyContent="center" sx={{ p: 10 }} flex={1}>
          <Typography variant="h1" sx={{ color: "#FFFFFF" }}>
            Exposed Module
          </Typography>
        </Stack>
      </Box>
      {/* <Header /> */}
    </Box>
  );
}

export default App;
