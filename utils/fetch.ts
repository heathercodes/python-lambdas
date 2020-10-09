import fetch from "isomorphic-fetch";
const { APP_URL } = process.env;

export async function get(url: string): Promise<any> {
    try {
        const response = await fetch(`${APP_URL}${url}`, {
            method: "get",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });

          return response.json();
    } catch (err) {
        return Promise.reject(new Error(err));
    }
}

export async function post(url: string, payload: {}): Promise<any> {
    try {
        const response = await fetch(`${APP_URL}${url}`, {
            method: "post",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          });

          return response.json();
    } catch (err) {
        return Promise.reject(new Error(err));
    }
}

export async function put(url: string, payload: {}): Promise<any> {
    try {
        const response = await fetch(`${APP_URL}${url}`, {
            method: "put",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          });

        return response.json();
    } catch (err) {
        return Promise.reject(new Error(err));
    }
}

export async function delete(url: string, payload: {}): Promise<any> {
    try {
        const response = await fetch(`${APP_URL}${url}`, {
            method: "delete",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          });

        return response.json();
    } catch (err) {
        return Promise.reject(new Error(err));
    }
}

/**
 * graphQl
 * Instead of passing it a payload, make a
 * graphQl querystring and pass it in
 */
export function graphQl(query: string, variables: {} = {}): Promise<any> {
    try {
        const response = await fetch(`${APP_URL}/api/graphql`, {
            method: "post",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ query, variables }),
          })

        return response.json();
    } catch (err) {
        return Promise.reject(new Error(err));
    }
}
