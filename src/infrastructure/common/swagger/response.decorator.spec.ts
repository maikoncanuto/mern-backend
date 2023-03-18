import { ApiResponseType } from './response.decorator';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseFormat } from '../interceptors/response.interceptor';

class TestModel {}

describe('ApiResponseType', () => {
  it('should return a decorated function with the correct ApiResponse configuration', () => {
    const originalApiOkResponse = ApiOkResponse;
    let capturedOptions = null;

    // Mock the ApiOkResponse decorator
    (ApiOkResponse as any) = (options) => {
      capturedOptions = options;
      return originalApiOkResponse(options);
    };

    // Call ApiResponseType and get the decorator
    ApiResponseType(TestModel, false);

    // Verify the ApiResponse configuration
    expect(capturedOptions.isArray).toBe(false);
    expect(capturedOptions.schema.allOf).toHaveLength(2);
    expect(capturedOptions.schema.allOf[0]).toEqual({ $ref: getSchemaPath(ResponseFormat) });
    expect(capturedOptions.schema.allOf[1].properties.data).toEqual({ $ref: getSchemaPath(TestModel) });
    expect(capturedOptions.schema.allOf[1].properties.isArray).toEqual({ type: 'boolean', default: false });

    // Restore the original ApiOkResponse decorator
    (ApiOkResponse as any) = originalApiOkResponse;
  });
});
