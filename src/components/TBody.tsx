import React, {useState} from 'react';
import {EntityType} from '../reducer/reducer';
import RowForm from './RowForm';
import Icons from './Icons';
import RowInfo from './RowInfo';

type TBodyPropsType = {
    row: EntityType
}

const TBody = ({row}: TBodyPropsType) => {
    const [edit, setEdit] = useState(false)

    return (
        <div key={row.id}>
            <div onDoubleClick={() => setEdit(true)}>
                <Icons key={row.id} rID={row.id}/>
                {!edit ?
                    <RowInfo row={row}/>
                    :
                    <RowForm setEdit={setEdit} row={row}/>
                }
            </div>
        </div>
    );
};

export default TBody;