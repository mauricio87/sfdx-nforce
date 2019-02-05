import { Connection } from '@salesforce/core';
import { QueryResult, Record, CleaningObjectResult } from './types';

export async function getProfiles(conn: Connection, name?: string, id?: string): Promise<Record[]> {

    let query = `Select Id, Name from Profile `;
    if (name) {
        query += `where name = '${name}'`;
    } 
    else if(id) {
        query += `where Id = '${id}'`;
    }

    const results = <QueryResult> await conn.query(query);
    if (results.totalSize === 0) {
        throw new Error('We were not able to find any profiles');
    } else {
        return results.records;
    }
}

export async function cleanProfiles(conn: Connection, id: string): Promise<CleaningObjectResult> {

    let query = `Select Id, Name from Profile `;
    
    if (id) {
        query += `where Id = '${id}'`;
    }

    const results = <QueryResult>await conn.query(query);
    let result;
    result.code = 200;
    result.message = "Success";
    if (results.totalSize === 0) {
        throw new Error('We were not able to find any profiles');
    } else {
        return result;
    }

}