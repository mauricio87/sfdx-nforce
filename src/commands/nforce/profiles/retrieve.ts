import { core, flags, SfdxCommand } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import fs = require('fs-extra');
import path = require('path');
import child_process = require('child_process');
import util = require('util');
import profileHelper = require('../../../shared/profileTools'); 

const exec = util.promisify(child_process.exec);

// Initialize Messages with the current plugin directory
core.Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = core.Messages.loadMessages('sfdx-nforce', 'profiles');

export default class Retrieve extends SfdxCommand {

    public static description = messages.getMessage('retrieve-commandDescription');

    public static examples = [
        `$ sfdx nforce:profiles:retrieve`,
        `$ sfdx nforce:profiles:retrieve -n SystemProfile`
    ];

    protected static flagsConfig = {
        // flag with a value (-n, --name=VALUE)
        name: flags.string({ char: 'n', description: messages.getMessage('retrieve-nameFlagDescription') }),
        clean: flags.boolean({ char: 'c', description: messages.getMessage('retrieve-cleanFlagDescription') })
    };

    // Comment this out if your command does not require an org username
    protected static requiresUsername = true;

    // Comment this out if your command does not support a hub org username
    protected static supportsDevhubUsername = false;

    // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
    protected static requiresProject = false;

    public async run(): Promise<AnyJson> {
        
        // Do we need to clean profiles?
        if (this.flags.clean) {
            let profiles = await profileHelper.getProfiles(this.org, this.flags.name);

            await profileHelper.cleanProfiles(this.org, this.ux, profiles);
        }

        this.ux.startSpinner(`Retrieving profile(s).`);

        var baseDir = './.tmp/profiles'; 
        var convertDir = baseDir + '/convert';
        var sourceDir = baseDir + '/source';
        var sourceDirProfiles = sourceDir + '/unpackaged/profiles/';
        var cleanDir = baseDir + '/clean';
        var profileDir = cleanDir + '/profiles';
        var sourceProfileDir = './force-app/main/default/profiles/'


        //Create or empty temp folders
        fs.emptyDirSync(convertDir);
        fs.emptyDirSync(sourceDir);
        fs.emptyDirSync(profileDir);

        //run a convert so we can get a clean package.xml
        //const {stdout} = 
        await exec(`sfdx force:source:convert -d ${convertDir}`);

        // use package.xml from retrieve call
        await exec(`sfdx force:mdapi:retrieve -k ${convertDir}/package.xml -r ${sourceDir}`);

        // unzip source
        await exec(`unzip  ${sourceDir}/unpackaged.zip -d ${sourceDir}`);

        // move files
        fs.moveSync(sourceDirProfiles, profileDir, {overwrite: true});
        

        // rename files
        fs.readdirSync(profileDir).forEach(file => {

            this.ux.log(`Retrieving ${file}`);

            const filePath = path.join(profileDir,file);
            const newFileName = sourceProfileDir + file + '-meta.xml';

            fs.renameSync(filePath, newFileName);
        });

        fs.remove(baseDir);

        this.ux.stopSpinner();

        // Return an object to be displayed with --json
        return { };
    }
}
