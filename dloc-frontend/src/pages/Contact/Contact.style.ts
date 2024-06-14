import { GridSize, SxProps } from '@mui/material';

const ProfileStyle = {
  PageProps: { sx: { justifyContent: 'center' } as SxProps },
  GridItemProps: {
    sx: { display: 'flex', justifyContent: 'center' } as SxProps,
    xs: 12 as GridSize,
  },
  GridContainer: { sx: { padding: '1em!important', maxWidth: '490px', mt: 2 } as SxProps },
  ButtonAction: { sx: { width: '16ch' } as SxProps },
};

export default ProfileStyle;
