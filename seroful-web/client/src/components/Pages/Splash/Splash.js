import React, { Fragment, useEffect, useState } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";

import firebase from "firebase/app";
import "firebase/firestore";
import * as api from "../../../util/api";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  TextField,
  Checkbox,
} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import { useSetRecoilState, useRecoilState } from "recoil";
import { newUser, userState } from "../../../store/store";

export const Splash = () => {
  const unfilled = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const filled = <CheckBoxIcon fontSize="small" />;

  const setNewUser = useSetRecoilState(newUser);

  const [logOne, setLogOne] = useState(true);
  const [logTwo, setLogTwo] = useState(false);

  const [illnesses, setIllnesses] = useState([]);
  const [userIllnesses, setUserIllness] = useRecoilState(userState);

  const handleFirst = () => {
    setLogTwo(true);
    setLogOne(false);
  };

  const handleSecond = () => {
    api.updateUser(userIllnesses)
    setNewUser(false);
  }
  useEffect(() => {
    let illnessList = [];
    firebase
      .firestore()
      .collection("illnesses")
      .get()
      .then((query) => query.forEach((doc) => illnessList.push(doc.data())))
      .catch((err) => console.log(err));
    setIllnesses((i) => (i = illnessList));
  }, []);

  const handleMedName = (ev) => {
    const newVal = ev.target.value.split(`\n`);

    for (let i = 0; i < newVal.length; i++) {
      setUserIllness(
        (x) =>
          (x = {
            ...x,
            medicines: [
              ...x.medicines,
              {
                name: newVal[i],
                freq: 0,
              },
            ],
          })
      );
    }
    console.log(userIllnesses);
  };
  // TODO: FIX THEME INCONSISTENCIES (see login)
  return (
    <>
      {logOne && (
        <Dialog
          open={logOne}
          onClose={() => setLogOne(false)}
          aria-labelledby="title"
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle id="title">Additional Information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Thank you for registering! In order to best serve your Seroful
              experience, we would like to add some additional information about
              any medicines and mental illnesses you might have. Would you like
              to add this information now? You can opt to add it later, or not
              at all.
              <br />
              <Typography variant="caption">
                This information is strictly confidential, only you can see it!
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              style={{ textTransform: "capitalize" }}
              onClick={() => setNewUser(false)}
            >
              No Thanks
            </Button>
            <Button
              variant="contained"
              style={{ textTransform: "capitalize" }}
              onClick={() => handleFirst()}
            >
              Let's Go
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {logTwo && (
        <Dialog
          open={logTwo}
          onClose={() => setLogTwo(false)}
          aria-labelledby="title"
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle id="title">Additional Information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Thank you so much! You can add as many options below as you'd
              like. Pressing cancel will take no action and no information will
              be taken in.
            </DialogContentText>
            <Autocomplete
              multiple
              id="illnesses"
              options={illnesses}
              disableCloseOnSelect
              getOptionLabel={(i) => i.illness}
              renderOption={(i, { selected }) => (
                <>
                  <Checkbox
                    icon={unfilled}
                    style={{ marginRight: 8 }}
                    checkedIcon={filled}
                    checked={selected}
                  />
                  {i.illness}
                </>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Illnesses (Select Multiple)"
                  placeholder="Illnesses"
                />
              )}
              onChange={(ev, val) =>
                setUserIllness((x) => (x = { ...x, illnesses: val }))
              }
            />
            <TextField
              multiline
              helperText="Put each medicine on a new line!"
              type="array"
              label="Medicines (Separate each on a new line)"
              placeholder="Medicines"
              onBlur={(ev) => handleMedName(ev)}
              fullWidth
              variant="filled"
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              style={{ textTransform: "capitalize" }}
              onClick={() => setNewUser(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{ textTransform: "capitalize" }}
              onClick={() => handleSecond()}
            >
              Finish
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
