import { GridSize, SxProps } from '@mui/material';

const ProfileStyle = {
  PageProps: { sx: { justifyContent: 'center' } as SxProps },
  GridItemProps: {
    sx: { display: 'flex', justifyContent: 'center' } as SxProps,
    xs: 12 as GridSize,
  },
  GridContainerProps: { sx: { padding: '1em!important', maxWidth: '490px', mt: 2 } as SxProps },
  ButtonActionProps: {
    sx: { width: '16ch' } as SxProps,
    variant: 'contained' as 'contained' | 'text' | 'outlined',
    color: 'primary' as 'inherit' | 'primary' | 'error' | 'success' | 'warning' | 'info' | 'secondary',
  },
  TextFieldProps: { sx: { width: '100%' } as SxProps, variant: 'outlined' as 'outlined' | 'standard' | 'filled' },
};

export default ProfileStyle;
