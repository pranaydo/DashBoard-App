import {
  Button,
  Dialog,
  DialogTitle,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { users } from "../mockData/MockData";
import { User } from "../type/types";
import { useUser } from "../context/UserContext";

const getColorFromName = (name: string) => {
  const colors = [
    "#1976d2",
    "#388e3c",
    "#f57c00",
    "#d32f2f",
    "#7b1fa2",
    "#0097a7",
  ];
  const charCode = name.charCodeAt(0);
  return colors[charCode % colors.length];
};

const TopBar: React.FC = () => {
  const { user, setUser } = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>(user.name);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "8px",
        padding: "8px",
      }}
    >
      <Avatar
        sx={{
          bgcolor: getColorFromName(currentUser),
          width: 32,
          height: 32,
          fontSize: 14,
        }}
      >
        {currentUser.charAt(0).toUpperCase()}
      </Avatar>
      <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
        {currentUser}
      </Typography>
      <Button variant="contained" size="small" onClick={() => setOpen(true)}>
        My Members
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Select a User</DialogTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            gap: 1,
            alignItems: "center",
          }}
        >
          {users.map((user: User) => (
            <Button
              key={user.id}
              onClick={() => {
                setCurrentUser(user.name);
                setUser(user);
                setOpen(false);
              }}
              variant="contained"
              size="small"
              sx={{
                justifyContent: "center",
                textTransform: "none",
                width: "200px",
              }}
            >
              {user.name}
            </Button>
          ))}
        </Box>
      </Dialog>
    </div>
  );
};

export default TopBar;
