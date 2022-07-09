import {ActionTypes, AppThunk} from './Redux-Store';
import {getUserData} from './Auth-reducer';

type InitialStateType = {
    initialized: boolean
}

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState: InitialStateType = {
    initialized: false,
};

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS} as const);

export const initializeApp = (): AppThunk => (dispatch) => {
    let promise = dispatch(getUserData());
    promise.then(() => {
        dispatch(initializedSuccess());
    });
};

export default appReducer;