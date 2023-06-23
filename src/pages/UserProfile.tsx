import { useEffect } from "react";
import CardDog from "../components/UserProfileIItems/CardDog";
import Profile from "../components/UserProfileIItems/Profile";
import Box from "@mui/material/Box";
const UserProfile = () => {
  return (
    <Box>
      <Profile />
      <Box sx={{ display: "flex", gap: 2, mt: "8rem", mx: "4rem" }}>
        <CardDog />
        <CardDog />
      </Box>
    </Box>
  );
};

export default UserProfile;
