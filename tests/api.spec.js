import { test, expect } from '@playwright/test';

test(' PW-095 | Send GET request ', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    console.log(await response.json());
});

test(' PW-096 | Validate GET status    ', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    expect(await response.status()).toBe(200);
})

test(' PW-097 | Validate response JSON    ', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    const body = await response.json();

    expect(await body.id).toBe(1);
    expect(await body.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');

})

test(' PW-098 | Validate response headers  ', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    const headers = await response.headers();

    expect(headers['content-type']).toContain('application/json');
})

test(' PW-099 | Send POST request  ', async ({request}) => {
    const response = await request.post(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
            data: {
                title: 'Playwright Test Sonam',
                body: 'Learning API testing',
                userId: 1
            }
        }

    );

    console.log(await response.json());
});

test(' PW-100 | Send PUT request  ', async ({request}) => {
    const response = await request.put(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
            data: {
                id: 1,
                title: 'Updated Value',
                body: 'Updated body',
                userId: 1
            }
        }

    );

    console.log(await response.json());
});

test(' PW-101 | Send PATCH request ', async ({request}) => {
    const response = await request.patch(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
            data: {
                body: 'New Updated body',
            }
        }

    );

    console.log(await response.json());
});

test(' PW-102 | Send DELETE request ', async ({request}) => {
    const response = await request.patch(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    console.log(await response.json());
});

