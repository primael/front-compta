import React from 'react';

import FormStructure from './FormStructure';

const EditStructure = props => (
    <FormStructure actionLabel="Sauvegarder" actionFunction={props.updateStructure} structure={props.currentStructure} listStructure={() => props.listStructure()} />
);

export default EditStructure;