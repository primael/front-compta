import AddIcon from "@material-ui/icons/Add";
import React from 'react';

import ToolbarComponent from '../../common/Toolbar';
import Table from "../../common/Table";

const ListMission = props => (
    <div className="list row">
        <Table 
              rows={props.missions}
              headCells={[
                {id: 'name', numeric: false, disablePadding: true, label: 'Nom'},
                {id: 'entreprise', numeric: false, disablePadding: false, label: "Nom de l'entreprise"},
                {id: 'structure', numeric: true, disablePadding: false, label: 'Numéro de la structure'},
                {id: 'action', numeric: true, disablePadding: false, label: 'Action'},
              ]}
              sortKey='id'
              tableTitle='Liste des missions'
              handleOnClickDelete={props.deletes}
                handleOnClickEdit={props.edit}
            />

        <ToolbarComponent fabIcon={<AddIcon />} handleFabClick={props.navigateAdd} color="secondary" />
    </div>
);

export default ListMission;