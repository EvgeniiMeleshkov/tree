import React from 'react';
import {EntityType} from '../reducer/reducer';

type RowInfoPropsType = {
    row: EntityType
}

const RowInfo = ({row}: RowInfoPropsType) => {
    return (
        <span>
            <span>{row.rowName} </span>
            <span>{row.salary} </span>
            <span>{row.equipmentCosts} </span>
            <span>{row.mainCosts} </span>
            <span>{row.estimatedProfit} </span>
        </span>
    );
};

export default RowInfo;