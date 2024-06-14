import { AddDeviceResult } from '../../persistence/models/AddDeviceResult';
import { createErrorResponse } from '../../functions/createErrorResponse';
import { deleteShareDeviceCode } from '../../persistence/mySql/deleteShareDeviceCode';
import { DeleteShareDeviceCodeResult } from '../../persistence/models/DeleteShareDeviceCodeResult';
import { DeviceOwnerStates } from '../../enums/DeviceOwnerStates';
import { DeviceParams } from '../../persistence/entities/DeviceParams';
import { getDeviceOwnerState } from '../../persistence/mySql/getDeviceOwnerState';
import { GetDeviceOwnerStateResult } from '../../persistence/models/GetDeviceWonerStateResult';
import { Persistence } from '../../persistence/_Persistence';
import { Response } from '../../models/Response';
import { createOkResponse } from '../../functions/createOkResponse';
import { encriptionHelper } from '../../functions/encriptionHelper';
import { UserData } from '../../models/UserData';
import { createSharedImei } from '../../functions/createSharedImei';

const addDevice = async (imei: string, userData: UserData, verificationCode: string, deviceParams: DeviceParams, persistence: Persistence): Promise<Response> => {
  const errorRetVal = { added: false };

  /** Check if device is available */
  const getDeviceOwnerStateResult: GetDeviceOwnerStateResult = await getDeviceOwnerState(imei);

  /** Check errors */
  if (getDeviceOwnerStateResult.state === DeviceOwnerStates.error) return createErrorResponse(500, 'error consulting availability', errorRetVal);
  else if (getDeviceOwnerStateResult.state === DeviceOwnerStates.assigned) return createErrorResponse(400, 'device already assigned', errorRetVal);
  else if (getDeviceOwnerStateResult.state === DeviceOwnerStates.notfound) return createErrorResponse(404, 'error consulting availability', errorRetVal);
  else if (getDeviceOwnerStateResult.isCloned && getDeviceOwnerStateResult.verificationCode !== verificationCode)
    return createErrorResponse(500, 'invalid verification code', errorRetVal);

  /** Check for cloned device if the imei is correcto for the user email */
  if (getDeviceOwnerStateResult.isCloned) {
    const sharedImei = createSharedImei(getDeviceOwnerStateResult.clonedImei , userData.email);
    if (sharedImei !== imei) return createErrorResponse(500, 'invalid imei', errorRetVal);
  }

  /** Delete shared code if device is a cloned device */
  if (getDeviceOwnerStateResult.isCloned) {
    const deleteShareDeviceCodeResult: DeleteShareDeviceCodeResult = await deleteShareDeviceCode(imei);
    if (deleteShareDeviceCodeResult.error) return createErrorResponse(500, deleteShareDeviceCodeResult.error.message, errorRetVal);
  }

  /** Add the device */
  const response: AddDeviceResult = await persistence.addDevice(imei, userData.userId, deviceParams, encriptionHelper);
  if (response?.error?.message) return createErrorResponse(500, response.error.message, errorRetVal);

  /** All Ok */
  return createOkResponse({ added: true });
};

export { addDevice };
