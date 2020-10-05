import React, { useEffect, useState } from 'react';

import FormClient from './FormClient';

const EditClient = props => {

    // Define states
    const [client, setClient] = useState(props.currentClient);

    useEffect(
        () => {
            setClient(props.currentClient);
        },
        [props]
    )

    return (
        <FormClient actionLabel="Sauvegarder" actionFunction={props.updateClient} client={client} listClient={() => props.listClient()}/>
    )
};

export default EditClient;