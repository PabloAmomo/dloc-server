import { createErrorResponse } from '../../functions/createErrorResponse';
import { createOkResponse } from '../../functions/createOkResponse';
import { encriptionHelper } from '../../functions/encriptionHelper';
import { GetDevicesResult } from "../../persistence/models/GetDevicesResult";
import { Persistence } from '../../persistence/_Persistence';
import { Response } from "../../models/Response";

const getDevices = async (interval: number, userId: string, persistence: Persistence) : Promise<Response> => { 
  const response: GetDevicesResult = await persistence.getDevices(userId, interval, encriptionHelper);

  if (response.error) return createErrorResponse(500, response.error.message, []);
  
  return createOkResponse(response.results);
};

export { getDevices };
