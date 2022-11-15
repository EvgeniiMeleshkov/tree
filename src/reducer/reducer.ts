import {AppRootStateType, TypedDispatch} from '../redux/store';
import {api} from '../api/api';
import {RowFormValuesType} from '../components/RowForm';

export type EntityType = {
    'id': number,
    'rowName': string,
    'total': number,
    'salary': number,
    'mimExploitation': number,
    'machineOperatorSalary': number,
    'materials': number,
    'mainCosts': number,
    'supportCosts': number,
    'equipmentCosts': number,
    'overheads': number,
    'estimatedProfit': number,
    'child': any
}
export type TreeType = Array<EntityType>
export type InitType = {
    editeMode: boolean
    tree: TreeType
}
const initialState: InitType = {
    editeMode: false,
    tree: [{
        'id': 0,
        'rowName': 'test',
        'total': 0,
        'salary': 0,
        'mimExploitation': 0,
        'machineOperatorSalary': 0,
        'materials': 0,
        'mainCosts': 0,
        'supportCosts': 0,
        'equipmentCosts': 0,
        'overheads': 0,
        'estimatedProfit': 0,
        'child': []
    }]
}

export const appReducer = (state = initialState, action: AppActionsType) => {
    switch (action.type) {
        case 'APP/SET-EDITMODE':
            return {...state, editeMode: action.payload.value}
        case 'APP/SET-TREE':
            return {...state, tree: action.payload.tree}
        case 'APP/CREATE-STRING':
            return {...state, tree: [...state.tree, action.payload.entity]}
        case 'APP/UPDATE-STRING':
            return {...state, tree: state.tree.map(el => el.id === action.payload.id
                ? {...el, ...action.payload.str}
                    : el
                )}
        case 'APP/DELETE-STRING':
            return {...state}
        default:
            return {...state}
    }
}

export const setTreeAC = (tree: EntityType[]) => {
    return {
        type: 'APP/SET-TREE',
        payload: {
            tree
        }
    } as const
}
export const createStringAC = (entity: EntityType) => {
    return {
        type: 'APP/CREATE-STRING',
        payload: {
            entity
        }
    } as const
}
export const updateStringAC = (id: number, str: EntityType) => {
    return {
        type: 'APP/UPDATE-STRING',
        payload: {
            id,
            str
        }
    } as const
}
export const deleteStringAC = (tree: EntityType) => {
    return {
        type: 'APP/DELETE-STRING',
        payload: {
            tree
        }
    } as const
}
export const setEditModeAC = (value: boolean, id: number) => {
    return {
        type: 'APP/SET-EDITMODE',
        payload: {
            value,
            id
        }
    } as const
}

export const setTreeTC = () => async (dispatch: TypedDispatch) => {
    const res = await api.getTreeRows()
    dispatch(setTreeAC(res.data))
}
export const createStringTC = (rowName: string, parentId: null | number) => async (dispatch: TypedDispatch) => {
    const res = await api.createRowInEntity(rowName, parentId)
    dispatch(createStringAC(res.data.current))
}
export const updateStringTC = (rID: number, data: RowFormValuesType) =>
    async (dispatch: TypedDispatch, getState: () => AppRootStateType) => {
    const old = getState().app.tree.find(el => el.id === rID)!
        const newData = {...old, ...data}
        console.log(newData)
    const res = await api.updateRow(rID, newData)
    console.log(res.data.current)
    dispatch(updateStringAC(rID, res.data.current))
}
export const deleteStringTC = (rID: number) => async (dispatch: TypedDispatch) => {
    const res = await api.deleteRow(rID)
    console.log(res.data.current)
    dispatch(setTreeTC())
}

export type SetTreeACType = ReturnType<typeof setTreeAC>
export type CreateStringACType = ReturnType<typeof createStringAC>
export type UpdateStringACType = ReturnType<typeof updateStringAC>
export type DeleteStringACType = ReturnType<typeof deleteStringAC>
export type SetEditModeACType = ReturnType<typeof setEditModeAC>
export type AppActionsType = SetTreeACType | CreateStringACType | UpdateStringACType | DeleteStringACType | SetEditModeACType
