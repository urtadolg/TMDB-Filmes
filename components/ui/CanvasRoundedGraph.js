import React, { useEffect, useRef, useState } from "react";
import styles from "./CanvasRoundedGraph.module.scss";
import makeGraph from "../../utils/useCanvas";

const CanvasRoundedGraph = (props) => {
  let vote_average = props.percentage;
  let display = `${vote_average.toFixed()}%`;

  if (isNaN(vote_average)) {
    vote_average = 0;
    display = "NA";
  }

  useEffect(() => {
    makeGraph(vote_average);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <span id="vote_average" className={styles.vote_average}>
          {display}
        </span>
        <canvas width="65" height="65" id="vote_average_graph" />
      </div>
    </>
  );
};

export default CanvasRoundedGraph;
