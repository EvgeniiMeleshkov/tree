import {EntityType} from '../reducer/reducer';

export function rec(d: EntityType[], rID: number) {
    const tree = d.find(el => el.id === rID)
    if (tree === undefined) {
        for (let i = 0; i < d.length; i++) {
            rec(d[i].child, rID)
        }
    }
    return tree
}

export function findNode(id: number, currentNode: EntityType): EntityType | boolean {
    let i,
        currentChild,
        result;

    if (id === currentNode.id) {
        return currentNode;
    } else {

        // Use a for loop instead of forEach to avoid nested functions
        // Otherwise "return" will not work properly
        for (i = 0; i < currentNode.child.length; i += 1) {
            currentChild = currentNode.child[i];

            // Search in the current child
            result = findNode(id, currentChild);

            // Return the result if the node has been found
            if (result !== false) {
                return result;
            }
        }

        // The node has not been found and we have no more options
        return false;
    }
}

export const joinArrs = (oldArr: EntityType[], newArr: EntityType[]) => {
    return oldArr.map(el => {
        for (let i = 0; i < newArr.length; i++) {
            if(el.id === newArr[i].id) {
                i++
                return {...el, ...newArr[i]}
            }
        }
    })
}