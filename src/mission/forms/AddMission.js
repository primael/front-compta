import React from 'react';

import FormMission from './FormMission';

const AddMission = props => (
    <FormMission actionLabel="Sauvegarder" actionFunction={props.save} mission={props.current} list={() => props.list()} />
);


export default AddMission;