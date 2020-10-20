import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  const [randomPuppy, setRandomPuppy] = useState(null);
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random", { method: "GET" })
      .then((resp) => resp.json())
      .then((resp) => setRandomPuppy(resp.message));
  }, []);
  
  return (
    <>
      <Typography>
        Ruh-Roh, you're not supposed to be here. Click on the doggy to go home.
      </Typography>
      <Link to="/">{randomPuppy && <img width={400} height={400} src={randomPuppy} alt="issa puppy" />}</Link>
    </>
  );
};
