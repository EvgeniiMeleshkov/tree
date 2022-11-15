import React, {useState} from 'react';
import {createStringTC, deleteStringTC, EntityType, setEditModeAC} from '../reducer/reducer';
import FolderSharpIcon from '@mui/icons-material/FolderSharp';
import TextSnippetSharpIcon from '@mui/icons-material/TextSnippetSharp';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from '../redux/store';
import RowForm from './RowForm';

type TBodyPropsType = {
    tree: EntityType[]
    setEdit: (rID: number) => void
}

const TBody = ({tree, setEdit}: TBodyPropsType) => {
    const edit = useSelector<AppRootStateType, boolean>(state => state.app.editeMode)
    const dispatch = useTypedDispatch()

    const [flag, setFlag] = useState(true)

    return (
        <div>
            {tree.map((row: EntityType) => (
                <div key={row.id}>
                    <div onBlur={edit ?
                        () => {
                            //dispatch(createStringTC('TEST', row.id))
                            //dispatch(setEditModeAC(false, row.id))
                        } : () => {
                        }
                    } onDoubleClick={() => setEdit(row.id)} key={row.id}>
                        <span onMouseLeave={()=>setFlag(true)}>
                            {flag ?
                                <FolderSharpIcon onMouseOver={()=>setFlag(false)} style={{color: row.child.length > 0 ? 'blue' : 'green'}}/>
                                :
                                <>
                                    <FolderSharpIcon style={{color: row.child.length > 0 ? 'blue' : 'green'}}>

                                    </FolderSharpIcon>
                                    <TextSnippetSharpIcon/>
                                    <DeleteForeverOutlinedIcon onClick={()=>dispatch(deleteStringTC(row.id))}/>
                                </>
                            }
                        </span>
                        {!edit ?
                            <>
                                <span>{row.rowName} </span>
                                <span>{row.salary.toString()} </span>
                                <span>{row.equipmentCosts.toString()} </span>
                                <span>{row.mainCosts.toString()} </span>
                                <span>{row.estimatedProfit.toString()} </span>
                            </>
                            :
                            <div>
                                {/*<form >*/}
                                {/*    <input placeholder={row.rowName}/>*/}
                                {/*    <input placeholder={row.salary.toString()}/>*/}
                                {/*    <input placeholder={row.equipmentCosts.toString()}/>*/}
                                {/*    <input placeholder={row.mainCosts.toString()}/>*/}
                                {/*    <input placeholder={row.estimatedProfit.toString()}/>*/}
                                {/*</form>*/}

                            <RowForm rID={row.id}/>

                            </div>
                        }

                    </div>
                    <span style={{paddingLeft: '10px'}}>
                        <TBody tree={row.child} setEdit={setEdit}/>
                    </span>

                </div>
            ))}

        </div>

    );
};

export default TBody;