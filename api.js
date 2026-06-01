class ProductApiService {
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
    }

    getAll(success, error) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${this.baseUrl}/stocks`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => xhr.status >= 200 && xhr.status < 300
            ? success(JSON.parse(xhr.responseText))
            : error(xhr.status, xhr.responseText);
        xhr.onerror = () => error(xhr.status, 'Network error');
        xhr.send();
    }

    getById(id, success, error) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${this.baseUrl}/stocks/${id}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => xhr.status >= 200 && xhr.status < 300
            ? success(JSON.parse(xhr.responseText))
            : error(xhr.status, xhr.responseText);
        xhr.onerror = () => error(xhr.status, 'Network error');
        xhr.send();
    }

    create(data, success, error) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${this.baseUrl}/stocks`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => xhr.status >= 200 && xhr.status < 300
            ? success(JSON.parse(xhr.responseText))
            : error(xhr.status, xhr.responseText);
        xhr.onerror = () => error(xhr.status, 'Network error');
        xhr.send(JSON.stringify(data));
    }

    update(id, data, success, error) {
        const xhr = new XMLHttpRequest();
        xhr.open('PATCH', `${this.baseUrl}/stocks/${id}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => xhr.status >= 200 && xhr.status < 300
            ? success(JSON.parse(xhr.responseText))
            : error(xhr.status, xhr.responseText);
        xhr.onerror = () => error(xhr.status, 'Network error');
        xhr.send(JSON.stringify(data));
    }

    delete(id, success, error) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `${this.baseUrl}/stocks/${id}`, true);
        xhr.onload = () => xhr.status >= 200 && xhr.status < 300
            ? success()
            : error(xhr.status, xhr.responseText);
        xhr.onerror = () => error(xhr.status, 'Network error');
        xhr.send();
    }
}

window.api = new ProductApiService();