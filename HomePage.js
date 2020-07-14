import React from 'react'
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableOfTasks from './TableOfTasks';

const useStyles = makeStyles(() => ({
  paper: {
    width: '80%',
    marginLeft: '10%'
  },
  text: {
    marginTop: '5%',
    marginLeft: '10%'
  }
}));

export default function HomePage() {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h3" gutterBottom className={classes.text}>
        Task managment
      </Typography>
      <Paper className={classes.paper}>
        <TableOfTasks></TableOfTasks>
      </Paper>
    </div>
  )
}


