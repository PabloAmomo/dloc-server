import { addShareDevice } from './addShareDevice';
import { createErrorResponse } from '../../functions/createErrorResponse';
import { createOkResponse } from '../../functions/createOkResponse';
import { deleteShareDevice } from './deleteShareDevice';
import { DeviceParams } from '../../persistence/entities/DeviceParams';
import { encriptionHelper } from '../../functions/encriptionHelper';
import { getDeviceParams } from '../../persistence/mySql/getDeviceParams';
import { GetDeviceParamsResult } from '../../persistence/models/GetDeviceParamsResult';
import { Persistence } from '../../persistence/_Persistence';
import { Response } from '../../models/Response';
import { SaveDeviceParamsResult } from '../../persistence/models/SaveDeviceParamsResult';

const updateDeviceParams = async (imei: string, userId: string, deviceParams: DeviceParams, persistence: Persistence): Promise<Response> => {
  const errorRetVal = { update: false };

  /** Get current device params */
  let getDeviceParamsResult: GetDeviceParamsResult = await getDeviceParams(imei, userId, encriptionHelper);

  /** Check errors */
  if (getDeviceParamsResult.error) return createErrorResponse(500, getDeviceParamsResult.error.message, errorRetVal);
  if (!getDeviceParamsResult.results) return createErrorResponse(400, 'device not found', errorRetVal);

  /** Get current device params and get added and removed Shared */
  const currentDeviceParams: DeviceParams = getDeviceParamsResult.results;

  /** Track changes in sharedWiths */
  const currentsEmails: string[] = (currentDeviceParams?.sharedWiths ?? []).map((sharedWith) => sharedWith.email);
  const newEmails: string[] = (deviceParams?.sharedWiths ?? []).map((sharedWith) => sharedWith.email);
  const addedsItemsToSharedWiths = newEmails.filter((email) => !currentsEmails.includes(email));
  const removedItemsFromSharedWiths = currentsEmails.filter((email) => !newEmails.includes(email));

  /** Add or remove sharedWiths */
  for (let email of addedsItemsToSharedWiths) {
    const response = await addShareDevice(imei, userId, email, persistence);
    if (response.code !== 200) return createErrorResponse(500, 'error adding shared device', errorRetVal);
  }
  for (let email of removedItemsFromSharedWiths) {
    const response = await deleteShareDevice(imei, userId, email, persistence);
    if (response.code !== 200) return createErrorResponse(500, 'error deleting shared device', errorRetVal);
  }

  /** Save Device Params */
  const response: SaveDeviceParamsResult = await persistence.saveDeviceParams(imei, userId, deviceParams, encriptionHelper);

  /** Process */
  if (response?.error?.message) return createErrorResponse(500, response.error.message, errorRetVal);

  /** All Ok */
  return createOkResponse({ update: true });
};

export { updateDeviceParams };
