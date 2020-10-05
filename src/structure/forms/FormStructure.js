import React, { useEffect, useState } from 'react';

import { Button, Grid, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import SaveIcon from '@material-ui/icons/Save';
import TableChartIcon from '@material-ui/icons/TableChart';

import InputMask from 'react-input-mask'

import StructureDataService from "../StructureService";

import NafComponent from '../../common/siren/NafComponent';
import TextFieldComponent from '../../common/TextField';
import ToolbarComponent from '../../common/Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  item: {
    width: '100%',
  }
}));

const FormStructure = props => {

  const classes = useStyles();

  const [structure, setStructure] = useState(props.structure);

  const [siren, setSiren] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.target;
    setStructure({ ...structure, [name]: value });

    if (name === 'siren') {
      setSiren(value);
    }
  };

  useEffect(() => {
    if (siren.replace(/\s/g, '').length !== 9) {
      return;
    }
    console.log('searching... siren:' + siren.replace(/\s/g, ''))
    StructureDataService.findBySiren(siren.replace(/\s/g, ''))
      .then(response => {
        setStructure({
          id: structure.id,
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
  }, [siren, structure.id]);

  useEffect(
    () => {
      setStructure(props.structure);
    },
    [props]
  )

  return (
    <div className="submit-form">
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <TextFieldComponent name="name" label="Nom de l'entreprise" handleInputChange={handleInputChange} isRequired={true} value={structure.name} />

        </Grid>
        <Grid item xs={6}>
          <InputMask mask="999 999 999" maskChar="" value={structure.siren} onChange={handleInputChange}>
            {() => <TextField name="siren" label="N° SIREN" className={classes.item} variant='outlined' required InputLabelProps={{ shrink: true, }} />}
          </InputMask>
        </Grid>
        <Grid item xs={6}>
          <InputMask mask="999 999 999 99999" maskChar="" value={structure.siret} onChange={handleInputChange}>
            {() => <TextField name="siret" label="N° SIRET" className={classes.item} required InputLabelProps={{ shrink: true, }} />}
          </InputMask>
        </Grid>
        <Grid item xs={12}>
          <TextFieldComponent name="tva" label="N° TVA" handleInputChange={handleInputChange} isRequired={true} value={structure.tva} />
        </Grid>

        <NafComponent code_naf={structure.code_naf} libelle_naf={structure.libelle_naf} handleInputChange={handleInputChange} />
        <Grid item xs={12}>
          <TextFieldComponent name="forme" label="Catégorie de société" handleInputChange={handleInputChange} value={structure.forme} />
        </Grid>
        <Grid item xs={12}>
          <TextFieldComponent name="adresse" label="Adresse de société" handleInputChange={handleInputChange}
            value={structure.adresse.numero + ', ' + structure.adresse.type_voie + ' ' + structure.adresse.libelle_voie + ' ' + structure.adresse.code_postal + ' ' + structure.adresse.ville}
            inputProps={{
              startAdornment: <InputAdornment position="start"><RoomIcon /></InputAdornment>
            }} disabled={true} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" label="Sauvegarder" onClick={() => props.actionFunction(structure)} color="primary" startIcon={<SaveIcon />}>
            {props.actionLabel}
          </Button>
        </Grid>
      </Grid>

      <ToolbarComponent fabIcon={<TableChartIcon />} handleFabClick={() => props.listStructure()} color="secondary" />
    </div>
  );
};

export default FormStructure;