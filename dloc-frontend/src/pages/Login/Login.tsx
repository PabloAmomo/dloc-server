import { Box, CircularProgress, Grid, Link, SxProps, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserContext } from 'providers/UserProvider';
import LoginButtonFacebook from 'components/LoginButtonFacebook/LoginButtonFacebook';
import LoginButtonGoogle from 'components/LoginButtonGoogle/LoginButtonGoogle';
import LoginButtonMicrosoft from 'components/LoginButtonMicrosoft/LoginButtonMicrosoft';
import PageContainer from 'components/PageContainer/PageContainer';
import PolaroidCarrusel, { PolaroidCarruselImage } from 'components/PolaroidCarrusel/PolaroidCarrusel';
import style from './Login.style';

const IMAGE_LIST: PolaroidCarruselImage[] = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
  src: `images/carrusel/image-${i < 10 ? '0' + i : i}.webp`,
  alt: `pet-photo-${i}`,
  title: '',
}));

const Login = () => {
  const navigate = useNavigate();
  const { user, isLogingIn, isLoggedIn } = useUserContext();
  const { t } = useTranslation();

  const checkIfLoggedIn = () => {
    if (!isLoggedIn) return;

    let redirect = new URLSearchParams(window.location.search).get('redirect') ?? '/';
    if (redirect) {
      try {
        if (redirect.startsWith('b64:')) redirect = atob(redirect.slice(4));
      } catch (e) {
        redirect = '/';
      }
    }
    navigate(redirect);
  };

  useEffect(() => checkIfLoggedIn(), [user]);
  useEffect(() => checkIfLoggedIn(), []);

  const clickOnContact = () => {
    if (!isLogingIn) navigate('/contact');
  };

  const Title = ({ title, prefix, sx }: { title: string | string[]; prefix?: string; sx?: SxProps }) => (
    <Typography {...(style.titleProps(sx ?? {}) as any)}>
      {Array.isArray(title) ? title.map((line) => <span key={line}>{t(`${prefix}${line}`)}</span>) : <span>{title}</span>}
    </Typography>
  );

  return (
    <PageContainer {...style.ContainerProps}>
      <Box {...style.MainContainerProps}>
        <Grid container {...style.GridContainerProps}>
          <Grid item xs={12}>
            <Title {...style.SloganProps} prefix="brand.sloganL" title={['1', '2']} />
            <Title title={t(`brand.sloganL3`)} />
          </Grid>

          <Grid item xs={12} {...style.ContactUseProps}>
            <Link underline="none" color={'white'} variant='h6' onClick={clickOnContact}>
              {t('contactWithUs')}
            </Link>
          </Grid>

          <Grid item xs={12} {...style.LoginButtonProps}>
            <LoginButtonGoogle />
          </Grid>
          <Grid item xs={12} {...style.LoginButtonProps}>
            <LoginButtonMicrosoft />
          </Grid>
          <Grid item xs={12} {...style.LoginButtonProps}>
            <LoginButtonFacebook />
          </Grid>

          <Grid item xs={12} {...style.CarrouselContainerProps}>
            {isLogingIn ? <CircularProgress /> : <PolaroidCarrusel images={IMAGE_LIST} />}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login;
