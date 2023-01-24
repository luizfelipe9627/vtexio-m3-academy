import axios from "axios";

interface IBaseMDRestHeaders extends Record<string, string> {
    Accept: "application/vnd.vtex.ds.v10+json";
    "Content-Type": "application/json";
}


export default class MasterDataRest {
    private url: string;
    private urlDoc: string;
    private baseHeaders: IBaseMDRestHeaders
    /**
     *
     * @param {String} entityName - Singla da entidade do masterData
     */
    constructor(entityName: string) {
        this.url = `/api/dataentities/${entityName}/`;
        this.urlDoc = `/api/dataentities/${entityName}/documents/`;

        this.baseHeaders = {
            Accept: "application/vnd.vtex.ds.v10+json",
            "Content-Type": "application/json",
        };
    }

    /**
     * Realiza uma request http para o MasterData pela rota:
     *  - https://developers.vtex.com/reference/search
     * @param {} query - objecto com os query params
     * @param {} headers - Objeto com as informaçoes do cabeçalho da request
     *
     */
    public search(query = {}, headers = {}) {
        const params = new URLSearchParams(query).toString();
        return axios(`${this.url}search/?${params}`, {
            method: "GET",
            headers: this._mergedHeaders(headers),
        });
    }

    public indices(query = {}, headers = {}) {
        const params = new URLSearchParams(query).toString();
        return axios(`${this.url}indices/?${params}`, {
            method: "GET",
            headers: this._mergedHeaders(headers),
        });
    }

    public get(id: string) {
        return axios(this.urlDoc + id, {
            method: "GET",
            headers: this._mergedHeaders(),
        });
    }

    public post<T>(data: T) {
        return axios(this.urlDoc, {
            method: "POST",
            data,
            headers: this._mergedHeaders(),
        });
    }

    public patch<T>(data: T) {
        return axios(this.urlDoc, {
            method: "PATCH",
            data,
            headers: this._mergedHeaders(),
        });
    }

    public put<T>(data: T) {
        return axios(this.urlDoc, {
            method: "PATCH",
            data,
            headers: this._mergedHeaders(),
        });
    }

    public delete(id: string) {
        return axios(this.urlDoc + id, {
            method: "DELETE",
            headers: this._mergedHeaders(),
        });
    }

    public getAttachment(id: string, field: string, fileName: string) {
        return axios(`${this.urlDoc}${id}/${field}/attachments/${fileName}`, {
            method: "GET",
        });
    }

    private _mergedHeaders<T>(headers?: T) {
        if (!headers) return new Headers(this.baseHeaders);

        const mergedHeaders = {
            ...this.baseHeaders,
            ...headers
        };

        return new Headers(mergedHeaders);
    }
}
