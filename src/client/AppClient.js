import React, { useEffect, useState } from "react";
import ListClient from "./forms/ListClient";
import AddClient from "./forms/AddClient";
import EditClient from "./forms/EditClient";

import ClientDataService from "./ClientService";
import { Context } from "../common/TableDataContext";

const AppClient = props => {

    // Initial client state
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

    useEffect(() => {
        listClients();
    }, []);

    useEffect(() => {
        setAdding(props.adding);
        setListing(props.listing);
        setEditing(props.editing);
    }, props);

    // Define states
    const [clients, setClients] = useState([]);
    const [currentClient, setCurrentClient] = useState(initialClientState);
    const [editing, setEditing] = useState(props.editing);
    const [adding, setAdding] = useState(props.adding);
    const [listing, setListing] = useState(props.listing);
    const [context, setContext] = useState({});

    //Navigation Functions
    const navigateAddClient = () => {
        setEditing(false);
        setListing(false);
        setAdding(true);
    };

    const navigateEditClient = () => {
        setEditing(true);
        setListing(false);
        setAdding(false);
    };

    const navigateListClients = () => {
        setEditing(false);
        setListing(true);
        setAdding(false);
    };

    // Massive Button action
    const deleteClients = () => {
        context.selected.map(i => deleteClient(i));
        setContext({selected: []});
        listClients();
    };

    const editClient = () => {
        context.selected.map(id => {
            ClientDataService.get(id)
            .then(response => {
              setCurrentClient({
                  id: response.data.identifiant,
                  name: response.data.name,
                  siren: response.data.siren,
                  rcs: response.data.rcs,
                  tva: response.data.tva,
                  code_naf: response.data.naf,
                  libelle_naf: response.data.libelleNaf,
                  forme: response.data.categorieJuridique,
                  siret: response.data.siret,
                  adresse: {
                      numero: response.data.adresse.numeroVoie,
                      libelle_voie: response.data.adresse.libelleVoie,
                      type_voie: response.data.adresse.typeVoie,
                      code_postal: response.data.adresse.codePostal,
                      ville: response.data.adresse.ville
                  }
              });
              console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }); 
        navigateEditClient();
    };

    const convert = client => {
        return {
            name: client.name,
            siren: client.siren.replace(/\s/g,''),
            siret: client.siret,
            rcs: client.rcs,
            tva: client.tva,
            naf: client.code_naf,
            libelleNaf: client.libelle_naf,
            categorieJuridique: client.forme,
            adresse: {
              numeroVoie: client.adresse.numero, 
              libelleVoie: client.adresse.libelle_voie,
              typeVoie: client.adresse.type_voie,
              codePostal:client.adresse.code_postal,
              ville:client.adresse.ville
            }
        };
    };

    // Crud Operations
    const listClients = () => {
        ClientDataService.getAll()
        .then(response => 
          setClients(response.data._embedded.entreprise.map( (c) => {return {id:c.identifiant, name:c.name, siren:c.siren, siret:c.siret}})))
        .catch(e => {
            console.log(e);
        });
    };

    const deleteClient = id => {
        ClientDataService.remove(id)
        .then(() => listClients())
        .catch(e => {
          console.log(e);
        });
    };

    const updateClient = (client) => {
        console.log(client.id);
        console.log(client);
        console.log(`id: ${client.id} client: ${client}`)
        var data = convert(client);

        ClientDataService.update(client.id, data)
        .then(() => {
            listClients();
            navigateListClients();
        })
        .catch(e => {
            console.log(e);
        });
    }

    const saveClient = client => {
        var data = convert(client);
    
        ClientDataService.create(data)
        .then(() => {
            listClients();
            navigateListClients();
        })
        .catch(e => {
            console.log(e);
        });
    }

    return (
        <div className="container">
            {listing ? 
                (
                <Context.Provider value={[context, setContext]}>
                    <ListClient clients={clients} deleteClients={deleteClients} editClient={editClient} navigateAddClient={navigateAddClient}/>
                </Context.Provider>) : (null)
            }
            {adding ?
                (<AddClient saveClient={saveClient} listClient={navigateListClients} /> ) : (null)
            }
            {editing ?
                (<EditClient currentClient={currentClient} updateClient={updateClient} listClient={navigateListClients} />) : (null)
            }
        </div>
    )
    
}

export default AppClient;