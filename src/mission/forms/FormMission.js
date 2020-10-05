import React, { useEffect, useState } from 'react';

import TableChartIcon from '@material-ui/icons/TableChart';
import SaveIcon from '@material-ui/icons/Save';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import TextFieldComponent from '../../common/TextField';
import ToolbarComponent from '../../common/Toolbar';
import { Button, Grid, makeStyles } from '@material-ui/core';
import SelectComponent from '../../common/SelectComponent';

import ClientDataService from "../../client/ClientService";
import StructureDataService from "../../structure/StructureService";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    item: {
        width: '100%',
    }
}));

const FormMission = props => {

    const classes = useStyles();

    const [mission, setMission] = useState(props.mission);

    const [clients, setClients] = useState([]);
    const [structures, setStructures] = useState([]);
    
    const handleInputChange = event => {
        const { name, value } = event.target;
        setMission({ ...mission, [name]: value });
    };

    useEffect(
        () => {
            setMission(props.mission);
        },
        [props]
    )

    useEffect(() => {
        setMission(props.mission);
        listClients();
        listStructures();
    }, []);

    const listClients = () => {
        ClientDataService.getAll()
        .then(response => 
          setClients(response.data._embedded.entreprise.map( (c) => {return {value: c.identifiant, label:c.name}})))
        .catch(e => {
            console.log(e);
        });;
      };

      const listStructures = () => {
        StructureDataService.getAll()
        .then(response => 
            setStructures(response.data._embedded.structure.map( (s) => {return {value: s.identifiant, label:s.name}})))
        .catch(e => {
            console.log(e);
        });;
      };
    
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <TextFieldComponent name="name" label="Nom de la mission" handleInputChange={handleInputChange}  isRequired={true} value={mission.name} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <SelectComponent name="client" value={mission.client_identifiant} handleInputChange={handleInputChange} 
                        items={clients}
                        label="Client" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SelectComponent name="structure" value={mission.structure_identifiant} handleInputChange={handleInputChange} 
                        items={structures}
                        label="structure" />
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={6}>
                      <KeyboardDatePicker name="date_debut" margin="normal" value={mission.date_debut} onChange={e => setMission({...mission, "date_debut": e})} 
                          format="dd/MM/yyyy" label="Date de début" KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}/>
                  </Grid>
                  
                  <Grid item xs={6}>
                      <KeyboardDatePicker name="date_fin" margin="normal" value={mission.date_fin} onChange={e => setMission({...mission, "date_fin": e})} 
                          format="dd/MM/yyyy" label="Date de fin" KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}/>
                  </Grid>
                </MuiPickersUtilsProvider>
                <Grid item xs={12}>
                    <Button variant="contained" label="Sauvegarder" onClick={() => props.actionFunction(mission)} color="primary" startIcon={<SaveIcon />}>
                        {props.actionLabel}
                    </Button>
                </Grid>
            </Grid>
            <ToolbarComponent fabIcon={<TableChartIcon />} handleFabClick={() => props.list()} color="secondary" />
        </div>
    );
};

export default FormMission;