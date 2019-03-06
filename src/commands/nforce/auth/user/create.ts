import { core, flags, SfdxCommand } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import child_process = require('child_process');
import util = require('util');

const exec = util.promisify(child_process.exec);

// Initialize Messages with the current plugin directory
core.Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = core.Messages.loadMessages('sfdx-nforce', 'user');

export default class AppCreate extends SfdxCommand {

    public static description = messages.getMessage('user-create-description');

    public static examples = [
        
    ];

    protected static flagsConfig = {
        // flag with a value (-f, --definitionfile=VALUE)
        definitionfile: flags.string({ char: 'f', description: messages.getMessage('user-create-definitionFile-flag') }),

        // flag with a value (-n, --appname=VALUE)
        appname: flags.string({ char: 'n', description: messages.getMessage('user-create-appname-flag') }),
        
        newapp: flags.boolean({ char: 'c', description: messages.getMessage('user-create-app-flag') }),
        // flag with a value (-c, --authenticate=TRUE/FALSE)
        auth: flags.boolean({ char: 'a', description: messages.getMessage('user-create-auth-flag') })
    };

    protected static requiresUsername = true;

    public async run(): Promise<AnyJson> {

        // Create user
        let comd = 'sfdx force:user:create ';

        if (this.flags.definitionfile)
        {
            comd += `-f ${this.flags.definitionfile}`
        }

        comd += `-u ${this.org.getConnection().getUsername()}`;

        const result = await exec(comd);

        // Need to create app ?

        // Authenticate
        // let auth = `sfdx force:auth:jwt:grant`; 
        
        // --clientid 3MVG98RqVesxRgQ7NTz.TZYFJdgu2DPiHH30rx1lyKNdiZMRbmC99xuiDZmXdsbQDPPMV9M1mDfVDv901v7UG--
        // jwtkeyfile JWT / Qa / server.key
        // --username mauricio.ardila@amazon.com.wfs.qa
        // --setalias ACCSQA
        // --instanceurl https://test.salesforce.com 


        console.log(result);
        return;
        
    }
}