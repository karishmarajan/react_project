import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  Container,
  Grid,
  IconButton,
} from "@material-ui/core";
import React from "react";
import { useState, useContext, useEffect } from "react";
import MyContext from "../context/appContext";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { commonDelete, commonGet } from "../apiServices/Fetch";
import URL from "../constants/Urls";
import { useNavigate } from "react-router-dom";
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
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

const HomeScreen = (props) => {
  const [list, setList] = useState([]);
  const { userToken } = useContext(MyContext);
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    getUserContacts();
  }, []);

  const getUserContacts = async () => {
    const res = await commonGet(URL.user_contacts);
    if (res.status === 200) {
      setList(res.data);
    } else {
      alert("Something went wrong");
    }
  };

  const handleDeleteContact = async (id) => {
    console.log("id -->" + id);
    const res = await commonDelete(URL.user_contacts_delete + id);
    if (res.status === 200) {
      alert("Data deleted successfully");
      getUserContacts();
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {list.map((t) => {
        return (
          <Card
            key={t.id}
            sx={{ maxWidth: 345 }}
            style={{
              backgroundColor: "yellow",
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              margin: "10px 10px",
            }}
            sm={12}
            md={3}
            
          >
            <CardHeader
              avatar={<Avatar className={classes.avatar}>P</Avatar>}
              title={`${t.firstName} ${t.lastName}`}
              subheader={`${t.dob}`}
              action={
                <IconButton onClick={() => navigate("/view_contact", { state: { id: t.id } })}>
                  <ArrowForwardIosIcon />
                </IconButton>
              }
            />
            <CardActions disableSpacing>
        <IconButton onClick={() => handleDeleteContact(t.id)} >
        <DeleteIcon />
        </IconButton>
       
      </CardActions>
          </Card>
        );
      })}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => navigate("/new_contact")}
      >
        Add New Contact
      </Button>
    </Container>
  );
};

export default HomeScreen;
