import { SxProps } from '@mui/material';
import { Colors } from 'enums/Colors';
import { AriaRole } from 'react';

const SideMenuStyle = {
  IconColor: Colors.blue,
  DrawerProps: {
    sx: { zIndex: 1300 } as SxProps,
  },
  MenuContainerProps: {
    sx: { width: 250, height: '100vh' } as SxProps,
    role: 'presentation' as AriaRole,
  },
  MenuCloseButton: {
    sx: { mr: 1 } as SxProps,
  },
  MenuCloseButtonContainer: {
    sx: { width: '100%', pt: 1, textAlign: 'end' } as SxProps,
  },
};

export default SideMenuStyle;
