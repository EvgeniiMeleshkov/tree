import {AppRootStateType, TypedDispatch} from '../redux/store';
import {api} from '../api/api';

export type EntityType = {
    total: number
    id: number
    rowName: string
    salary: number
    mainCosts: number
    equipmentCosts: number
    estimatedProfit: number
    child: EntityType[]
}

export type InitType = {
    editeMode: boolean
    tree: EntityType[]
}
const initialState: InitType = {
    editeMode: false,
    tree: [{
        total: 0,
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
            return {...state, tree: [...action.payload.tree]}
        case 'APP/UPDATE-STRING':
            if(action.payload.parentStr.length < 1) {
                return {
                    ...state,
                    tree: state.tree.map(el => el.id === action.payload.id
                        ? {...el, ...action.payload.str}
                        : el
                    )
                }
            } else {
                return {
                ...state, tree: state.tree.map(el => {
                    const a = action.payload.parentStr.find(e => el.id === e.id)
                        return el.id === a?.id
                        ? {...el, ...a}
                            : el
                    })
                }
            }

        case 'APP/DELETE-STRING':
            return {...state, tree: [...action.payload.tree]}
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
export const createStringAC = (tree: EntityType[]) => {
    return {
        type: 'APP/CREATE-STRING',
        payload: {
            tree
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
export const deleteStringAC = (tree: EntityType[]) => {
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
    function flat(array: EntityType[]) {
        let result: EntityType[] = [];
        array.forEach(function (a) {
            result.push(a);
            if (Array.isArray(a.child)) {
                result = result.concat(flat(a.child));
            }
        });
        return result;
    }
    dispatch(setTreeAC(flat(res.data)))
}
export const createStringTC = (parentId: null | number) => async (dispatch: TypedDispatch, getState: ()=> AppRootStateType) => {
    let tree = getState().app.tree
    const res = await api.createRowInEntity(parentId)
    let parent = tree.find(el => el.id === parentId)
    if(parentId === null) {
        tree = [...tree, res.data.current]
    } else {
        const pID = tree.findIndex((el)=>el.id === parentId)
        if(parent){
            tree.map(el => el.id === parentId ? el.total += 1 : el)
            tree.splice( pID + parent.total, 0, res.data.current)
        }
    }
    dispatch(createStringAC(tree))
}

export const updateStringTC = (rID: number, data: EntityType) =>
    async (dispatch: TypedDispatch) => {
        const newData = {...data}
        const res = await api.updateRow(newData)

        let arr = res.data.changed
        let entity = res.data.current

        if(arr.length > 0) {
            arr = [...arr, entity]
        }
        dispatch(updateStringAC(data.id, res.data.current, arr))
    }
export const deleteStringTC = (rID: number) => async (dispatch: TypedDispatch, getState: ()=> AppRootStateType) => {
    let tree = getState().app.tree
    const res = await api.deleteRow(rID)
    const parent = tree.find(el=>el.id === rID)

    if(parent && parent.total === 0) {
        tree = tree.filter(el => el.id !== rID)
    } else {
        const pID = tree.findIndex((el)=>el.id === rID)
        parent &&
        tree.splice( pID , parent.total + 1)
        console.log(tree)
    }
    dispatch(deleteStringAC(tree))
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
