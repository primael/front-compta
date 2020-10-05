import React, { useState } from 'react';

import FormClient from './FormClient';

const AddClient = props => {

    const initialClientState = {
        id: null,
        name: "",
        siren: "",
        siret: "",
        rcs: "",
        tva: "",
        code_naf: "",
        libelle_naf: "",
        forme: "",
        adresse: {
            numero: "",
            type_voie: "",
            libelle_voie: "",
            code_postal: "",
            ville: ""
        }
    };

    const [client] = useState(initialClientState);

    return (
        <FormClient actionLabel="Sauvegarder" actionFunction={props.saveClient} client={client} listClient={() => props.listClient()}/>
    )
};

export default AddClient;