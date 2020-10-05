import React, { useState } from 'react';
import { AppBar, Fab, Grid, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({

    root: {
        '& .MuiFormControl-root': {
            width: '100%',
        },
        flexGrow: 1,
    },
    item: {
        
    },
    appBar: {
        top: "auto",
        bottom: 0
    },
    fabButton: {
        position: "absolute",
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: "0 auto"
    },
    grow: {
        flexGrow: 1
    },
  }));

const AddExperience = () => {

    const classes = useStyles();

    const initialExperience = {
        date_debut: "",
        date_fin: "",
        poste: "",
        entreprise: "",
        localisation: "",
        description_entreprise: "",
        description_mission: "",
        keywords: []
    }

    const [experience, setExperience] = useState(initialExperience);
    //const [submitted, setSubmitted] = useState(false);

    const variant = 'standard';

    const handleInputChange = event => {
        const { name, value } = event.target;
        setExperience({...experience, [name]: value});

        console.log(experience);
    };

    const technologies = [
        {title: 'JSF', technologie: 'Java'},
        {title: 'JSX', technologie: 'React'}
    ];

    return (
        <form className={classes.root} noValidate>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField name="date_debut" label="Date de début" type="date" required
                        InputLabelProps={{shrink: true, }} className={classes.item}
                        value={experience.date_debut} onChange={handleInputChange} variant={variant}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField name="date_fin" label="Date de fin" type="date" 
                        InputLabelProps={{shrink: true, }} className={classes.item} xs={6}
                        value={experience.date_fin} onChange={handleInputChange} variant={variant}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField name="poste" label="Poste" type="text" required
                        InputLabelProps={{shrink: true, }} xs={12}
                        value={experience.poste} onChange={handleInputChange} variant={variant}/>

                </Grid>
                <Grid item xs={6} sm={9}>
                    <TextField name="entreprise" label="Entreprise" type="text" required
                        InputLabelProps={{shrink: true, }} className={classes.item}
                        value={experience.entreprise} onChange={handleInputChange} variant={variant}/>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <TextField name="localisation" label="Localisation" type="text" required
                        InputLabelProps={{shrink: true, }} className={classes.item}
                        value={experience.localisation} onChange={handleInputChange} variant={variant}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField name="description_entreprise" label="Description de l'entreprise" type="text" 
                        multiline rows={3} InputLabelProps={{shrink: true, }} xs={12}
                        value={experience.description_entreprise} onChange={handleInputChange} variant={variant}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField name="description_mission" label="Description de la mission" type="text" 
                        multiline rows={6} InputLabelProps={{shrink: true, }} xs={12}
                        value={experience.description_mission} onChange={handleInputChange} variant={variant}/>
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete multiple options={technologies.map((option) => option.title)} freeSolo
                        renderTags={(value, getTagProps) => value.map((option, index) => (
                            <Chip variant='outlined' label={option} {...getTagProps({index})}/>
                        ))}
                        renderInput={(params) => (
                            <TextField {...params} variant={variant} label="keywords" placeholder="Keyword"/> 
                        )}
                        onChange={(event)=> console.log(event.target)}
                    />
                </Grid>
                <Grid item>
                    <button type="submit" className="btn btn-success">Sauvegarder</button>
                </Grid>
            </Grid>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="open drawer">
                        <MenuIcon />
                    </IconButton>

                    <Fab color="secondary" arioa-label="add Experience" className={classes.fabButton}>
                        <AddIcon />
                    </Fab>
                    <div className={classes.grow} />
                    <IconButton color="inherit">
                        <SearchIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </form>
    );
};

export default AddExperience;
