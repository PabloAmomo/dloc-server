import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PlatformInstructionsSteps from 'components/PlatformInstructionsSteps/PlatformInstructionsSteps';
import style from './PlatformInstructions.style';

const PlatformInstructions = (props: PlatformInstructionsProps) => {
  const { isOpen, setIsOpen, textKey, stepsKey, preStepKey } = props;
  const { t } = useTranslation();
  const handleClose = () => setIsOpen(false);

  const showTitle = t(`${textKey}.title`) !== `${textKey}.title`;
  const showSteps = t(`${stepsKey}.step0.title`) !== `${stepsKey}.step0.title`;

  const subtitles = t(`${textKey}.subtitle`).split('\n');

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {showTitle && <DialogTitle {...style.DialogTitleProps}>{t(`${textKey}.title`)}</DialogTitle>}

      <DialogContent>
        {showTitle && (
          <DialogContentText>
            {subtitles.map((text) => (
              <p>{text}</p>
            ))}
          </DialogContentText>
        )}

        {showSteps && <PlatformInstructionsSteps stepsKey={stepsKey} preStepKey={preStepKey} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlatformInstructions;

interface PlatformInstructionsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  textKey: string;
  stepsKey: string;
  preStepKey: string;
}