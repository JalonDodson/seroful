import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { journalStyles } from "../../../styles/journalStyles";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../../../store/store";
import { createEntry } from '../../../util/api';

import {
  Button,
  TextField,
  Typography,
} from "@material-ui/core";

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { withStyles } from '@material-ui/core/styles';
import firebase from "firebase/app";
import "firebase/auth";

let ent = '';
export const Journal = () => {
  const styles = journalStyles();
  const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);

  const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary);

  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);

  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [user, setUser] = useRecoilState(userState);
  console.log(user);

  const entries = [];

  const getEntries = async (id) => {
    // const entries = await firebase.firestore().collection('users').get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     doc.userID === user.id ? entries.push(doc) : null;
    //   })
    // });
  };
  const entryHelper = () => {};

   const assignNewEntry = (val) => {
     //TODO: api call to send the thing
     ent = val;

    console.log(ent)
   };

  return (
    <>
      <Helmet>
        <title>Seroful - Journal</title>
      </Helmet>
      <PageDrawer />
      <div className={styles.container}>
        <header className={styles.header}>
          <hr />
          <Typography variant="h3" className={styles.title}>
            {user.displayName}'s Journal Entries
          </Typography>
          <hr />
        </header>
        <div>
          {//TODO: instance.get(all of users entries and map through them to return these bastards on one side, new entry on the others)
          }
            <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>Collapsible Group Item #1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
              </AccordionDetails>
            </Accordion>        
            </div>
        <br />
        <br />
        <form className={styles.form}>
          <TextField
            label="New Entry"
            type="text"
            variant="filled"
            className={styles.newEntry}
            onChange={(ev) => assignNewEntry(ev.target.value)}
          />
          <br />
          <Button
            variant="contained"
            onClick={() => (createEntry(ent))}
          >Add Journal Entry</Button>
        </form>
      </div>
    </>
  );
};
