import React, {useState} from 'react';
import FolderSharpIcon from '@mui/icons-material/FolderSharp';
import {createStringTC, deleteStringTC} from '../reducer/reducer';
import TextSnippetSharpIcon from '@mui/icons-material/TextSnippetSharp';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {useTypedDispatch} from '../redux/store';

type IconsPropsType = {
    rID: number
}

const Icons = ({rID}: IconsPropsType) => {
    const [flag, setFlag] = useState(true)
    const dispatch = useTypedDispatch()

    const onCreateRow = (parentID: number | null) => {
        dispatch(createStringTC(parentID))
    }

    return (
        <span onMouseLeave={() => setFlag(true)}>
                            {flag ?
                                <>
                                    <FolderSharpIcon style={{color: 'blue'}}
                                                     onMouseOver={()=>setFlag(false)} />
                                </>
                                :
                                <>
                                    <FolderSharpIcon onClick={()=>onCreateRow(null)} style={{color: 'blue'}}/>
                                    <FolderSharpIcon onClick={()=>onCreateRow(rID)} style={{color: 'green'}}/>
                                    <TextSnippetSharpIcon/>
                                    <DeleteForeverOutlinedIcon onClick={() => dispatch(deleteStringTC(rID))}/>
                                </>
                            }
                        </span>
    );
};

export default Icons;