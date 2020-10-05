import React, { useState } from 'react';
import PropTypes from 'prop-types'

import Collapse from '@material-ui/core/Collapse';
import { IconButton, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const AlertComponent = props => {

    const classes = useStyles();
    const { severity, message } = props;
    const [open, setOpen] = useState(true);

    return (
        <Collapse in={open}>
            <Alert action={
                <IconButton aria-label='close' color='inherit' size='small' onClick={() => {setOpen(false);}}>
                    <CloseIcon fontSize='inherit'/>
                </IconButton>
            } severity={severity}>
                {message}
            </Alert>
        </Collapse>
    )
}

AlertComponent.propTypes = {
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
}

export default AlertComponent;