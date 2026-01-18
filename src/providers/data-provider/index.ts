import {BaseRecord, DataProviders, GetListParams, GetListResponse} from "@refinedev/core";

const MOCK_SUBJECTS = [
    {
        id: 1,
        code: 'CS101',
        name: 'Introduction to CS',
        department: 'CS',
        description: 'An introductory course covering the fundamental concepts of CS and programming.',
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        code: 'MATH201',
        name: 'Calculus II',
        department: 'Math',
        description: 'An Advanced course covering the fundamental concepts of Maths.',
        createdAt: new Date().toISOString(),
    },
    {
        id: 3,
        code: 'ENG102',
        name: 'Literature',
        department: 'English',
        description: 'A course focued on critical reading and writing through the basics to advanced level.',
        createdAt: new Date().toISOString(),
    },
]

export const dataProvider: DataProviders = {
    getList: async <TData extends BaseRecord = BaseRecord>({ resource }: GetListParams): Promise<GetListResponse<TData>> => {
        if (resource !== "subjects") {
            return {
                data: [] as TData[], total: 0
            };
        }
            return {
              data: MOCK_SUBJECTS as unknown as TData[],
              total: MOCK_SUBJECTS.length,
            };
    },

    getOne: async () => {
        throw new Error('this function is not present in the mock')
    },
    create: async () => {
        throw new Error('this function is not present in the mock')
    },
    update: async () => {
        throw new Error('this function is not present in the mock')
    },
    deleteOne: async () => {
        throw new Error('this function is not present in the mock')
    },

    getApiUrl: () => '',
}