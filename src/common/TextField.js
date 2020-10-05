import React from 'react';
import { TextField } from "@material-ui/core";
import PropTypes from 'prop-types';

const TextFieldComponent = props => {

    const { name, label, isRequired, formName, value, variant, handleInputChange, handleInput, type, disabled, inputProps} = props;

    return (
        <TextField name={name} label={label} required={isRequired} type={type}
            InputLabelProps={{shrink: true, }} fullWidth helperText={formName ? formName.getError() : ''}
            value={value} onChange={handleInputChange} onInput={handleInput} variant={variant} disabled={disabled}
            InputProps={inputProps ? inputProps : ''}/>
    );
}

TextFieldComponent.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    handleInput: PropTypes.func,
    isRequired: PropTypes.bool,
    formName: PropTypes.object,
    variant: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    inputProps: PropTypes.element,
}

TextFieldComponent.defaultProps = {
    isRequired: false,
    variant: 'standard',
    type: 'text',
    disabled: false
}

export default TextFieldComponent;