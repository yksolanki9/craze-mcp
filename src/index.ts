import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";
import { z } from "zod";
import { ReimbursementRequest } from "./database.js";
import { ExpenseType } from "./enums.js";

dotenv.config();

const getReimbursementRequests = async () => {
  const reimbursementRequestsUrl = `${process.env.CRAZE_API_URL}/organizations/${process.env.ORGANIZATION_ID}/approval-records/requester-view/${process.env.USER_ID}/REIMBURSEMENT`;
  const response = await fetch(reimbursementRequestsUrl, {
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });
  return response.json();
};

const createReimbursementRequest = async (reimbursementRequest: {
  amount: number;
  expense_date: string;
  expense_type: ExpenseType;
}) => {
  const reimbursementRequestsUrl = `${process.env.CRAZE_API_URL}/organizations/${process.env.ORGANIZATION_ID}/approval-records/${process.env.USER_ID}/REIMBURSEMENT`;
  const response = await fetch(reimbursementRequestsUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    body: JSON.stringify(reimbursementRequest),
  });
};

interface AlertFeature {
  properties: {
    event?: string;
    areaDesc?: string;
    severity?: string;
    status?: string;
    headline?: string;
  };
}

// Format alert data
function formatReimbursementRequest(
  reimbursementRequest: ReimbursementRequest
): string {
  const props = reimbursementRequest;
  return [
    `Amount: ${props.amount || "Unknown"}`,
    `Date: ${props.expense_date || "Unknown"}`,
    `Created at: ${props.created_at || "Unknown"}`,
    `Expense type: ${props.expense_type || "Unknown"}`,
  ].join("\n");
}

interface ForecastPeriod {
  name?: string;
  temperature?: number;
  temperatureUnit?: string;
  windSpeed?: string;
  windDirection?: string;
  shortForecast?: string;
}

interface AlertsResponse {
  features: AlertFeature[];
}

interface PointsResponse {
  properties: {
    forecast?: string;
  };
}

interface ForecastResponse {
  properties: {
    periods: ForecastPeriod[];
  };
}

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
    amount: z.number().describe("Amount of the reimbursement request"),
    expense_date: z.string().describe("Date of the expense"),
    expense_type: z.nativeEnum(ExpenseType).describe("Type of the expense"),
  },
  async (reimbursementRequest) => {
    try {
      await createReimbursementRequest(reimbursementRequest);
      return {
        content: [
          {
            type: "text",
            text: "Reimbursement request created successfully",
          },
        ],
      };
    } catch (error) {
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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Craze MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
