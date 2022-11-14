import React from 'react';
import './App.css';
import {Divider} from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TableMain from './components/TableMain';

function App() {

    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ) {
        return {name, calories, fat, carbs, protein};
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    return (
        <div className="App">

            <Header/>


            <div style={{display: 'flex'}}>

                <Sidebar/>

                <Divider/>

                <TableMain/>
            </div>
        </div>
    );
}

export default App;
