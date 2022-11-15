import React, {useEffect} from 'react';
import {EntityType, setEditModeAC, setTreeTC} from '../reducer/reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from '../redux/store';
import TBody from './TBody';

const TableMain = () => {
    const tree = useSelector<AppRootStateType, EntityType[]>(state => state.app.tree)

    const dispatch = useTypedDispatch()
    useEffect(() => {
        dispatch(setTreeTC())
    }, [])
    const setEdit = (id: number) => {
        dispatch(setEditModeAC(true, id))
    }


    return (
        <div>
            <div>
                Строительно-монтажные работы
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div>Уровень</div>
                <div>Наименование работ</div>
                <div>Основная з/п</div>
                <div>Оборудование</div>
                <div>Накладные расходы</div>
                <div>Сметная прибыль</div>
            </div>
            <TBody tree={tree} setEdit={setEdit}/>


        </div>
    );
};

export default TableMain;