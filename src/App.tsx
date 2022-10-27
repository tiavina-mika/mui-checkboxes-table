import { FC } from "react";
import { Box, Link } from "@mui/material";
import RightsFields from "./RightsFields";

const sx = {
  root: {
    minHeight: "98vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
};

const App: FC = () => {
  return (
    <Box sx={sx.root}>
      <RightsFields />
      <Box>
        <Link
          href="https://github.com/tiavina-mika"
          underline="none"
          color="secondary.main"
        >
          Tiavina Michael RALAINIRINA
        </Link>
      </Box>
    </Box>
  );
};

export default App;
