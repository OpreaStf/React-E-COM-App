export type SelectState = {
    [key: string]: {
        options: string[];
        selected: boolean[];
    };
};

export const selectReducer = (
    state: SelectState,
    action: {
        type: string;
        [key: string]: any;
    }
) => {
    switch (action.type) {
        case 'SET_DATA': {
            return {
                ...action.payload,
            };
        }
        case 'SELECT': {
            // find to which menu belongs the select event
            const idx = state[action.id].options.findIndex((value: any) => action.value === value);
            // update the state array for the given id
            state[action.id].selected[idx] = !state[action.id].selected[idx];

            // if the select-menu have the uniqueSelect prop cancel other selected items
            if (action.uniqueSelect) {
                const deleteSelected = state[action.id].selected;
                for (let i = 0; i < deleteSelected.length; ++i) {
                    if (idx !== i) deleteSelected[i] = false;
                }
                state[action.id].selected = deleteSelected;
            }
            return { ...state };
        }
        case 'DELETE': {
            const deleteSelected = state[action.id].selected;
            for (let i = 0; i < deleteSelected.length; ++i) {
                deleteSelected[i] = false;
            }
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    selected: deleteSelected,
                },
            };
        }
        default:
            return {};
    }
};

type State = {
    [key: string]: any;
};

const showObj: State = {
    s0: false,
    s1: false,
    s2: false,
    s3: false,
};

export const showReducer = (state: State, action: any) => {
    switch (action.type) {
        case 'CHANGE': {
            const newState = {
                ...state,
                [`s${action.payload}`]: !state[`s${action.payload}`],
            };

            Object.keys(newState).forEach(key => {
                if (key !== `s${action.payload}`) {
                    newState[key] = false;
                }
            });

            return {
                ...newState,
            };
        }
        case 'CLOSE': {
            return showObj;
        }
        default:
            return showObj;
    }
};
