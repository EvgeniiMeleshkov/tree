import React from 'react';
import {Input} from '@mui/material';
import {useFormik} from 'formik';
import {useTypedDispatch} from '../redux/store';
import {EntityType, updateStringTC} from '../reducer/reducer';

type RowFormPropsType = {
    row: EntityType
    setEdit: (val: boolean) => void
}

const RowForm = ({row, setEdit}: RowFormPropsType) => {
    const dispatch = useTypedDispatch()

    const formik = useFormik({
        initialValues: {
            id: row.id,
            rowName: row.rowName,
            salary: row.salary,
            mainCosts: row.mainCosts,
            equipmentCosts: row.equipmentCosts,
            estimatedProfit: row.estimatedProfit,
        },
        // validate: (values) => {
        //     const errors: FormikErrorsType = {}
        //     if (!values.email) {
        //         errors.email = 'Required'
        //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //         errors.email = 'Invalid email address'
        //     }
        //     if (!values.password) {
        //         errors.password = 'Required'
        //     } else if (values.password.length < 2) {
        //         errors.password = 'Should be longer then two symbols'
        //     }
        //     return errors
        // },
        onSubmit: values => {
            // @ts-ignore
            dispatch(updateStringTC(row.id, {...values}))
            console.log(values)
            setEdit(false)
            // alert(JSON.stringify(values, null, 2));
            formik.resetForm()
        },
    });

    return (
        <form onKeyUp={(e)=>{
            e.key === 'Enter' && formik.handleSubmit()
        }}>

                    <Input {...formik.getFieldProps('rowName')}/>
                    {/*{formik.errors.email && formik.touched.email &&*/}
                    {/*    <div style={{color: 'red', fontWeight: 'bold'}}>{formik.errors.email}</div>}*/}
                    <Input {...formik.getFieldProps('salary')}/>
                    <Input {...formik.getFieldProps('equipmentCosts')}/>
                    <Input {...formik.getFieldProps('mainCosts')}/>
                    <Input {...formik.getFieldProps('estimatedProfit')}/>
                    {/*{formik.errors.password && formik.touched.password &&*/}
                    {/*    <div style={{color: 'red', fontWeight: 'bold'}}>{formik.errors.password}</div>}*/}

        </form>
    );
};

export default RowForm;