import * as colors from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
export const styling = {
    fontFamily: 'Montserrat, sans-serif',
    palette: {
        primary1Color: colors.blue600,
        primary2Color: colors.blue700,
        primary3Color: colors.blue800,
        accent1Color: colors.blue900,
        accent2Color: colors.grey100,
        accent3Color: colors.grey500,
        textColor: colors.darkBlack,
        alternateTextColor: colors.white,
        canvasColor: colors.white,
        borderColor: colors.grey300,
        disabledColor: fade(colors.darkBlack, 0.3),
        pickerHeaderColor: colors.blue700,
        clockCircleColor: fade(colors.darkBlack, 0.07),
        shadowColor: colors.fullBlack,
    }
};

export const themes=getMuiTheme(styling);