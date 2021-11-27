import React, { useState, useEffect } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Time from './components/Time';
import { makeStyles } from '@material-ui/styles';
import { Container, Button } from '@material-ui/core';

function App() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimeOn] = useState(false);

  useEffect(() => {
    const unsubscribe = new Subject();
    const observable$ = interval(1000)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (timerOn) {
          setTime((el) => el + 1);
        }
      });

    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [timerOn]);

  const useStyles = makeStyles({
    root: {
      minWidth: "300px",
      margin: "auto",
      width: "500px"
    },
    container: {
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontSize: "70px",
      color: "rgb(180, 0, 0)"
    },
    start: {
      color: "rgb(180, 0, 0)",
      backgroundColor: "black",
      border: "1px solid rgb(68, 13, 13)",
      boxShadow: "0 0 5px rgb(68, 13, 13)",
      height: 48,
      padding: "10px 30px",
      fontWeight: 500,
      fontSize: 22
    },
    stop: {
      color: "rgb(180, 0, 0)",
      backgroundColor: "black",
      border: "1px solid rgb(68, 13, 13)",
      boxShadow: "0 0 5px rgb(68, 13, 13)",
      height: 48,
      padding: "10px 30px",
      fontWeight: 500,
      fontSize: 22,
      marginRight: 15
    },
    reset: {
      color: "rgb(180, 0, 0)",
      backgroundColor: "black",
      border: "1px solid rgb(68, 13, 13)",
      boxShadow: "0 0 5px rgb(68, 13, 13)",
      height: 48,
      padding: "10px 30px",
      fontWeight: 500,
      fontSize: 22,
      marginLeft: 15
    }
  });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="sm">
        <div><Time time={time} /></div>
        <div className="buttons">
          {!timerOn && time === 0 && (
            <Button onClick={() => setTimeOn(true)} className={classes.start}>Start</Button>
            )}
            {(time || timerOn) && (
              <Button onClick={function () {setTimeOn(false); setTime(0);}} className={classes.stop}>Stop</Button>
              )}
              {(time || timerOn) && (
                <Button onDoubleClick={function doubleClick() {setTimeOn(false);}} onClick={function () {if (time > 0) {setTimeOn(true);}}} className={classes.start}>
                {timerOn ? "Wait" : "Start"}
                </Button>
                )}
                {(time || timerOn) && (
                  <Button onClick={() => setTime(0)} className={classes.reset}>Reset</Button>
                  )}
        </div>
      </Container>
    </div>
  );
}

export default App;
