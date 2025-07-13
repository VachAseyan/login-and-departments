export const ACTIONS = {
    ADD: 'ADD',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
};

export function departmentReducer(state, action) {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case ACTIONS.ADD:
            return [...state, payload];
        case ACTIONS.UPDATE:
            return state.map((dept, idx) =>
                idx === action.index ? payload : dept
            );
        case ACTIONS.DELETE:
            return state.filter((_, idx) => idx !== action.index);
        default:
            return state;
    }
}

export function initDepartments() {
    try {
        const saved = localStorage.getItem('departments');
        if (saved) {
            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) ? parsed : [];
        }
        return [];
    } catch (error) {
        console.error('Error loading departments from localStorage:', error);
        return [];
    }
}