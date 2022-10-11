import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import {  useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import URL from "../constants/Urls";
import { commonGet } from "../apiServices/Fetch";
import { Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ViewContactDetails = () => {
  const classes = useStyles();
  const data = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (data != null) {
      getUserDetails(data.state.id);
    }
  }, []);

  const getUserDetails = async (id) => {
    const res = await commonGet(URL.user_contacts_view + id);
    if (res.status === 200) {
      setUserData(res.data);
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <Container maxWidth="xs">
    <List
      sx={{
        width: "100%",
        backgroundColor: "ButtonShadow",
        marginTop:"40px"
      }}
    >
      <ListItem>
        <ListItemText
          primary="Name"
          secondary={userData?.firstName ? userData.firstName : ""}
          secondaryTypographyProps={{color:'blueviolet'}}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="NickName"
          secondary={userData?.nickName ? userData.nickName : ""}
          secondaryTypographyProps={{color:'blueviolet'}}

        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Date of birth"
          secondary={userData?.dob ? userData.dob : ""}
          secondaryTypographyProps={{color:'blueviolet'}}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Email"
          secondary={userData?.emails[0] ? userData.emails[0] : ""}
          secondaryTypographyProps={{color:'blueviolet'}}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Phone"
          secondary={userData?.phones[0] ? userData.phones[0] : ""}
          secondaryTypographyProps={{color:'blueviolet'}}
        />
      </ListItem>
    </List>

    <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() =>
                navigate("/edit_contact", { state: { data: userData } })}
            >
              Edit
            </Button>
    </Container>
  );
};

export default ViewContactDetails;
