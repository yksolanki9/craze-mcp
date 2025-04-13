import axios, { AxiosRequestHeaders } from "axios";
import { ReimbursementRequest } from "./types.js";

/**
 * Get the S3 put file config
 * @param {string} contentType - Content type of the file
 * @returns {object} S3 put file config
 */
export const getS3PutFileConfig = (contentType: string) => ({
  headers: {
    "Content-Type": contentType,
  },
  transformRequest: (data: unknown, headers: AxiosRequestHeaders) => {
    delete headers.Authorization;
    return data;
  },
});

/**
 * PUT a reimbursement document
 * @param {string} reimbursementRequestId - ID of the reimbursement
 * @param {string} documentName - Name of the document
 * @param {File} document - Document file
 */
export const putReimbursementDocument = async (
  reimbursementRequestId: string,
  documentName: string,
  document: File
): Promise<void> => {
  // PUT request to the internal API
  const response = await axios.put(
    `${process.env.CRAZE_API_URL}/organizations/${process.env.ORGANIZATION_ID}/documents/payroll/reimbursements/${reimbursementRequestId}/${documentName}`
  );

  // Use the presigned URL to upload the file to S3
  await axios.put(
    response.data.presignedUrl,
    document,
    getS3PutFileConfig(document.type)
  );
};

/**
 * PUT documents to S3
 * @param requestId - Request ID
 * @param documents - Documents to upload
 */
export const submitReimbursementRequestDocuments = async (
  requestId: string,
  documents: File[]
) => {
  // Upload added documents to S3
  await Promise.allSettled(
    documents.map((document) =>
      putReimbursementDocument(requestId, document.name, document)
    )
  );
};

/**
 * Get all reimbursement requests for the current user
 * @returns {Promise<ReimbursementRequest[]>} Array of reimbursement requests
 */
export const getReimbursementRequests = async (): Promise<
  ReimbursementRequest[]
> => {
  const reimbursementRequestsUrl = `${process.env.CRAZE_API_URL}/organizations/${process.env.ORGANIZATION_ID}/approval-records/requester-view/${process.env.USER_ID}/REIMBURSEMENT`;
  const response = await axios.get(reimbursementRequestsUrl);
  return response.data;
};

/**
 * Create a new reimbursement request
 * @param {object} reimbursementRequest - Reimbursement request object
 * @returns {Promise<string>} ID of the created reimbursement request
 */
export const createReimbursementRequest = async (
  reimbursementRequest: object
): Promise<string> => {
  const reimbursementRequestsUrl = `${process.env.CRAZE_API_URL}/organizations/${process.env.ORGANIZATION_ID}/approval-records/${process.env.USER_ID}/REIMBURSEMENT`;
  const response = await axios.post(
    reimbursementRequestsUrl,
    reimbursementRequest
  );
  return response.headers.location.split("/").pop();
};
