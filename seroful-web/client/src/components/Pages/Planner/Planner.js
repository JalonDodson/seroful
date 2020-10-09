import React, { useState } from "react";
import { Helmet } from "react-helmet";

import {
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";

import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { plannerStyles } from "../../../styles/plannerStyles";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/store";

export const Planner = (props) => {
  const [activeUser, setUser] = useRecoilState(userState);
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
      <div className={styles.accordions}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handlePanel("panel1")}
          className={styles.accordion}
        >
          <AccordionSummary aria-controls="panel1-content" id="panel1">
            <Typography>Yesterday's Planner</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
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
              8:30 AM: Eat breakfast<br />
              9:00 AM: Start school<br />
              9:30 AM: Take a break<br />
              9:45 AM: Resume school<br />
              10:45 AM: Take a break<br />
              11:00 AM: Resume school<br />
              12:00 PM: Lunch break<br />
              12:10 PM: Resume school<br />
              12:30 PM: Finish school day<br />
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
            <Typography>Tomorrow's Planner</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};
