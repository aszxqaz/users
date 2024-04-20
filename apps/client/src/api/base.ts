import axios, { AxiosInstance } from 'axios';

export class BaseApiClient {
    protected readonly client: AxiosInstance;
    protected headers: Record<string, string> = {};

    constructor() {
        this.client = axios.create({ baseURL: '/api' });
    }

    getHeadersWithAuth(
        headers: Record<string, string> = {}
    ): Record<string, string> {
        if (localStorage.getItem('access_token')) {
            return {
                ...headers,
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            };
        }
        return headers;
    }
}
