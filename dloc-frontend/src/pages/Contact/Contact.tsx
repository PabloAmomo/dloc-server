import { Button, Grid, Link, TextField } from '@mui/material';
import { SendEmailResult } from 'models/sendEmailResult';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserContext } from 'providers/UserProvider';
import isEmail from 'functions/isEmail';
import PageContainer from 'components/PageContainer/PageContainer';
import contactUs from 'services/contactUs/contactUs';
import showAlert from 'functions/showAlert';
import style from './Contact.style';
import { logError } from 'functions/logError';
import { Navigate, useNavigate } from 'react-router-dom';

function Contact() {
  const { user, isLoggedIn } = useUserContext();
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({ name: user.profile.name, email: user.profile.email, message: '' });
  const [validForm, setValidForm] = useState(false);
  const abortSendEmail = useRef<AbortController>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!formValues.name || !formValues.email || !formValues.message || !isEmail(formValues.email)) return setValidForm(false);
    setValidForm(true);
  }, [formValues]);

  const clickOnReturn = () => {
    navigate(-1);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const clickOnSend = () => {
    if (!formValues.name || !formValues.email || !formValues.message) {
      showAlert(t('fillAllFields'), 'error');
      return;
    };
    if (!isEmail(formValues.email)) {
      showAlert(t('invalidEmail'), 'error');
      return;
    }

    // TODO: Send the formValues to the server and if OK, call sendOk() if Error, show an error message
    contactUs({
      ...formValues,
      callback: (response: SendEmailResult) => {
        try {
          if (!response.error) {
            setFormValues({ ...formValues, message: '' });
            showAlert(t('messageSended'), 'success');
          }
          else throw new Error(response.error.message);

        } catch (error: any) {
          logError('sendEmail', error.message);
          showAlert(t('errorSendingMessage'), 'error');
        }
      },
      abort: abortSendEmail,
    });
  };

  return (
    <PageContainer {...style.PageProps}>
      <Grid container spacing={2} {...style.GridContainer}>
        <Grid {...style.GridItemProps} item>
          <Link href="mailto:info@maiPet.es" underline='none' color={'primary'} variant="h6" textAlign={'center'}>
            {t('sendUsEmail.line1')}<br />
            {t('sendUsEmail.line2')}
          </Link>
        </Grid>

        <Grid {...style.GridItemProps} item>
          <TextField
            disabled={isLoggedIn}
            fullWidth
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            required
          />
        </Grid>

        <Grid {...style.GridItemProps} item>
          <TextField
            disabled={isLoggedIn}
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            required
          />
        </Grid>

        <Grid {...style.GridItemProps} item>
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={formValues.message}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            required
            multiline
            rows={8}
          />
        </Grid>

        <Grid {...style.GridItemProps} item xs={12}>
          <Grid xs={6} item textAlign={'start'}>
          <Button variant="outlined" color="primary" {...style.ButtonAction} onClick={clickOnReturn}>
              {t('return')}
            </Button>
          </Grid>
          <Grid xs={6} item textAlign={'end'}>
            <Button variant="contained" color="primary" {...style.ButtonAction} onClick={clickOnSend} disabled={!validForm}>
              {t('send')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default Contact;
