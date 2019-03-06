import { core, flags, SfdxCommand } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
//import profileHelper = require('../../../shared/profileTools'); 
//import { Org } from '@salesforce/core';

// Initialize Messages with the current plugin directory
core.Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = core.Messages.loadMessages('sfdx-nforce', 'org');

export default class share extends SfdxCommand {

    public static description = messages.getMessage('share-commandDescription');

    public static examples = [
        `$ sfdx nforce:org:share`,
        `$ sfdx nforce:org:share -u -a`
    ];

    protected static flagsConfig = {
        // flag with a value (-u, --url)
        url: flags.string({ char: 'u', description: messages.getMessage('share-urlFlagDescription') }),
        // flag with a value (-a, --all)
        all: flags.string({ char: 'a', description: messages.getMessage('share-allFlagDescription') }),
    };

    // Comment this out if your command does not require an org username
    protected static requiresUsername = true;

    // Comment this out if your command does not support a hub org username
    protected static supportsDevhubUsername = false;

    // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
    protected static requiresProject = false;

    public async run(): Promise<AnyJson> {

        //const results = await AuthInfo.getAuthorizationUrl(options);
        const conn = await  this.org.getConnection().getConnectionOptions();
        const frontDoorUrl = `${conn.instanceUrl}secur/frontdoor.jsp?sid=${conn.accessToken}`;

        this.ux.log(`This URL is live please share with Caution: ${frontDoorUrl}`); 

        // Return an object to be displayed with --json
        return { };
    }
}
