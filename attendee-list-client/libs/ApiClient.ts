export class ApiClient {
    private readonly baseUrl: string;
    private readonly headers: any;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.headers = {
            'Content-Type': 'application/json'
        };
    }

    async getToken(userId: string) {
        const response = await fetch(`${this.baseUrl}/api/auth/token`, {
            method: 'GET',
            headers: this.headers
        });
        if (response.status !== 200) {
            throw new Error(`Server returned HTTP ${response.status}`);
        }
        return await response.json();
    }

    async getSession() {
        const response = await fetch(`${this.baseUrl}/api/get_session/`, {
            method: 'GET',
            headers: this.headers
        });
        if (response.status !== 200) {
            throw new Error(`Server returned HTTP ${response.status}`);
        }
    }

    async update(data: any): Promise<void> {
        const url = `${this.baseUrl}/api/upload_data`;
        console.log(url);
        const response = await fetch(url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(data)
        });
        if (response.status !== 200) {
            throw new Error(`Server returned HTTP ${response.status}`);
        }
    }

    async upsert(data: any): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/upload_data`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(data)
        });
        if (response.status !== 200) {
            throw new Error(`Server returned HTTP ${response.status}`);
        }
    }

    async delete(data: any): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/upload_data`, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify(data)
        });
        if (response.status !== 200) {
            throw new Error(`Server returned HTTP ${response.status}`);
        }
    }
}
