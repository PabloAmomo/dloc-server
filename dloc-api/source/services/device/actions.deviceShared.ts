import { addShareDevice } from './addShareDevice';
import { checkToken } from '../../functions/checkToken';
import { deleteShareDevice } from './deleteShareDevice';
import { getPersistence } from '../../persistence/persistence';
import { getTokenAndAuthFromReq } from '../../functions/getTokenAndAuthFromReq';
import { Request, Response } from 'express';
import { UserData } from '../../models/UserData';
import { encriptionHelper } from '../../functions/encriptionHelper';

export enum DeviceSharedActionsType {
  ADD = 'ADD',
  DELETE = 'DELETE',
}

const deviceSharedActions: DeviceSharedActionsProps = async (type, req, res) => {
  const imei: string = req.params?.id;
  const email: string = req.body?.email ?? '';

  /** validate user */
  const userData: UserData = await checkToken({ ...getTokenAndAuthFromReq(req), persistence: getPersistence(), encription: encriptionHelper });
  if (!userData.userId) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }

  /** validate imei and email */
  if (!imei || imei === '' || !email || email === '') {
    res.status(400).json({ error: 'imei and email is required' });
    return;
  }

  /** execute */
  if (type === 'ADD') {
    addShareDevice(imei, userData.userId, email, getPersistence()).then((response) => res.status(response.code).json(response.result));
  } else if (type === 'DELETE') {
    deleteShareDevice(imei, userData.userId, email, getPersistence()).then((response) => res.status(response.code).json(response.result));
  }
};

export { deviceSharedActions };

interface DeviceSharedActionsProps {
  (type: DeviceSharedActionsType, req: Request, res: Response): void;
}
