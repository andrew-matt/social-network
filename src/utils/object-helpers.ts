import {UsersType} from 'components/Users/users-reducer';

type NewObjPropsType = {
    id?: number
    photos?: {
        small: string
    }
    followed?: boolean
    name?: string
    status?: string
    location?: {
        city: string
        country: string
    }
}

export const updateObjectInArray = (items: UsersType[], itemId: number, objPropName: keyof UsersType, newObjProps: NewObjPropsType) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps};
        }
        return u;
    });
};