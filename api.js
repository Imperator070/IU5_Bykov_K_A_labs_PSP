class ProductApiService {
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
    }

    async getAll() {
        const response = await fetch(`${this.baseUrl}/stocks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw { status: response.status, message: await response.text() };
        }
        
        return response.json();
    }
    
    async getById(id) {
        const response = await fetch(`${this.baseUrl}/stocks/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw { status: response.status, message: await response.text() };
        }
        
        return response.json();
    }

    async create(data) {
        const response = await fetch(`${this.baseUrl}/stocks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw { status: response.status, message: await response.text() };
        }
        
        return response.json();
    }

    async update(id, data) {
        const response = await fetch(`${this.baseUrl}/stocks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw { status: response.status, message: await response.text() };
        }
        
        return response.json();
    }

    async delete(id) {
        const response = await fetch(`${this.baseUrl}/stocks/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw { status: response.status, message: await response.text() };
        }
    }
}

window.api = new ProductApiService();