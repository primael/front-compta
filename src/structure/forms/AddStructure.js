import React from 'react';

import FormStructure from './FormStructure';

const AddStructure = props => (
    <FormStructure actionLabel="Sauvegarder" actionFunction={props.saveStructure} structure={props.currentStructure} listStructure={() => props.listStructure()} />
);


export default AddStructure;