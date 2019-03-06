import { Org } from '@salesforce/core';
import { QueryResult, Record, CleaningObjectResult } from './types';
import Browserforce from './browserforce';
import { UX } from '@salesforce/command';

export async function getProfiles(org: Org, name?: string, id?: string): Promise<Record[]> {

    let query = `Select Id, Name from Profile `;
    if (name) {
        query += `where name = '${name}'`;
    } 
    else if(id) {
        query += `where Id = '${id}'`;
    }

    const results = <QueryResult> await org.getConnection().query(query);
    if (results.totalSize === 0) {
        throw new Error('We were not able to find any profiles');
    } else {
        return results.records;
    }
}

export async function cleanProfiles(org: Org, ux: UX, profiles: Record[]): Promise<CleaningObjectResult> {

    const PATHS = {
        BASE: '/lightning/setup/Profiles/page?address='
    };
    const SELECTORS = {
        SAVE_BUTTON: 'input[name="save"]', 
        IFRAME: 'iframe[name^=vfFrameId]'
    };

    let bf = new Browserforce(org);

    await bf.login();

    for (const profile of profiles) {

        ux.startSpinner(`Cleaning ${profile.Name}.`);

        const page = bf.page;
        await page.goto(`${bf.getInstanceUrl()}/${PATHS.BASE}/${profile.Id}/e?`, {
            waitUntil: ['load', 'domcontentloaded', 'networkidle0']
        });

        await page.waitFor(SELECTORS.IFRAME);
        const frame = await page
            .frames()
            .find(f => f.name().startsWith('vfFrameId'));

        await frame.waitFor(
            SELECTORS.SAVE_BUTTON
        );

        await Promise.all([
            frame.waitForNavigation(),
            frame.click(SELECTORS.SAVE_BUTTON)
        ]);
       
        ux.stopSpinner();
    }

    

    // await bf.login();

    // const page = bf.page;
    // await page.goto(`${bf.getInstanceUrl()}/${PATHS.BASE}`, {
    //     waitUntil: ['load', 'domcontentloaded', 'networkidle0']
    // });

    // //await page.waitFor(SELECTORS.EDIT_BUTTON);

    // await page.waitFor(SELECTORS.IFRAME);
    // const frame = await page
    //     .frames()
    //     .find(f => f.name().startsWith('vfFrameId'));
    
    // await frame.waitFor(
    //     SELECTORS.EDIT_BUTTON
    // );
    // await Promise.all([
    //     frame.waitForNavigation(),
    //     frame.click(SELECTORS.EDIT_BUTTON) 
    // ]);

    bf.logout();
    
    return;
    

}