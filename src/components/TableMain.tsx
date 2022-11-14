import React, {useEffect} from 'react';
import {Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table} from '@mui/material';
import {createStringTC, EntityType, setEditModeAC, setTreeTC} from '../reducer/reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from '../redux/store';
import FolderSharpIcon from '@mui/icons-material/FolderSharp';
import TBody from './TBody';

const TableMain = () => {
    const tree = useSelector<AppRootStateType, EntityType[]>(state => state.app.tree)

    const dispatch = useTypedDispatch()
    useEffect(()=>{
        dispatch(setTreeTC())
    },[])
    const setEdit = (id: number) => {
        dispatch(setEditModeAC(true, id))
    }



    return (
        <TableContainer component={Paper}>
            <div>
                Строительно-монтажные работы
            </div>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Уровень</TableCell>
                        <TableCell align="right">Наименование работ</TableCell>
                        <TableCell align="right">Основная з/п</TableCell>
                        <TableCell align="right">Оборудование</TableCell>
                        <TableCell align="right">Накладные расходы</TableCell>
                        <TableCell align="right">Сметная прибыль</TableCell>
                    </TableRow>
                </TableHead>

                <TBody tree={tree} setEdit={setEdit} />
            </Table>

        </TableContainer>
    );
};

export default TableMain;