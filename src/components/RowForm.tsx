import React, {FormEventHandler} from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Input, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {AppRootStateType, useTypedDispatch} from '../redux/store';
import {useSelector} from 'react-redux';
import {EntityType, updateStringTC} from '../reducer/reducer';


type RowFormPropsType = {
    rID: number
}

const RowForm = ({rID}: RowFormPropsType) => {

    const tree = useSelector<AppRootStateType, EntityType[]>(state => state.app.tree)
    const row = tree.find(el => el.id === rID)
    const dispatch = useTypedDispatch()
    //
    // const formik = useFormik({
    //     initialValues: {
    //         'rowName': row?.rowName,
    //         'salary': row?.salary,
    //         'mainCosts': row?.mainCosts,
    //         'equipmentCosts': row?.equipmentCosts,
    //         'estimatedProfit': row?.estimatedProfit,
    //     },
    //     // validate: (values) => {
    //     //     const errors: FormikErrorsType = {}
    //     //     if (!values.email) {
    //     //         errors.email = 'Required'
    //     //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     //         errors.email = 'Invalid email address'
    //     //     }
    //     //     if (!values.password) {
    //     //         errors.password = 'Required'
    //     //     } else if (values.password.length < 2) {
    //     //         errors.password = 'Should be longer then two symbols'
    //     //     }
    //     //     return errors
    //     // },
    //     onSubmit: values => {
    //         //dispatch(updateStringTC(rID, {...values}))
    //         console.log(values)
    //         // alert(JSON.stringify(values, null, 2));
    //         formik.resetForm()
    //     },
    // });

    const handleSubmit = (event: FormEventHandler<HTMLFormElement>) => {
        console.log(event.name)
    }
    return (
        <form onSubmit={(e)=>handleSubmit}>

                    <input  name={'rowName'}/>
                    {/*{formik.errors.email && formik.touched.email &&*/}
                    {/*    <div style={{color: 'red', fontWeight: 'bold'}}>{formik.errors.email}</div>}*/}
                    <input name= 'salary'/>
                    <input name= 'equipmentCosts'/>
                    <input name= 'mainCosts'/>
                    <input name= 'estimatedProfit'/>
                    {/*{formik.errors.password && formik.touched.password &&*/}
                    {/*    <div style={{color: 'red', fontWeight: 'bold'}}>{formik.errors.password}</div>}*/}
            <button>sub</button>
        </form>
    );
};

export default RowForm;