import { expect } from '@playwright/test';

async function checkAllLinksStatus(page, linkUrls) {
    const statusResults = [];

    for (const url of linkUrls) {
        const response = await page.request.get(url);
        statusResults.push(`${response.status()} ${url}`);
        console.log(response.status(), url);
        expect.soft(response.ok(), `${url} has 200 status code`).toBeTruthy();
    }
}

export { checkAllLinksStatus };