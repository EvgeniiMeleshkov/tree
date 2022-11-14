import axios from 'axios';

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
    updateRow(rID: number) {
        return instance.post(`${rID}/update`)
    },
    deleteRow() {
        return instance.delete(`/auth/me`)
    }
}