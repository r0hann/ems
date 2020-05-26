import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import DefaultImage from '../../avatar_default.png';
import { Button } from '@material-ui/core';
import ImgUploadDialog from './imgUploadDialog';

const useStyles = makeStyles({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 70,
    height: 70
  }
});

export default function ImageAvatar({ image }) {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [srcImage, setSrcImage] = React.useState(image);
  const classes = useStyles();

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = preview => {
    setSrcImage(preview);
    setOpen(false);
  };

  // const handleMouseHover = () => {
  //   setHover(!hover);
  // };

  const handleMouseEnter = () => {
    if (!hover) setHover(true);
  };

  const handleMouseLeave = () => {
    if (hover) setHover(false);
  };

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Avatar
        alt='Default Avatar'
        src={srcImage ? srcImage : DefaultImage}
        className={classes.bigAvatar}
      />
      {/* <button
        className='btn btn-default'
        style={{
          fontSize: '10px',
          position: 'absolute',
          top: '14%',
          backgroundColor: '#DCDCDC',
          padding: '2px'
        }}
        onClick={handleClickOpen}>
        Click
      </button> */}
      {hover && (
        <Button
          variant='outlined'
          style={{
            fontSize: '9px',
            top: '8%',
            position: 'absolute',
            backgroundColor: '#DCDCDC',
            padding: '2px'
          }}
          onClick={handleClickOpen}>
          Upload
        </Button>
      )}
      <ImgUploadDialog open={open} onClose={handleClose} />
    </Grid>
  );
}
