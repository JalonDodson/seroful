import React, { useEffect, useState, Fragment } from "react";
import { Helmet } from "react-helmet";

import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  MenuItem,
  Typography,
  Divider,
  TextField,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";

import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { plannerStyles } from "../../../styles/plannerStyles";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/store";
import {
  CheckCircle,
  CheckCircleOutline,
  // Favorite,
  // FavoriteBorder,
  // SettingsRemoteSharp,
} from "@material-ui/icons";
import * as api from "../../../util/api";

export const Planner = (props) => {
  const [activeUser, setUser] = useRecoilState(userState);

  const [selectOpen, setOpen] = useState(false);
  const [selectHwOpen, setHwOpen] = useState(false);
  const [selectBrkCntOpen, setBrkCntOpen] = useState(false);
  const [selectBrkDurOpen, setBrkDurOpen] = useState(false);
  const [selectBreakfastOpen, setBreakfastOpen] = useState(false);
  const [selectLunchOpen, setLunchOpen] = useState(false);
  const [selectDinnerOpen, setDinnerOpen] = useState(false);
  const [selectApptOpen, setApptOpen] = useState(false);

  const [userPlan, setPlan] = useState({
    dayLength: 1,
    homework: 0,
    mealtimes: {
      breakfast: 8,
      lunch: 11,
      dinner: 16,
    },
    breaks: {
      count: 2,
      durations: 0.25,
    },
    appt: 0,
    goals: [
    ],
  });

  const [expanded, setExpanded] = useState("panel1");
  const handlePanel = (panel) => (ev, newEx) =>
    setExpanded(newEx ? panel : false);
  // very basic, just placeholders. don't look. too ugly
  const styles = plannerStyles();

  const [isUpdated, setUpdated] = useState(false);

  useEffect(() => {
    return async () => {
      await api.getPlans().then((resp) => {
        console.log(resp);
        setUser((x) => (x = { ...x, plans: resp }));
        setUpdated(false);
      });
    };
    //eslint-disable-next-line
  }, [isUpdated]);
  return (
    <>
      <Helmet>
        <title>Seroful - {`${activeUser.displayName}'s`} Planner</title>
      </Helmet>
      <PageDrawer />
      <div className={styles.newPlanner}>
        <Paper elevation={3} className={styles.planner}>
          <FormControl className={styles.formControl}>
            <InputLabel id="select-length">School Day Length</InputLabel>
            <Select
              open={selectOpen}
              labelId="select-length"
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              value={userPlan.dayLength}
              style={{ width: "150px" }}
              onChange={(ev) =>
                setPlan((x) => (x = { ...x, dayLength: ev.target.value }))
              }
            >
              <MenuItem value={1}>1 Hours</MenuItem>
              <MenuItem value={2}>2 Hours</MenuItem>
              <MenuItem value={3}>3 Hours</MenuItem>
              <MenuItem value={4}>4 Hours</MenuItem>
              <MenuItem value={5}>5 Hours</MenuItem>
              <MenuItem value={6}>6 Hours</MenuItem>
              <MenuItem value={7}>7 Hours</MenuItem>
              <MenuItem value={8}>8 Hours</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={styles.formControl}>
            <InputLabel id="select-assignments">Assignments</InputLabel>
            <Select
              open={selectHwOpen}
              labelId="select-assignments"
              onClose={() => setHwOpen(false)}
              onOpen={() => setHwOpen(true)}
              value={userPlan.homework}
              style={{ width: "150px" }}
              onChange={(ev) =>
                setPlan((x) => (x = { ...x, homework: ev.target.value }))
              }
            >
              <MenuItem value={0}>0 assignments</MenuItem>
              <MenuItem value={1}>1 assignment</MenuItem>
              <MenuItem value={2}>2 assignments</MenuItem>
              <MenuItem value={3}>3 assignments</MenuItem>
              <MenuItem value={4}>4 assignments</MenuItem>
              <MenuItem value={5}>5 assignments</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={styles.formControl}>
            <InputLabel id="select-appointments">Appointments</InputLabel>
            <Select
              open={selectApptOpen}
              labelId="select-appointments"
              onClose={() => setApptOpen(false)}
              onOpen={() => setApptOpen(true)}
              value={userPlan.appt}
              style={{ width: "150px" }}
              onChange={(ev) =>
                setPlan((x) => (x = { ...x, appt: ev.target.value }))
              }
            >
              <MenuItem value={0}>0/None</MenuItem>
              <MenuItem value={1}>1 Hour</MenuItem>
              <MenuItem value={2}>2 Hours</MenuItem>
              <MenuItem value={3}>3 Hours</MenuItem>
              <MenuItem value={4}>4 Hours</MenuItem>
            </Select>
          </FormControl>
          <br />
          <FormControl className={styles.formControl}>
            <InputLabel id="select-breakcount"># of Breaks</InputLabel>
            <Select
              open={selectBrkCntOpen}
              labelId="select-breakcount"
              onClose={() => setBrkCntOpen(false)}
              onOpen={() => setBrkCntOpen(true)}
              value={userPlan.breaks.count}
              style={{ width: "150px" }}
              onChange={(ev) =>
                setPlan(
                  (x) =>
                    (x = {
                      ...x,
                      breaks: { ...x.breaks, count: ev.target.value },
                    })
                )
              }
            >
              <MenuItem value={2}>2 breaks</MenuItem>
              <MenuItem value={3}>3 breaks</MenuItem>
              <MenuItem value={4}>4 breaks</MenuItem>
              <MenuItem value={5}>5 breaks</MenuItem>
              <MenuItem value={6}>6 breaks</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={styles.formControl}>
            <InputLabel id="select-breakduration">Break Duration</InputLabel>
            <Select
              open={selectBrkDurOpen}
              labelId="select-breakduration"
              onClose={() => setBrkDurOpen(false)}
              onOpen={() => setBrkDurOpen(true)}
              value={userPlan.breaks.durations}
              style={{ width: "150px" }}
              onChange={(ev) =>
                setPlan(
                  (x) =>
                    (x = {
                      ...x,
                      breaks: { ...x.breaks, durations: ev.target.value },
                    })
                )
              }
            >
              <MenuItem value={0.25}>15 Minutes</MenuItem>
              <MenuItem value={0.5}>30 Minutes</MenuItem>
              <MenuItem value={0.75}>45 Minutes</MenuItem>
              <MenuItem value={1}>1 Hour</MenuItem>
              <MenuItem value={1.25}>1 1/4 Hours</MenuItem>
              <MenuItem value={1.5}>1 1/2 Hours</MenuItem>
            </Select>
          </FormControl>
          <br />
          <FormControl className={styles.formControl}>
            <InputLabel id="select-breakfast">Breakfastime</InputLabel>
            <Select
              open={selectBreakfastOpen}
              labelId="select-breakduration"
              onClose={() => setBreakfastOpen(false)}
              onOpen={() => setBreakfastOpen(true)}
              value={userPlan.mealtimes.breakfast}
              style={{ width: "150px" }}
              onChange={(ev) =>
                setPlan(
                  (x) =>
                    (x = {
                      ...x,
                      mealtimes: { ...x.mealtimes, breakfast: ev.target.value },
                    })
                )
              }
            >
              <MenuItem value={8}>8:00 AM</MenuItem>
              <MenuItem value={8.5}>8:30 AM</MenuItem>
              <MenuItem value={9}>9:00 AM</MenuItem>
              <MenuItem value={9.5}>9:30 AM</MenuItem>
              <MenuItem value={10}>10:00 AM</MenuItem>
              <MenuItem value={10.5}>10:30 AM</MenuItem>
              <MenuItem value={11}>11:00 AM</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={styles.formControl}>
            <InputLabel id="select-lunch">Lunchtime</InputLabel>
            <Select
              open={selectLunchOpen}
              labelId="select-lunch"
              onClose={() => setLunchOpen(false)}
              onOpen={() => setLunchOpen(true)}
              value={userPlan.mealtimes.lunch}
              style={{ width: "150px" }}
              onChange={(ev) =>
                setPlan(
                  (x) =>
                    (x = {
                      ...x,
                      mealtimes: { ...x.mealtimes, lunch: ev.target.value },
                    })
                )
              }
            >
              <MenuItem value={11}>11:00 AM</MenuItem>
              <MenuItem value={11.5}>11:30 AM</MenuItem>
              <MenuItem value={12}>12:00 PM</MenuItem>
              <MenuItem value={12.5}>12:30 PM</MenuItem>
              <MenuItem value={13}>1:00 PM</MenuItem>
              <MenuItem value={13.5}>1:30 PM</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={styles.formControl}>
            <InputLabel id="select-dinner">Dinnertime</InputLabel>
            <Select
              open={selectDinnerOpen}
              labelId="select-dinner"
              onClose={() => setDinnerOpen(false)}
              onOpen={() => setDinnerOpen(true)}
              value={userPlan.mealtimes.dinner}
              style={{ width: "150px" }}
              onChange={(ev) =>
                setPlan(
                  (x) =>
                    (x = {
                      ...x,
                      mealtimes: { ...x.mealtimes, dinner: ev.target.value },
                    })
                )
              }
            >
              <MenuItem value={16}>4:00 PM</MenuItem>
              <MenuItem value={16.5}>4:30 PM</MenuItem>
              <MenuItem value={17}>5:00 PM</MenuItem>
              <MenuItem value={17.5}>5:30 PM</MenuItem>
              <MenuItem value={18}>6:00 PM</MenuItem>
              <MenuItem value={18.5}>6:30 PM</MenuItem>
              <MenuItem value={19}>7:00 PM</MenuItem>
              <MenuItem value={19.5}>7:30 PM</MenuItem>
              <MenuItem value={20}>8:00 PM</MenuItem>
            </Select>
          </FormControl>
          <br />
          <form className={styles.fields} noValidate autoComplete="off">
            <TextField
              id="goal1"
              label="First Goal"
              value={userPlan.goals.first}
              onBlur={(ev) => {
                const value = ev.target.value;
                value !== "" &&
                setPlan(
                  (x) => (x = { ...x, goals: [ ...x.goals, { first: value }] })
                );
              }}
            />
            <br />
            <TextField
              id="goal2"
              label="Second Goal"
              value={userPlan.goals.second}
              onBlur={(ev) => {
                const value = ev.target.value;
                value !== "" &&
                setPlan(
                  (x) => (x = { ...x, goals: [ ...x.goals, { second: value }] })
                );
              }}
            />
            <br />
            <TextField
              id="goal3"
              label="Third Goal"
              value={userPlan.goals.third}
              onBlur={(ev) => {
                const value = ev.target.value;
                value !== "" &&
                setPlan(
                  (x) => (x = { ...x, goals: [ ...x.goals, { third: value }] })
                );
              }}
            />
          </form>
          <Button
            variant="contained"
            style={{ float: "right" }}
            onClick={() => {
              api.createPlan(userPlan);
              api.addGoals(userPlan.goals);
              setPlan(
                (x) =>
                  (x = {
                    dayLength: 1,
                    homework: 0,
                    mealtimes: {
                      breakfast: 8,
                      lunch: 11,
                      dinner: 16,
                    },
                    breaks: {
                      count: 2,
                      durations: 0.25,
                    },
                    appt: 0,
                    goals: {
                      first: "",
                      second: "",
                      third: "",
                    },
                  })
              );
              setUpdated(true);
            }}
          >
            Submit
          </Button>
        </Paper>
      </div>
      <div className={styles.accordions}>
        {activeUser.plans &&
          activeUser.plans.map((x, i) => {
            const date = new Date(x.timestamp).toString();
            console.log(x);
            return (
              <Fragment key={i}>
              <Accordion
                expanded={expanded === `panel-${i}`}
                onChange={handlePanel(`panel-${i}`)}
                className={styles.accordion}
              >
                <AccordionSummary
                  aria-controls={`panel${i}-content`}
                  id={`panel-${i}`}
                >
                  <Typography>{`${date.split(" ")[1]} ${date.split(" ")[2]} ${
                    date.split(" ")[4]
                  }`}</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Typography>
                    Today's Goals:
                    </Typography>
                    <List dense component="div" role="list">
                      <ListItem key={`${i}-goal1`} role="listitem">
                        <ListItemIcon>
                          <Checkbox
                            checked={false}
                            icon={<CheckCircleOutline />}
                            checkedIcon={
                              <CheckCircle style={{ color: "green" }} />
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          id="test2"
                          primary={
                            <i>
                              {x.goals && x.goals[0].first
                                ? x.goals[0].first
                                : "No Goal Listed!"}
                            </i>
                          }
                        />
                      </ListItem>
                      <ListItem key={`${i}-goal2`} role="listitem">
                        <ListItemIcon>
                          <Checkbox
                            checked={false}
                            icon={<CheckCircleOutline />}
                            checkedIcon={
                              <CheckCircle style={{ color: "green" }} />
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          id="test2"
                          primary={
                            <i>
                              {x.goals && x.goals[1].second
                                ? x.goals[1].second
                                : "No Goal Listed!"}
                            </i>
                          }
                        />
                      </ListItem>
                      <ListItem key={`${i}-goal3`} role="listitem">
                        <ListItemIcon>
                          <Checkbox
                            checked={false}
                            icon={<CheckCircleOutline />}
                            checkedIcon={
                              <CheckCircle style={{ color: "green" }} />
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          id="test2"
                          primary={
                            <i>
                              {x.goals && x.goals[2].third
                                ? x.goals[2].third
                                : "No Goal Listed!"}
                            </i>
                          }
                        />
                      </ListItem>
                    </List>
                    {/* do something with the rest of the data */}
                </AccordionDetails>
              </Accordion>
              </Fragment>
            );
          })}
      </div>
    </>
  );
};
