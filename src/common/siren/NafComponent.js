import { Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask'
import AlertComponent from "../Alert";
import TextFieldComponent from "../TextField";
import SirenDataService from "./SirenService";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(1)
    },
  }));
  
const NafComponent = props => {

    const { code_naf, handleInputChange, handleInput } = props;

    const [message, setMessage] = useState({});
    const [isMessage, setIsMessage] = useState(false);

    const [libelle_naf, setLibelleNaf] = useState("");

    const classes = useStyles();

    useEffect(() => {
        if(code_naf.length !== 6) {
          setIsMessage(false);
          return;
        }

        SirenDataService.getNaf(code_naf)
          .then(response => {
              setLibelleNaf(response.data);
              setIsMessage(false);
          })
          .catch(e => {
            console.log(e.response.status)
              if(e.response.status === 404) {
                setLibelleNaf("")
                setIsMessage(true)
                setMessage({severity: 'error', message: 'Le Code NAF ' + code_naf + ' est inconnu'})
              }
          });
  
      }, [code_naf]);

    return (
        <Grid container className={classes.root}>
            {
            isMessage && 
              (<Grid item xs={12}><AlertComponent severity={message.severity} message={message.message}/></Grid>)
            }
            <Grid item xs={3}>
                <InputMask mask="99.99a" maskChar="" value={code_naf} onChange={handleInputChange}>
                    {() => <TextField name="code_naf" label="Code Naf" variant='standard' required InputLabelProps={{shrink: true, }} onInput={handleInput}/>}
                </InputMask>
            </Grid>
            <Grid item xs={9}>
                <TextFieldComponent name="libelle_naf" label="Libellé Naf" handleInputChange={handleInputChange} value={libelle_naf}/>
            </Grid>
        </Grid>
    );
}

export default NafComponent;