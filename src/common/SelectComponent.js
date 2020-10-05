import React, { useState } from 'react';
import PropTypes from 'prop-types'

import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  
const SelectComponent = props => {

    const { label, value, handleInputChange, items, name } = props;

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-controlled-open-select-label" shrink>{label}</InputLabel>
            <Select label={label} open={open} onClose={handleClose} onOpen={handleOpen} value={value} onChange={handleInputChange} name={name} fullWidth >
                <MenuItem value=""><em>None</em></MenuItem>
                {
                    items.map(i => <MenuItem value={i.value}>{i.label}</MenuItem>)
                }
            </Select>
        </FormControl>
    )
};

SelectComponent.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
};

export default SelectComponent;