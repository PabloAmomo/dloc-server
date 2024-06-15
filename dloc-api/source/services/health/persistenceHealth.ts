import { Persistence } from '../../persistence/_Persistence';
import { Response, ResponseCode } from "../../models/Response";
import { PersistenceResult } from "../../persistence/models/PersistenceResult";
import { createOkResponse } from '../../functions/createOkResponse';
import { createErrorResponse } from '../../functions/createErrorResponse';

const persistenceHealth = async (persistence: Persistence) : Promise<Response> => { 
  const response: PersistenceResult = await persistence.health();

  if (response.error) return createErrorResponse(ResponseCode.INTERNAL_SERVER_ERROR, response.error.message, []);
    
  return createOkResponse(response.results[0]);
};

export { persistenceHealth };
