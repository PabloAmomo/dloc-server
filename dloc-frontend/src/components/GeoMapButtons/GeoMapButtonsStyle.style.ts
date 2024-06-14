import { SxProps } from '@mui/material';
import { Colors } from 'enums/Colors';

const selectBackgroundColor = 'rgba(0, 0, 0, 0.6)';
const selectTextColor = Colors.white;
const unSelectBackgroundColor = 'rgba(0, 0, 0, 0.25)';
const unselectTextColor = 'rgba(0, 0, 0, 0.75)';
const commonButtonItem: SxProps = { borderRadius: '50%', ml: 1 };
const commonButtonDevice: SxProps = { ml: 1, borderRadius: '8px', display: 'flex', flexDirection: 'column', placeContent: 'center' };

const GeoMapButtonsStyle = {
  ContainerProps: {
    sx: { position: 'absolute', top: 0, right: 0, display: 'flex', mt: 1, mr: 1 } as SxProps,
  },
  ButtonItem: {
    sxUnselect: { ...commonButtonItem, backgroundColor: unSelectBackgroundColor, color: unselectTextColor } as SxProps,
    sxSelect: { ...commonButtonItem, backgroundColor: selectBackgroundColor, color: selectTextColor } as SxProps,
  },
  ButtonDevice: {
    props: {},
    sxUnselect: { ...commonButtonDevice, backgroundColor: unSelectBackgroundColor, color: '#000000', '& .MuiTypography-root': { textShadow: '0 0 #969696' } } as SxProps,
    sxSelect: { ...commonButtonDevice, backgroundColor: selectBackgroundColor, color: selectTextColor } as SxProps,
  },
};

export default GeoMapButtonsStyle;
