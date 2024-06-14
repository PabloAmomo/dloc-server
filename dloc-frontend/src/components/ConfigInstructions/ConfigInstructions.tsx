import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ConfigInstructionLine from 'components/ConfigInstructionsLine/ConfigInstructionsLine';
import style from './ConfigInstructions.style';

const ConfigInstructions = (props: ConfigInstructionsProps) => {
  const { isOpen, setIsOpen } = props;
  const { t } = useTranslation();
  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle {...style.DialogTitleProps}>
        <Typography variant="h5">{t('instructions.title')}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body1">{t('instructions.subtitle')}</Typography>
        </DialogContentText>

        <Grid container spacing={2} mt={2}>
          {/* Start */}
          <Grid item xs={12}>
            <Typography variant="h6">{t('instructions.prestep.title')}</Typography>
            <Typography variant="caption">
              {t('instructions.prestep.text1')}
              <br />
              <i>{t('instructions.prestep.text2')}</i>.
            </Typography>
          </Grid>

          {/* Instructions */}
          {[0, 1, 2, 3, 4, 5].map((item) =>
            ConfigInstructionLine(
              (`${item}`),
              t(`instructions.step${item}.title`),
              t(`instructions.step${item}.resume`),
              t(`instructions.step${item}.command`),
              t(`instructions.step${item}.extraCommand`),
              t(`instructions.step${item}.response`)
            )
          )}

          {/* Final steps */}
          <Grid item xs={12}>
            <Typography variant={'caption'}>{t('instructions.step6.text1')}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color={'grey'}>
              {t('instructions.step6.text2')}
            </Typography>
            <br />
            <Typography variant="caption">{t('instructions.step6.text3')}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfigInstructions;

interface ConfigInstructionsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface configLineProps {}
