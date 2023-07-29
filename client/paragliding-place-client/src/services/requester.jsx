// import Cookies from "universal-cookie/es6";

// const cookies = new Cookies();

const requester = async (method, url, data) => {
    const options = {};

    if (method !== 'GET') {
        options.method = method;

        if (data) {
            options.headers = {
                'Content-Type': 'application/json',
                // 'X-CSRFToken': cookies.get('csrftoken'),
                // 'content-type': 'application/json',
            };
            options.body = JSON.stringify(data);
        }
    }

    const serializedAuth = localStorage.getItem('auth');

    if (serializedAuth) {
        const auth = JSON.parse(serializedAuth);

        if (auth.token) {
            options.headers = {
                ...options.headers,
                'Authorization': `Token ${auth.token}`,
            };
        }

        // if (auth.accessToken) {
        //     options.headers = {
        //         ...options.headers,
        //         'X-Authorization': auth.accessToken,
        //     };
        // }


        // const tokenVal = options.headers['Authorization'].split(' ')[1]
        // options.headers['Authorization'] = tokenVal

        // console.log(11111111, url, options)
    }

    const response = await fetch(url, options);

    if (response.status === 204) {
        return {};
    }

    if (response.status === 403) {
        window.localStorage.clear()
    }

    if (response.status === 404) {
        return result
    }

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;

};

export const requestFactory = () => {
    return {
        get: requester.bind(null, 'GET'),
        post: requester.bind(null, 'POST'),
        put: requester.bind(null, 'PUT'),
        patch: requester.bind(null, 'PATCH'),
        delete: requester.bind(null, 'DELETE'),
    }
};
