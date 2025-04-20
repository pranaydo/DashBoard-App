import { Button, Dialog, DialogTitle, ButtonGroup, Box } from "@mui/material";
import React, { useState } from "react";
import { users } from "../mockData/MockData";
import { User } from "../type/types";
import { useUser } from "../context/UserContext";
const TopBar: React.FC = () => {
  const { user, setUser } = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>(user.name);

  // console.log(user);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {currentUser}
        <Button
          style={{ marginTop: "5px" }}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          My Members
        </Button>
        {/* {currentUser} Will show current user in something like avtar  */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogTitle>Select a User</DialogTitle>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 2,
              gap: 1,
            }}
          >
            {users.map((user: User) => (
              <Button
                key={user.id}
                onClick={() => {
                  console.log("Selected user data:", user);
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
                  alignSelf: "center",
                }}
              >
                {user.name}
              </Button>
            ))}
          </Box>
        </Dialog>
      </div>
    </div>
  );
};
export default TopBar;
