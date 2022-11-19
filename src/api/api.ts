import axios from 'axios';
import {EntityType} from '../reducer/reducer';

const instance = axios.create({
    baseURL: 'http://185.244.172.108:8081/v1/outlay-rows/entity/2493/row/'
})
// const eID = 2493

export const api = {
    getTreeRows() {
        return instance.get(`list`)
    },
    createRowInEntity(rowName: string, parentId: null | number) {
        return instance.post(`create`, {
                "equipmentCosts": 0,
                "estimatedProfit": 0,
                "machineOperatorSalary": 0,
                "mainCosts": 0,
                "materials": 0,
                "mimExploitation": 0,
                "overheads": 0,
                "parentId": parentId,
                "rowName": rowName,
                "salary": 0,
                "supportCosts": 0
            })
    },
    updateRow(data: EntityType) {
        return instance.post(`${data.id}/update`, {
            "machineOperatorSalary": 0,
            "materials": 0,
            "mimExploitation": 0,
            "overheads": 0,
            "supportCosts": 0,
            ...data
        })
    },
    deleteRow(rID: number) {
        return instance.delete(`${rID}/delete`)
    }
}