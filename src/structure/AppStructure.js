import React, { useEffect, useState } from "react";

import StructureDataService from "./StructureService";
import { Context } from "../common/TableDataContext";
import AddStructure from "./forms/AddStructure";
import ListStructure from "./forms/ListStructure";
import EditStructure from "./forms/EditStructure";

const AppStructure = props => {

    // Initial client state
    const initialStructureState = {
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
        listStructures();
    }, []);


    useEffect(() => {
        setAdding(props.adding);
        setListing(props.listing);
        setEditing(props.editing);
    }, props);

    // Define states
    const [structures, setStructures] = useState([]);
    const [currentStructure, setCurrentStructure] = useState(initialStructureState);
    const [editing, setEditing] = useState(props.editing);
    const [adding, setAdding] = useState(props.adding);
    const [listing, setListing] = useState(props.listing);
    const [context, setContext] = useState({});

    //Navigation Functions
    const navigateAddStructure = () => {
        setEditing(false);
        setListing(false);
        setAdding(true);
    };

    const navigateEditStructure = () => {
        setEditing(true);
        setListing(false);
        setAdding(false);
    };

    const navigateListStructures = () => {
        setEditing(false);
        setListing(true);
        setAdding(false);
    };

    // Massive Button action
    const deleteStructures = () => {
        context.selected.map(i => deleteStructure(i));
        setContext({selected: []});
        listStructures();
    };

    const editStructure = () => {
        context.selected.map(id => {
            StructureDataService.get(id)
            .then(response => {
                setCurrentStructure({
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
        navigateEditStructure();
    };

    const convert = structure => {
        return {
            name: structure.name,
            siren: structure.siren.replace(/\s/g,''),
            siret: structure.siret.replace(/\s/g,''),
            rcs: structure.rcs,
            tva: structure.tva,
            naf: structure.code_naf,
            libelleNaf: structure.libelle_naf,
            categorieJuridique: structure.forme,
            adresse: {
              numeroVoie: structure.adresse.numero, 
              libelleVoie: structure.adresse.libelle_voie,
              typeVoie: structure.adresse.type_voie,
              codePostal:structure.adresse.code_postal,
              ville:structure.adresse.ville
            }
          };
    };

    // Crud Operations
    const listStructures = () => {
        StructureDataService.getAll()
        .then(response => 
          setStructures(response.data._embedded.structure.map( (c) => {return {id:c.identifiant, name:c.name, siren:c.siren, siret:c.siret}})))
        .catch(e => {
            console.log(e);
        });
    };

    const deleteStructure = id => {
        StructureDataService.remove(id)
        .then(() => listStructures())
        .catch(e => {
          console.log(e);
        });
    };

    const updateStructure = (structure) => {
        console.log(structure.id);
        console.log(structure);
        console.log(`id: ${structure.id} client: ${structure}`)
        var data = convert(structure);

        StructureDataService.update(structure.id, data)
        .then(() => {
            listStructures();
            navigateListStructures();
        })
        .catch(e => {
            console.log(e);
        });
    }

    const saveStructure = client => {
        var data = convert(client);
    
        StructureDataService.create(data)
        .then(() => {
            listStructures();
            navigateListStructures();
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
                    <ListStructure structures={structures} deleteStructures={deleteStructures} editStructure={editStructure} navigateAddStructure={navigateAddStructure}/>
                </Context.Provider>) : (null)
            }
            {adding ?
                (<AddStructure currentStructure={currentStructure} saveStructure={saveStructure} listStructure={navigateListStructures} /> ) : (null)
            }
            {editing ?
                (<EditStructure currentStructure={currentStructure} updateStructure={updateStructure} listStructure={navigateListStructures} />) : (null)
            }
        </div>
    )
    
}

export default AppStructure;