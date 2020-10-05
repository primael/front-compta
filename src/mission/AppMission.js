import React, { useEffect, useState } from "react";

import MissionDataService from "./MissionService";
import { Context } from "../common/TableDataContext";
import AddMission from "./forms/AddMission";
import ListMission from "./forms/ListMission";
import EditMission from "./forms/EditMission";
import { Button } from "@material-ui/core";

const AppMission = props => {

    // Initial mission state
    const initialMissionState = {
        id: null,
        name: "",
        client: "",
        client_identifiant: "",
        structure: "",
        structure_identifiant: "",
        entreprise: "",
        date_debut: new Date(),
        date_fin: null
    };

    useEffect(() => {
        list();
    }, []);

    useEffect(() => {
        setAdding(props.adding);
        setListing(props.listing);
        setEditing(props.editing);
    }, [props.adding, props.listing, props.editing]);

    // Define states
    const [missions, setMissions] = useState([]);
    const [current, setCurrent] = useState(initialMissionState);
    const [editing, setEditing] = useState(props.editing);
    const [adding, setAdding] = useState(props.adding);
    const [listing, setListing] = useState(props.listing);
    const [context, setContext] = useState({});

    //Navigation Functions
    const navigateAdd = () => {
        setEditing(false);
        setListing(false);
        setAdding(true);
    };

    const navigateEdit = () => {
        setEditing(true);
        setListing(false);
        setAdding(false);
    };

    const navigateList = () => {
        setEditing(false);
        setListing(true);
        setAdding(false);
    };

    // Massive Button action
    const deletes = () => {
        context.selected.map(i => deleteItem(i));
        setContext({ selected: [] });
        list();
    };

    const edit = () => {
        context.selected.map(id => {
            MissionDataService.get(id)
            .then(response => {
                setCurrent({
                    id: response.data.identifiant,
                    name: response.data.nom,
                    structure: response.data.structure,
                    client: response.data.entreprise,
                    date_debut: response.data.dateDebut
                });
                MissionDataService.getEntreprise(id)
                    .then(response => {
                        setCurrent({...current, ...{client: response.data, client_identifiant: response.data.identifiant }});
                    });
                MissionDataService.getStructure(id)
                    .then(response => {
                        current.structure = response.data;
                        current.structure_identifiant = response.data.identifiant;
                    });
            })
            .catch(e => {
                console.log(e);
            });
        });
        navigateEdit();
    };

    const convert = mission => {
        return {
            nom: mission.name,
            entreprise: { identifiant: mission.client },
            structure: { identifiant: mission.structure },
            dateDebut: mission.date_debut
        };
    };

    // Crud Operations
    const list = () => {
        MissionDataService.getAll()
            .then(response =>
                setMissions(response.data.map((c) => {
                    return {
                        id: c.identifiant,
                        name: c.nom,
                        entreprise: c.entreprise.name,
                        structure: c.structure.name,
                        action: (<Button variant="contained">CRA</Button>)
                    }
                })))
            .catch(e => {
                console.log(e);
            });
    };

    const deleteItem = id => {
        MissionDataService.remove(id)
            .then(() => list())
            .catch(e => {
                console.log(e);
            });
    };

    const update = (mission) => {
        var data = convert(mission);

        MissionDataService.update(mission.id, data)
            .then(() => {
                list();
                navigateList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    const save = mission => {
        var data = convert(mission);

        MissionDataService.create(data)
            .then(() => {
                list();
                navigateList();
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
                        <ListMission missions={missions} deletes={deletes} edit={edit} navigateAdd={navigateAdd} />
                    </Context.Provider>) : (null)
            }
            {adding ?
                (<AddMission current={current} save={save} list={navigateList} />) : (null)
            }
            {editing ?
                (<EditMission current={current} update={update} list={navigateList} />) : (null)
            }
        </div>
    )

}

export default AppMission;