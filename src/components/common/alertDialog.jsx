import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = props => {
    const [open, setOpen] = React.useState(false);
    const {
        onAction,
        onDisagree,
        label,
        labelText,
        className,
        styled,
        cancelBtn,
        // icon,
        disabled,
        iconType
    } = props;

    function handleClickOpen() {
        setOpen(true);
    }

    const handleClose = agree => {
        if (agree) onAction();
        if (onDisagree && !agree) onDisagree();
        setOpen(false);
    };

    const iconAccToType = () => {
        switch (iconType) {
            case 'approve':
                return (<i className='fa fa-check-circle-o fa-lg' aria-hidden='true'/>);
            case 'delete':
                return (<i className='fa fa-trash fa-lg' aria-hidden='true'/>);
            case 'remove':
                return (<i className='fa fa-times-circle-o fa-lg' aria-hidden='true'/>);
            case 'pending':
                return (<i className='fa fa-minus-circle fa-lg' aria-hidden='true'/>);
            case 'edit':
                return (<i className='fa fa-pencil-square-o fa-lg' aria-hidden='true'/>);
            case 'cross':
                return (<i className='fa fa-times-circle fa-lg' aria-hidden='true'/>);
            default:
                return (<i className='fa fa-trash fa-lg' aria-hidden='true'/>);
        }
    };

    return (
        <div>
            <button
                className={className ? className : 'btn btn-outline-danger btn-sm'}
                style={styled}
                disabled={disabled ? disabled : false}
                onClick={handleClickOpen}>
                {iconAccToType()}
            </button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'>
                <DialogTitle id='alert-dialog-title'>{label}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        {labelText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(true)} color='primary' autoFocus>
                        Yes
                    </Button>
                    <Button onClick={() => handleClose(false)} color='primary'>
                        No
                    </Button>
                    {cancelBtn&&<Button onClick={() => setOpen(false)} color='primary'>
                        Cancel
                    </Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AlertDialog;
