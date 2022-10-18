import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { useNavigate } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { authorizedCommonPost } from "../apiServices/Fetch";
import URL from "../constants/Urls";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";

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

const AddNewContact = () => {
  const navigate = useNavigate();
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
    zipCode: null,
    phones: "",
    emails: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    values.phones = [values.phones];
    values.emails = [values.emails];
    console.log("values "+JSON.stringify(values))
    const res = await authorizedCommonPost(URL.user_contacts, values);
    if (res.status === 200) {
      alert("Added successfully");
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
          NEW CONTACT
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
                  autoFocus
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
                  onChange={(e) =>
                    setValues({ ...values, nickName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DesktopDatePicker
                disableFuture
                  label="DOB"
                  inputFormat="MM/DD/YYYY"
                  value={values.dob}
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
              Add
            </Button>
          </form>
        </div>
      </Container>
    </LocalizationProvider>
  );
};

export default AddNewContact;
