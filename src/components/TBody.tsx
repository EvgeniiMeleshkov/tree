import React from 'react';
import {createStringTC, EntityType, setEditModeAC} from '../reducer/reducer';
import {TableBody, TableCell, TableRow} from '@mui/material';
import FolderSharpIcon from '@mui/icons-material/FolderSharp';
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from '../redux/store';

type TBodyPropsType = {
    tree: EntityType[]
    setEdit: (rID: number) => void
}

const TBody = ({tree, setEdit}: TBodyPropsType) => {
    const edit = useSelector<AppRootStateType, boolean>(state => state.app.editeMode)
    const dispatch = useTypedDispatch()
    return (
        <TableBody>
            {tree.map((row: EntityType) => (
                <>
                    <TableRow onBlur={edit ?
                        () => {
                            dispatch(createStringTC('TEST', row.id))
                            dispatch(setEditModeAC(false, row.id))
                        } : () => {
                        }
                    } onDoubleClick={() => setEdit(row.id)} key={row.id}>
                        <TableCell component="th" scope="row">
                            <FolderSharpIcon style={{color: row.child.length > 0 ? 'blue' : 'green'}}/>
                        </TableCell>
                        {!edit ?
                            <>
                                <TableCell align="right">{row.rowName} </TableCell>
                                <TableCell align="right">{row.salary.toString()} </TableCell>
                                <TableCell align="right">{row.equipmentCosts.toString()} </TableCell>
                                <TableCell align="right">{row.mainCosts.toString()} </TableCell>
                                <TableCell align="right">{row.estimatedProfit.toString()} </TableCell>
                            </>
                            :
                            <>

                                <div>
                                    <form>
                                        <input placeholder={row.rowName}/>
                                        <input placeholder={row.salary.toString()}/>
                                        <input placeholder={row.equipmentCosts.toString()}/>
                                        <input placeholder={row.mainCosts.toString()}/>
                                        <input placeholder={row.estimatedProfit.toString()}/>
                                    </form>
                                </div>


                            </>
                        }

                    </TableRow>
                    <span style={{paddingLeft: '10px'}}>
                        <TBody tree={row.child} setEdit={setEdit}/>
                    </span>

                </>
            ))}

        </TableBody>

    );
};

export default TBody;