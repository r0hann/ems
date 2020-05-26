import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

export default function LinearLoading() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ position: 'fixed', top: '0',zIndex:1001, width:'100%' }}>
      <LinearProgress color='secondary' />
    </div>
  );
}
