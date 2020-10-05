import AddIcon from "@material-ui/icons/Add";
import React from 'react';

import ToolbarComponent from '../../common/Toolbar';
import Table from "../../common/Table";

const ListStructure = props => (
    <div className="list row">
        <Table
            rows={props.structures}
            headCells={[
                { id: 'name', numeric: false, disablePadding: true, label: 'Nom' },
                { id: 'siren', numeric: true, disablePadding: false, label: 'Numéro SIREN' },
                { id: 'siret', numeric: true, disablePadding: false, label: 'Numéro SIRET' },
            ]}
            sortKey='id'
            tableTitle='Liste des structures'
            handleOnClickDelete={props.deleteStructures}
            handleOnClickEdit={props.editStructure}
        />

        <ToolbarComponent fabIcon={<AddIcon />} handleFabClick={props.navigateAddStructure} color="secondary" />
    </div>
);

export default ListStructure;