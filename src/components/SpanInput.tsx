import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from '../redux/store';
import {setEditModeAC} from '../reducer/reducer';


type SpanInputPropsType = {
    title: string
    callBack: (title: string)=>void
}
const SpanInputToMemo: React.FC<SpanInputPropsType> = ({title, callBack}) => {
    const edit = useSelector<AppRootStateType, boolean>(state => state.app.editeMode)
    const dispatch = useTypedDispatch()
    const [value, setValue] = useState(title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value
        setValue(val)
    }

    const onSave = () => {
        // if(value.match(/\w|\W/) ){
        //     callBack(value)
        //     dispatch(setEditModeAC(false))
        // } else {
        //     setValue(title)
        //     dispatch(setEditModeAC(false))
        // }
    }
    const onEnterPressed = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && onSave()
    }

    return (
        <div>
            {
                edit
                    ? <input
                        autoFocus
                        style={{textAlign: 'center',
                            width: '75%',
                            backgroundColor: '#6B7D93',
                            borderRadius: '5px'
                        }}
                        onChange={onChangeHandler}
                        value={value}
                        onKeyDown={onEnterPressed}
                        onBlur={onSave}/>
                    : <span style={{overflowWrap: 'anywhere',
                        fontWeight: 'bold',
                        color: 'inherit',
                        textShadow: '2px 1px 2px rgba(69,131,153,0.64)'}}>{title}</span>
            }
        </div>
    );
};

export const SpanInput = React.memo(SpanInputToMemo)