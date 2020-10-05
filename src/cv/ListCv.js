import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CvDataService from "./CvService";

import Toolbar from "../common/Toolbar";

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
  
const CvList = () => {

    const classes = useStyles();
    const variant = 'standard';
    const [cvs, setCvs] = useState([]);
    const [currentCv, setCurrentCv] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        retrieveCvs();
    }, []);

    const retrieveCvs = () => {
        CvDataService.getAll()
          .then(response => {
              console.log(response.data._embedded.cv);
              setCvs(response.data._embedded.cv);
          })
          .catch(e => {
              console.log(e);
          });
    };

    const setActiveCv = (cv, index) => {
        setCurrentCv(cv);
        setCurrentIndex(index);
    };

    return (
        <div>
            <Toolbar />
        </div>
    );
};

export default CvList;