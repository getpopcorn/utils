type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const datasetGetRequestObject = (datasetApiBaseUrl: string, datasetId: string) => ({
  endpoint: `${datasetApiBaseUrl}/dataset/${datasetId}`,
  method: 'GET' as HttpMethod
});

export const datasetAddRequestObject = (
  datasetApiBaseUrl: string,
  datasetId: string,
  resourceType: string,
  data: Record<string, any>
) => ({
  endpoint: `${datasetApiBaseUrl}/dataset/${datasetId}/${resourceType}`,
  method: 'PUT' as HttpMethod,
  message: JSON.stringify(data)
});

export const datasetDeleteRequestObject = (
  datasetApiBaseUrl: string,
  datasetId: string,
  resourceType: string,
  resourceId: string
) => ({
  endpoint: `${datasetApiBaseUrl}/dataset/${datasetId}/${resourceType}/${resourceId}`,
  method: 'DELETE' as HttpMethod
});

export const datasetUpdateRequestObject = (
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
