import { Persistence } from '../../persistence/_Persistence';
import { Response } from '../../models/Response';
import { DeleteDeviceResult } from '../../persistence/models/DeleteDeviceResult';
import { GetDeviceOwnerStateResult } from '../../persistence/models/GetDeviceWonerStateResult';
import { getDeviceOwnerState } from '../../persistence/mySql/getDeviceOwnerState';
import { DeviceOwnerStates } from '../../enums/DeviceOwnerStates';
import { createErrorResponse } from '../../functions/createErrorResponse';
import { createOkResponse } from '../../functions/createOkResponse';

const deleteDevice = async (imei: string, userId: string, persistence: Persistence): Promise<Response> => {
  const errorRetVal = { deleted: false };
  const okRetVal = { deleted: true };

  /** Get the device state */
  const getDeviceOwnerStateResult: GetDeviceOwnerStateResult = await getDeviceOwnerState(imei);

  /** Check errors */
  if (getDeviceOwnerStateResult.state === DeviceOwnerStates.error) return createErrorResponse(500, 'error consulting availability', errorRetVal);
  else if (getDeviceOwnerStateResult.state === DeviceOwnerStates.notfound) return createErrorResponse(404, 'device not found', errorRetVal);
  else if (getDeviceOwnerStateResult.userAssigned !== userId) return createErrorResponse(401, 'device not assigned to the user', errorRetVal);

  /** Already deleted */
  if (getDeviceOwnerStateResult.state !== DeviceOwnerStates.assigned) return createOkResponse(okRetVal);

  /** Delete the device */
  const response: DeleteDeviceResult = await persistence.deleteDevice(imei, userId);
  if (response?.error?.message) return createErrorResponse(500, response.error.message, errorRetVal);

  /** All Ok */
  return createOkResponse(okRetVal);
};

export { deleteDevice };
