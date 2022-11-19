import {TypedDispatch} from '../redux/store';
import {api} from '../api/api';




export type EntityType = {
    id: number,
    rowName: string,
    salary: number,
    mainCosts: number,
    equipmentCosts: number,
    estimatedProfit: number,
    child: EntityType[]
}

export type InitType = {
    editeMode: boolean
    tree: EntityType[]
}
const initialState: InitType = {
    editeMode: false,
    tree: [{
        id: 0,
        rowName: 'test',
        salary: 0,
        mainCosts: 0,
        equipmentCosts: 0,
        estimatedProfit: 0,
        child: [] as EntityType[]
    }]
}

export const appReducer = (state = initialState, action: AppActionsType) => {
    switch (action.type) {
        case 'APP/SET-EDITMODE':
            return {...state, editeMode: action.payload.value}
        case 'APP/SET-TREE':
            return {...state, tree: action.payload.tree}
        case 'APP/CREATE-STRING':
            return {...state}
        case 'APP/UPDATE-STRING':
            if(action.payload.parentStr.length === 0) {
                return {
                    ...state,
                    tree: state.tree.map(el => el.id === action.payload.id
                        ? {...el, ...action.payload.str}
                        : el
                    )
                }
            }
            else {
               return {
                   ...state,
                   tree: state.tree.map(el => {
                       if(el.id === action.payload.parentStr[0].id) {
                           return {...el, ...action.payload.parentStr[0], child: el.child.map(e => e.id === action.payload.id
                                   ? {...e, ...action.payload.str}
                                   : e
                               )}
                       }
                       else {
                            return el
                       }
                       // return el.id === action.payload.parentStr[0].id
                       // ? {...el, ...action.payload.parentStr[0], child: el.child.map(e => e.id === action.payload.id
                       //             ? {...e, ...action.payload.str}
                       //             : e
                       //         )}
                       // : el
                   })
               }
            }

        case 'APP/DELETE-STRING':
            return {...state, tree: state.tree.filter(el => el.id !== action.payload.id)}
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
export const updateStringAC = (id: number, str: EntityType, parentStr: EntityType[] | []) => {
    return {
        type: 'APP/UPDATE-STRING',
        payload: {
            id,
            str,
            parentStr
        }
    } as const
}
export const deleteStringAC = (id: number) => {
    return {
        type: 'APP/DELETE-STRING',
        payload: {
            id
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
export const updateStringTC = (rID: number, data: EntityType) =>
    async (dispatch: TypedDispatch) => {

        console.log(data.rowName, data.id)
        const newData = {...data}
        const res = await api.updateRow(newData)

        dispatch(updateStringAC(data.id, res.data.current, res.data.changed))

    }
export const deleteStringTC = (rID: number) => async (dispatch: TypedDispatch) => {
    const res = await api.deleteRow(rID)
    console.log(res.data.current)
    dispatch(deleteStringAC(rID))
}

export type SetTreeACType = ReturnType<typeof setTreeAC>
export type CreateStringACType = ReturnType<typeof createStringAC>
export type UpdateStringACType = ReturnType<typeof updateStringAC>
export type DeleteStringACType = ReturnType<typeof deleteStringAC>
export type SetEditModeACType = ReturnType<typeof setEditModeAC>
export type AppActionsType =
    SetTreeACType
    | CreateStringACType
    | UpdateStringACType
    | DeleteStringACType
    | SetEditModeACType
