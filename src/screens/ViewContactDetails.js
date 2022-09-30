import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { useLocation } from "react-router";
import URL from "../constants/Urls";
import { commonGet } from "../apiServices/Fetch";

const ViewContactDetails = () => {
  const data = useLocation();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (data != null) {
      getUserDetails(data.state.id);
    }
  }, []);

  const getUserDetails = async (id) => {
    console.log("id " + id);
    const res = await commonGet(URL.user_contacts_view + id);
    if (res.status === 200) {
      setUserData(res.data);
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        margin: "40px",
        backgroundColor: "ButtonShadow",
      }}
    >
      <ListItem>
        <ListItemText
          primary="Name"
          secondary={userData?.firstName ? userData.firstName : ""}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="NickName"
          secondary={userData?.nickName ? userData.nickName : ""}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Date of birth"
          secondary={userData?.dob ? userData.dob : ""}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Email"
          secondary={userData?.emails[0] ? userData.emails[0] : ""}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Phone"
          secondary={userData?.phones[0] ? userData.phones[0] : ""}
        />
      </ListItem>
    </List>
  );
};

export default ViewContactDetails;