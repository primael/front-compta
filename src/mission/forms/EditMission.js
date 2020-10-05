import React from 'react';
import FormMission from './FormMission';

const EditMission = props => (
    <FormMission actionLabel="Sauvegarder" actionFunction={props.update} mission={props.current} list={() => props.list()} />
);

export default EditMission;