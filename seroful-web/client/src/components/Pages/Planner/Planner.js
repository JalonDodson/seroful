import React, { useState } from "react";
import { Helmet } from "react-helmet";

import {
  Grid,
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
  Favorite,
  FavoriteBorder,
  SettingsRemoteSharp,
} from "@material-ui/icons";

export const Planner = (props) => {
  const [activeUser, setUser] = useRecoilState(userState);

  const [selectStartOpen, setStartOpen] = useState(false);
  const [startTimes, setStartTimes] = useState("");

  const [selectEndOpen, setEndOpen] = useState(false);
  const [endTimes, setEndTimes] = useState("");

  const [expanded, setExpanded] = useState("panel1");
  const handlePanel = (panel) => (ev, newEx) =>
    setExpanded(newEx ? panel : false);
  // very basic, just placeholders. don't look. too ugly
  const styles = plannerStyles();
  return (
    <>
      <Helmet>
        <title>Seroful - {`${activeUser.displayName}'s`} Planner</title>
      </Helmet>
      <PageDrawer />
      <div className={styles.newPlanner}>
        <Paper elevation="3" className={styles.planner}>
          <FormControl className={styles.formControl}>
            <InputLabel id="select-start">Start Time</InputLabel>
            <Select
              open={selectStartOpen}
              labelId="select-start"
              onClose={() => setStartOpen(false)}
              onOpen={() => setStartOpen(true)}
              value={startTimes}
              onChange={(ev) => setStartTimes(ev.target.value)}
            >
              <MenuItem value="8:00 AM">8:00 AM</MenuItem>
              <MenuItem value="9:00 AM">9:00 AM</MenuItem>
              <MenuItem value="10:00 AM">10:00 AM</MenuItem>
              <MenuItem value="11:00 AM">11:00 AM</MenuItem>
              <MenuItem value="12:00 PM">12:00 PM</MenuItem>
              <MenuItem value="1:00 PM">1:00 PM</MenuItem>
              <MenuItem value="2:00 PM">2:00 PM</MenuItem>
              <MenuItem value="3:00 PM">3:00 PM</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={styles.formControl}>
            <InputLabel id="select-start">End Time</InputLabel>
            <Select
              open={selectEndOpen}
              labelId="select-start"
              onClose={() => setEndOpen(false)}
              onOpen={() => setEndOpen(true)}
              value={endTimes}
              onChange={(ev) => setEndTimes(ev.target.value)}
            >
              <MenuItem value="12:00 PM">12:00 PM</MenuItem>
              <MenuItem value="1:00 PM">1:00 PM</MenuItem>
              <MenuItem value="2:00 PM">2:00 PM</MenuItem>
              <MenuItem value="3:00 PM">3:00 PM</MenuItem>
              <MenuItem value="4:00 PM">4:00 PM</MenuItem>
              <MenuItem value="5:00 PM">5:00 PM</MenuItem>
              <MenuItem value="6:00 PM">6:00 PM</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </div>
      <div className={styles.accordions}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handlePanel("panel1")}
          className={styles.accordion}
        >
          <AccordionSummary aria-controls="panel1-content" id="panel1">
            <Typography>Sept 27 2020</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Typography>
              Today's Goals:
              <List dense component="div" role="list">
                <ListItem key={"test"} role="listitem">
                  <ListItemIcon>
                    <Checkbox
                      checked={false}
                      icon={<CheckCircleOutline />}
                      checkedIcon={<CheckCircle style={{ color: "green" }} />}
                    />
                  </ListItemIcon>
                  <ListItemText id="test2" primary={<i>test</i>} />
                </ListItem>
                <ListItem key={"test"} role="listitem">
                  <ListItemIcon>
                    <Checkbox
                      checked={false}
                      icon={<CheckCircleOutline />}
                      checkedIcon={<CheckCircle style={{ color: "green" }} />}
                    />
                  </ListItemIcon>
                  <ListItemText id="test2" primary={<i>test</i>} />
                </ListItem>
                <ListItem key={"test"} role="listitem">
                  <ListItemIcon>
                    <Checkbox
                      checked={false}
                      icon={<CheckCircleOutline />}
                      checkedIcon={<CheckCircle style={{ color: "green" }} />}
                    />
                  </ListItemIcon>
                  <ListItemText id="test2" primary={<i>test</i>} />
                </ListItem>
              </List>
              <Divider style={{ marginLeft: "-5%", width: "158.5%" }} />
              8:30 AM: Eat breakfast
              <br />
              9:00 AM: Start school
              <br />
              9:30 AM: Take a break
              <br />
              9:45 AM: Resume school
              <br />
              10:45 AM: Take a break
              <br />
              11:00 AM: Resume school
              <br />
              12:00 PM: Lunch break
              <br />
              12:10 PM: Resume school
              <br />
              12:30 PM: Finish school day
              <br />
              Don't forget your doctor's appointment at 1:00 PM!
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handlePanel("panel3")}
          className={styles.accordion}
        >
          <AccordionSummary aria-controls="panel3-content" id="panel3">
            <Typography>Yesterday's Planner</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Today's Goals:
              <List dense component="div" role="list">
                <ListItem key={"test"} role="listitem">
                  <ListItemIcon>
                    <Checkbox
                      checked={false}
                      icon={<CheckCircleOutline />}
                      checkedIcon={<CheckCircle style={{ color: "green" }} />}
                    />
                  </ListItemIcon>
                  <ListItemText id="test2" primary={<i>test</i>} />
                </ListItem>
              </List>
              8:30 AM: Eat breakfast
              <br />
              9:00 AM: Start school
              <br />
              9:30 AM: Take a break
              <br />
              9:45 AM: Resume school
              <br />
              10:45 AM: Take a break
              <br />
              11:00 AM: Resume school
              <br />
              12:00 PM: Lunch break
              <br />
              12:10 PM: Resume school
              <br />
              12:30 PM: Finish school day
              <br />
              Don't forget your doctor's appointment at 1:00 PM!
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handlePanel("panel2")}
          className={styles.accordion}
        >
          <AccordionSummary aria-controls="panel2-content" id="panel2">
            <Typography>Today's Planner</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Today's Goals:
              <List dense component="div" role="list">
                <ListItem key={"test"} role="listitem">
                  <ListItemIcon>
                    <Checkbox
                      checked={false}
                      icon={<CheckCircleOutline />}
                      checkedIcon={<CheckCircle style={{ color: "green" }} />}
                    />
                  </ListItemIcon>
                  <ListItemText id="test2" primary={<i>test</i>} />
                </ListItem>
              </List>
              8:30 AM: Eat breakfast
              <br />
              9:00 AM: Start school
              <br />
              9:30 AM: Take a break
              <br />
              9:45 AM: Resume school
              <br />
              10:45 AM: Take a break
              <br />
              11:00 AM: Resume school
              <br />
              12:00 PM: Lunch break
              <br />
              12:10 PM: Resume school
              <br />
              12:30 PM: Finish school day
              <br />
              Don't forget your doctor's appointment at 1:00 PM!
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};
