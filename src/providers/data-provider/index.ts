import { createDataProvider, CreateDataProviderOptions } from "@refinedev/rest";

import { CreateResponse, GetOneResponse, ListResponse } from "@/types";
import { BACKEND_BASE_URL } from "@/constants";

const options: CreateDataProviderOptions = {
    getList: {
        getEndpoint: ({ resource }) => resource,

        buildQueryParams: async ({ resource, pagination, filters }) => {
            const params: Record<string, string | number> = {};

            if (pagination?.mode !== "off") {
                // Use 'current' instead of 'currentPage' for Refine v4+
                const page = (pagination as any)?.current ?? 1;
                const pageSize = pagination?.pageSize ?? 10;

                params.page = page;
                params.limit = pageSize;
            }

            filters?.forEach((filter) => {
                const field = "field" in filter ? filter.field : "";
                const value = String(filter.value);

                if (field === "role") {
                    params.role = value;
                }

                if (resource === "departments") {
                    if (field === "name" || field === "code") params.search = value;
                }

                if (resource === "users") {
                    if (field === "search" || field === "name" || field === "email") {
                        params.search = value;
                    }
                }

                if (resource === "subjects") {
                    if (field === "department") params.department = value;
                    if (field === "name" || field === "code") params.search = value;
                }

                if (resource === "classes") {
                    if (field === "name") params.search = value;
                    if (field === "subject") params.subject = value;
                    if (field === "teacher") params.teacher = value;
                }
            });

            return params;
        },

        mapResponse: async (response) => {
            // Parse JSON once and store it on the response object
            const payload: ListResponse = await response.json();
            (response as any).__parsedJson = payload;
            return payload.data ?? [];
        },

        getTotalCount: async (response) => {
            // Reuse the parsed JSON from mapResponse
            const payload: ListResponse = (response as any).__parsedJson;
            return payload.pagination?.total ?? payload.data?.length ?? 0;
        },
    },

    create: {
        getEndpoint: ({ resource }) => resource,

        buildBodyParams: async ({ variables }) => variables,

        mapResponse: async (response) => {
            const json: CreateResponse = await response.json();
            return json.data ?? {};
        },
    },

    getOne: {
        getEndpoint: ({ resource, id }) => `${resource}/${id}`,

        mapResponse: async (response) => {
            const json: GetOneResponse = await response.json();
            return json.data ?? {};
        },
    },
};

// Validate BACKEND_BASE_URL before it is creating data provider
if (!BACKEND_BASE_URL) {
    throw new Error(
        "BACKEND_BASE_URL is not defined. Please set NEXT_PUBLIC_BACKEND_BASE_URL in your .env file."
    );
}

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export { dataProvider };