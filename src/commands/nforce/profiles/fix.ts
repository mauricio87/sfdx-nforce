import { core, flags, SfdxCommand } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import profileHelper = require('../../../shared/profileTools'); 

// Initialize Messages with the current plugin directory
core.Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = core.Messages.loadMessages('sfdx-nforce', 'profiles');

export default class Fix extends SfdxCommand {

    public static description = messages.getMessage('fix-commandDescription');

    public static examples = [
        `$ sfdx nforce:profiles:fix`,
        `$ sfdx nforce:profiles:fix -n SystemProfile`
    ];

    //public static args = [{ name: 'file' }];

    protected static flagsConfig = {
        // flag with a value (-n, --name=VALUE)
        name: flags.string({ char: 'n', description: messages.getMessage('fix-nameFlagDescription') })
    };

    // Comment this out if your command does not require an org username
    protected static requiresUsername = true;

    // Comment this out if your command does not support a hub org username
    protected static supportsDevhubUsername = false;

    // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
    protected static requiresProject = false;

    public async run(): Promise<AnyJson> {
        
        // query for the profiles
        let profiles = await profileHelper.getProfiles(this.org, this.flags.name);

        this.ux.log(`We found ${profiles.length} profiles.`);
        this.ux.log(`Starting to clean profiles.`);

        await profileHelper.cleanProfiles(this.org, this.ux, profiles);

        // Return an object to be displayed with --json
        return { };
    }
}
