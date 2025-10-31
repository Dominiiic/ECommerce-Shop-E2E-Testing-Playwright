import { expect } from '@playwright/test';


async function getAllLinksFromPage(page) {
  // getByRole('link') only matches visible links
  // if you want to check all links, you can use a CSS selector
  // like 'locator("a")'
  //const links = page.getByRole("link");
    const allLinks = await page.getByRole("link").all();
    console.log(allLinks.length, " links found on the page");

    const allLinkHrefs = await Promise.all( 
        allLinks.map((link) => link.getAttribute("href"))
    );

    const validHrefs = new Set();

    for (const link of allLinkHrefs) {
        expect.soft(link, "link has no proper href").not.toBeFalsy();

        if (
            link &&
            !link.startsWith("mailto:") &&
            !link.startsWith("#")
        ) {
            validHrefs.add(new URL(link, page.url()).href);
        }
    }
    return validHrefs;
}

export { getAllLinksFromPage };