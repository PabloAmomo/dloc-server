import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Close, ContactMail } from '@mui/icons-material';
import { Device } from 'models/Device';
import { useDevicesFormContext } from 'providers/DeviceFormProvider';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserContext } from 'providers/UserProvider';
import LanguageSelector from 'components/LanguageSelector/LanguageSelector';
import LogoutDialog from 'components/LogoutDialog/LogoutDialog';
import MenuIcon from '@mui/icons-material/Menu';
import SideMenuDevices from 'components/SideMenuDevices/SideMenuDevices';
import SideMenuUser from 'components/SideMenuUser/SideMenuUser';
import style from './SideMenu.style';

const SideMenu = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const { isLoggedIn } = useUserContext();
  const { openFormDevice } = useDevicesFormContext();
  const navigate = useNavigate();

  const onClose = () => setSideMenuOpen(false);
  const toggleOpenState = () => setSideMenuOpen(!sideMenuOpen);
  const clickOnDevice = (device: Device | undefined) => openFormDevice(device);
  const clickOnLogout = () => setOpenDialog(true);
  const clickContactUs = () => navigate('/contact');

  return (
    <>
      <LogoutDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />

      <IconButton onClick={toggleOpenState} edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>

      <Drawer anchor={'right'} open={sideMenuOpen} onClose={onClose} {...style.DrawerProps}>
        <Box {...style.MenuContainerProps} onClick={onClose}>
          <Box {...style.MenuCloseButtonContainer}>
            <IconButton {...style.MenuCloseButton} onClick={onClose}>
              <Close />
            </IconButton>
          </Box>

          <List disablePadding>
            <ListItem>
              <LanguageSelector />
            </ListItem>
          </List>
          <Divider />

          <ListItem disablePadding>
            <ListItemButton onClick={clickContactUs}>
              <ListItemIcon>
                <ContactMail htmlColor={style.IconColor} />
              </ListItemIcon>
              <ListItemText primary={t('contactUs')} />
            </ListItemButton>
          </ListItem>
          <Divider />

          {isLoggedIn && (
            <>
              <SideMenuDevices clickOnDevice={clickOnDevice} />
              <SideMenuUser clickOnLogout={clickOnLogout} />
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default SideMenu;
