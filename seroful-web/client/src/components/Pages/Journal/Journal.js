import React, { createRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { journalStyles } from "../../../styles/journalStyles";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../../store/store";
import { createEntry, getEntries } from "../../../util/api";

import { Button, TextField, Typography } from "@material-ui/core";

import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { responsiveFontSizes, withStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import "firebase/auth";

let ent = "";
export const Journal = () => {
  const styles = journalStyles();
  const Accordion = withStyles({
    root: {
      border: "1px solid rgba(0, 0, 0, .125)",
      boxShadow: "none",
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&:before": {
        display: "none",
      },
      "&$expanded": {
        margin: "auto",
      },
    },
    expanded: {},
  })(MuiAccordion);

  const AccordionSummary = withStyles({
    root: {
      backgroundColor: "rgba(0, 0, 0, .03)",
      borderBottom: "1px solid rgba(0, 0, 0, .125)",
      marginBottom: -1,
      minHeight: 56,
      "&$expanded": {
        minHeight: 56,
      },
    },
    content: {
      "&$expanded": {
        margin: "12px 0",
      },
    },
    expanded: {},
  })(MuiAccordionSummary);

  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);

  const [expanded, setExpanded] = useState("panel-0");
  const [isUpdated, setUpdated] = useState(false);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [user, setUser] = useRecoilState(userState);
  console.log(user)

  useEffect(() => {
    return async () => {
      await getEntries().then((resp) => {
        console.log(resp);
        setUser((x) => (x = { ...x, journals: resp }));
        setUpdated(false);
      });
    };
  }, [isUpdated]);

  const inputRef = createRef();
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
        <div className={styles.inter}>
          <div className={styles.pastEntries}>
            {
              //TODO: instance.get(all of users entries and map through them to return these bastards on one side, new entry on the others)
            }
            {user.journals&&user.journals.map((x, i) => {
              const newDate = new Date(x.timestamp).toString();
              return (
                <Accordion
                  square
                  expanded={expanded === `panel-${i}`}
                  onChange={handleChange(`panel-${i}`)}
                >
                  <AccordionSummary
                    aria-controls={`panel${i}-content`}
                    id={`panel${i}-header`}
                  >
                    <Typography>{`${newDate.split(" ")[1]} ${
                      newDate.split(" ")[2]
                    } ${newDate.split(" ")[4]}`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {console.log(x)}
                      {x.entry}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
          <div className={styles.form}>
            <form>
              <TextField
                label="New Entry"
                type="text"
                variant="filled"
                className={styles.newEntry}
                multiline
                inputRef={inputRef}
              />
              <br />
              <Button
                className={styles.submit}
                variant="contained"
                onClick={(ev) => {
                  ev.persist();
                  createEntry(inputRef.current.value);
                  setUpdated(true);
                }}
              >
                Add Journal Entry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
