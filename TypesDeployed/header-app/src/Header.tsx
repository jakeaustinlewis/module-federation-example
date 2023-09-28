import React from "react";

import { Box, Typography, Stack } from "@mui/material";

interface HeaderProps {
  title: string;
}

function Header(props: HeaderProps) {
  const { title } = props;

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
            {title}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default Header;
