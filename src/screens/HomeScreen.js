import {
  Avatar,
  Box,
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
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TableSortLabel } from "@mui/material";

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "nickName",
    numeric: true,
    disablePadding: false,
    label: "Nick Name",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Contact No",
  },
];

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
    const res = await commonDelete(URL.user_contacts_delete + id);
    if (res.status === 200) {
      alert("Data deleted successfully");
      getUserContacts();
    } else {
      alert("Something went wrong");
    }
  };

  return (
   
    // <Container component="main" maxWidth="xs">
    //   {list.map((t) => {
    //     return (
    //       <Card
    //         key={t.id}
    //         sx={{ maxWidth: 345 }}
    //         style={{
    //           backgroundColor: "yellow",
    //           justifyContent: "center",
    //           alignSelf: "center",
    //           alignItems: "center",
    //           margin: "10px 10px",
    //         }}
    //         sm={12}
    //         md={3}

    //       >
    //         <CardHeader
    //           avatar={<Avatar className={classes.avatar}>P</Avatar>}
    //           title={`${t.firstName} ${t.lastName}`}
    //           subheader={`${t.dob}`}
    //           action={
    //             <IconButton onClick={() => navigate("/view_contact", { state: { id: t.id } })}>
    //               <ArrowForwardIosIcon />
    //             </IconButton>
    //           }
    //         />
    //         <CardActions disableSpacing>
    //     <IconButton onClick={() => handleDeleteContact(t.id)} >
    //     <DeleteIcon />
    //     </IconButton>

    //   </CardActions>
    //       </Card>
    //     );
    //   })}
    //   <Button
    //     type="submit"
    //     fullWidth
    //     variant="contained"
    //     color="primary"
    //     className={classes.submit}
    //     onClick={() => navigate("/new_contact")}
    //   >
    //     Add New Contact
    //   </Button>
    // </Container>
    <Container component="main" >
    <Box >
      <Paper >
        <Table
        sx={{ minWidth: 750 }}
        // aria-labelledby="tableTitle"
        // size={"medium"}
        >
          <TableHead style={{backgroundColor:'Highlight'}}>
            <TableRow>
              {headCells.map((h) => {
                return (
                  <TableCell key={h.id} align={"center"} padding={"normal"}>
                    {`${h.label}`}
                  </TableCell>
                );
              })}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
              {list.map((l) => {
                return (
                  <TableRow   key={l.id}>
                    <TableCell
                    style={{color:'blueviolet'}}
                      align={"center"}
                      padding={"normal"}
                    >{`${l.id}`}</TableCell>
                    <TableCell
                     style={{color:'blueviolet'}}
                      align={"center"}
                      padding={"normal"}
                    >{`${l.firstName} ${l.lastName}`}</TableCell>
                    <TableCell
                     style={{color:'blueviolet'}}
                      align={"center"}
                      padding={"normal"}
                    >{`${l.nickName}`}</TableCell>
                    <TableCell
                     style={{color:'blueviolet'}}
                      align={"center"}
                      padding={"normal"}
                    >{`${l.dob}`}</TableCell>
                    <TableCell>
                      {" "}
                      <IconButton  style={{color:'blueviolet'}} onClick={() => handleDeleteContact(l.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <IconButton
                       style={{color:'blueviolet'}}
                        onClick={() =>
                          navigate("/view_contact", { state: { id: l.id } })
                        }
                      >
                        <ArrowForwardIosIcon />
                      </IconButton>
                    </TableCell>
                    </TableRow>
                );
              })}
            
          </TableBody>
        </Table>
      </Paper>
    </Box>
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
