import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import { blue } from '@material-ui/core/colors';
import Avatar from 'react-avatar-edit';

// const useStyles = makeStyles({
//   avatar: {
//     backgroundColor: blue[100],
//     color: blue[600]
//   }
// });

const ImgUploadDialog = props => {
  // const classes = useStyles();
  const [preview, setPreview] = React.useState(null);
  const [src, setSrc] = React.useState(null);
  const { onClose, open } = props;

  function handleClose() {
    onClose(preview);
  }

  const dialogClose = () => {
    setPreview(null);
  };

  const onCrop = preview => {
    setPreview(preview);
  };

  // const onBeforeFileLoad = elem => {
  //   if (elem.target.files[0].size > 91680) {
  //     alert('File is too big!');
  //     elem.target.value = '';
  //   }
  // };

  return (
    <Dialog
      onClose={handleClose}
      maxWidth='md'
      aria-labelledby='simple-dialog-title'
      open={open}>
      <DialogTitle id='simple-dialog-title'>Set backup account</DialogTitle>
      <DialogContent>
        <Avatar
          width={390}
          height={295}
          onCrop={onCrop}
          onClose={dialogClose}
          // onBeforeFileLoad={onBeforeFileLoad}
          src={src}
        />
        <Button onClick={handleClose} color='primary' autoFocus>
          Agree
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ImgUploadDialog;
