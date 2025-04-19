import { Button, Dialog, DialogTitle, ButtonGroup, Box } from "@mui/material";
import { useState } from "react";
import { users } from "../mockData/MockData";
import { User } from "../type/types";
import { useUser } from "../context/UserContext";
const TopBar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>("");
  const { setUser } = useUser();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
          maxWidth="md"
        >
          <DialogTitle>Select a User</DialogTitle>
          <Box
            sx={{
              display: "flex",
              "& > *": {
                m: 1,
              },
            }}
          >
            <ButtonGroup
              orientation="vertical"
              fullWidth
              variant="contained"
              sx={{ padding: 2 }}
            >
              {users.map((user: User) => (
                <Button
                  style={{ paddingRight: "5px" }}
                  key={user.id}
                  onClick={() => {
                    console.log("Selected user data:", user);
                    setCurrentUser(user.name);
                    setUser(user);
                    setOpen(false);
                  }}
                  sx={{ justifyContent: "center", textTransform: "none" }}
                >
                  {user.name}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </Dialog>
      </div>
    </div>
  );
};
export default TopBar;
