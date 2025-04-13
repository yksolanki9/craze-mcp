import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import axios from "axios";
import dotenv from "dotenv";
import { readFile } from "fs/promises";
import { z } from "zod";
import {
  createReimbursementRequest,
  getReimbursementRequests,
  putReimbursementDocument,
} from "./api.js";
import { ExpenseType } from "./enums.js";
import { ReimbursementRequest } from "./types.js";
import { toRupees } from "./utils.js";

dotenv.config();

axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer " + process.env.ACCESS_TOKEN;
    return config;
  },
  (error) => {
    console.log(error);
    void Promise.reject(error);
  }
);

const formatReimbursementRequest = (
  reimbursementRequest: ReimbursementRequest
): string => {
  return [
    `Amount: Rs.${toRupees(reimbursementRequest.amount)}`,
    `Date: ${reimbursementRequest.expense_date || "Unknown"}`,
    `Created at: ${reimbursementRequest.created_at || "Unknown"}`,
    `Expense type: ${reimbursementRequest.expense_type || "Unknown"}`,
    `Status: ${reimbursementRequest.approval_record.status || "Unknown"}`,
    `Comment: ${reimbursementRequest.approval_record.comment || "Unknown"}`,
  ].join("\n");
};

// Create server instance
const server = new McpServer({
  name: "craze",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Register craze tools
server.tool(
  "get-reimbursement-requests",
  "Get reimbursement requests for a user",
  async () => {
    const reimbursementRequests = await getReimbursementRequests();

    if (reimbursementRequests.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No reimbursement requests found for your account`,
          },
        ],
      };
    }

    const formattedReimbursementRequests = reimbursementRequests.map(
      formatReimbursementRequest
    );
    const reimbursementRequestsText = `Reimbursement requests for your account:\n\n${formattedReimbursementRequests.join(
      "\n"
    )}`;

    return {
      content: [
        {
          type: "text",
          text: reimbursementRequestsText,
        },
      ],
    };
  }
);

server.tool(
  "create-reimbursement-request",
  "Create a reimbursement request",
  {
    request: z.object({
      amount: z
        .number()
        .describe("Amount of the reimbursement request in paise"),
      expense_date: z.string().describe("Date of the expense"),
      expense_type: z.nativeEnum(ExpenseType).describe("Type of the expense"),
    }),
    approval_record: z.object({
      comment: z
        .string()
        .optional()
        .describe("Comment for the reimbursement request"),
    }),
    file_path: z
      .string()
      .optional()
      .describe("File path for the reimbursement request"),
  },
  async (reimbursementRequest) => {
    try {
      const reimbursementRequestId = await createReimbursementRequest(
        reimbursementRequest
      );

      if (reimbursementRequest.file_path) {
        const file = await readFile(
          process.env.BASE_FILE_PATH + reimbursementRequest.file_path
        );
        await putReimbursementDocument(
          reimbursementRequestId,
          reimbursementRequest.file_path,
          file
        );
      }

      return {
        content: [
          {
            type: "text",
            text: "Reimbursement request created successfully",
          },
        ],
      };
    } catch (error) {
      console.error(error);
      return {
        content: [
          {
            type: "text",
            text: "Failed to create reimbursement request",
          },
        ],
      };
    }
  }
);

const main = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Craze MCP Server running on stdio");
};

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
