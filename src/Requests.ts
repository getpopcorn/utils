type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const datasetGetRequest = (datasetApiBaseUrl: string, datasetId: string) => ({
  endpoint: `${datasetApiBaseUrl}/dataset/${datasetId}`,
  method: 'GET' as HttpMethod
});

export const datasetAddRequest = (
  datasetApiBaseUrl: string,
  datasetId: string,
  resourceType: string,
  data: Record<string, any>
) => ({
  endpoint: `${datasetApiBaseUrl}/dataset/${datasetId}/${resourceType}`,
  method: 'PUT' as HttpMethod,
  message: JSON.stringify(data)
});

export const datasetDeleteRequest = (
  datasetApiBaseUrl: string,
  datasetId: string,
  resourceType: string,
  resourceId: string
) => ({
  endpoint: `${datasetApiBaseUrl}/dataset/${datasetId}/${resourceType}/${resourceId}`,
  method: 'DELETE' as HttpMethod
});

export const datasetUpdateRequest = (
  datasetApiBaseUrl: string,
  datasetId: string,
  resourceType: string,
  resourceId: string,
  data: Record<string, any>
) => ({
  endpoint: `${datasetApiBaseUrl}/dataset/${datasetId}/${resourceType}/${resourceId}`,
  method: 'PATCH' as HttpMethod,
  message: JSON.stringify(data)
});
