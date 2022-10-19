import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { authorizedCommonPut } from "../apiServices/Fetch";
import URL from "../constants/Urls";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import { useLocation } from "react-router";

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

const EditContactDetails = () => {
  const navigate = useNavigate();
  const data = useLocation();
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phones: "",
    emails: "",
  });

  useEffect(() => {
    if (data != null) {
      setValues({
        firstName: data.state.data.firstName,
        lastName: data.state.data.lastName,
        nickName: data.state.data.nickName,
        dob: data.state.data.dob,
        address: data.state.data.address,
        city: data.state.data.city,
        state: data.state.data.state,
        country: data.state.data.country,
        zipCode: data.state.data.zipCode,
        phones: data.state.data.phones,
        emails: data.state.data.emails,
      });
      console.log("data----" + JSON.stringify(data.state));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // values.phones = [values.phones]
    // values.emails = [values.emails]
    const res = await authorizedCommonPut(
      URL.user_contacts_edit + data.state.data.id,
      values
    );
    if (res.status === 200) {
      alert("Edited successfully");
      navigate("/home");
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container
        component="main"
        maxWidth="lg"
        style={{ backgroundColor: "ButtonShadow" }}
      >
        <CssBaseline />
        <Typography variant="h4" className="head-style">
          EDIT
        </Typography>
        <div className={classes.paper}>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="firstName"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstname"
                  label="FirstName"
                  // autoFocus
                  value={values.firstName ? values.firstName : ""}
                  onChange={(e) =>
                    setValues({ ...values, firstName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="lastName"
                  name="lastName"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="LastName"
                  autoFocus
                  value={values.lastName ? values.lastName : ""}
                  onChange={(e) =>
                    setValues({ ...values, lastName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="nickName"
                  name="nickName"
                  variant="outlined"
                  fullWidth
                  id="nickName"
                  label="NickName"
                  autoFocus
                  value={values.nickName ? values.nickName : ""}
                  onChange={(e) =>
                    setValues({ ...values, nickName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DesktopDatePicker
                  label="DOB"
                  inputFormat="MM/DD/YYYY"
                  value={values.dob ? values.dob : ""}
                  onChange={(e) => {
                    setValues({...values, dob:moment(new Date(e)).format('DD/MM/yyyy').toString()} );
                    alert(e);
                    console.log(moment(new Date(e)).format('DD/MM/yyyy'))
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" fullWidth />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="address"
                  name="address"
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  autoFocus
                  value={values.address ? values.address : ""}
                  onChange={(e) =>
                    setValues({ ...values, address: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="city"
                  name="city"
                  variant="outlined"
                  fullWidth
                  id="city"
                  label="City"
                  autoFocus
                  value={values.city ? values.city : ""}
                  onChange={(e) =>
                    setValues({ ...values, city: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="state"
                  name="state"
                  variant="outlined"
                  fullWidth
                  id="state"
                  label="State"
                  autoFocus
                  value={values.state ? values.state : ""}
                  onChange={(e) =>
                    setValues({ ...values, state: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="country"
                  name="country"
                  variant="outlined"
                  fullWidth
                  id="country"
                  label="Country"
                  autoFocus
                  value={values.country ? values.country : ""}
                  onChange={(e) =>
                    setValues({ ...values, country: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="zipCode"
                  name="zipCode"
                  variant="outlined"
                  fullWidth
                  id="zipCode"
                  label="zipCode"
                  autoFocus
                  value={values.zipCode ? values.zipCode : ""}
                  onChange={(e) =>
                    setValues({ ...values, zipCode: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="phone"
                  label="PhoneNumber"
                  type="tel"
                  id="phone"
                  autoFocus
                  value={values.phones ? values.phones : ""}
                  onChange={(e) =>
                    setValues({ ...values, phones: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={values.emails ? values.emails : ""}
                  onChange={(e) =>
                    setValues({ ...values, emails: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Edit
            </Button>
          </form>
        </div>
      </Container>
    </LocalizationProvider>
  );
};

export default EditContactDetails;
