export const SNACK_BAR = {
    OPEN_SNACK_BAR: 'OPEN_SNACK_BAR',
    CLOSE_SNACK_BAR: 'CLOSE_SNACK_BAR'
};

export const openSnackBar = (object) => {
    return {
        type: SNACK_BAR.OPEN_SNACK_BAR,
        message: object
    }
};

export const closeSnackBar = () => {
    return {
        type: SNACK_BAR.CLOSE_SNACK_BAR
    }
};