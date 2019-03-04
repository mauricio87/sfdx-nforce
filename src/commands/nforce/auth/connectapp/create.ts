import {core, flags, SfdxCommand} from '@salesforce/command';
import {AnyJson} from '@salesforce/ts-types';
import util = require('./../../../../shared/utils');
import { SaveResult } from 'jsforce';
import fs = require('fs-extra');
import forge = require('node-forge'); 
import certHelper = require('./../../../../shared/certs'); 

// Initialize Messages with the current plugin directory
core.Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = core.Messages.loadMessages('sfdx-nforce', 'auth');

export default class AppCreate extends SfdxCommand {

  public static description = messages.getMessage('auth-create-description');

  public static examples = [
  `$ sfdx nforce:auth:connectapp:create -n "Connected App Name"
  Creating app....
  App created, Id: {}`,
  
  `$ sfdx nforce:auth:connectapp:create -n "Connected App Name" -l "My label" -w -c "https://somethignelse.com", -s "Api,web"
  Creating app....
  App created, Id: {}`,
  ];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', required: true, description: messages.getMessage('auth-create-name-flag')}),
    
    // flag with a value (-l, --label=VALUE)
    label: flags.string({ char: 'l', description: messages.getMessage('auth-create-label-flag') }),

    // flag with a value (-w, --cert=TRUE/FALSE)
    cert: flags.boolean({ char: 'w', description: messages.getMessage('auth-create-cert-flag') }),

    // flag with a value (-c, --callbackurl=VALUE)
    calbackurl: flags.string({ char: 'c', description: messages.getMessage('auth-create-callbackurl-flag') }),

     // flag with a value (-d, --description=VALUE)
    description: flags.string({ char: 'd', description: messages.getMessage('auth-create-description-flag') }),
    
     // flag with a value (-s, --scopes=VALUE)
    scopes: flags.string({ char: 's', description: messages.getMessage('auth-create-scopes-flag')})
  };

  protected static requiresUsername = true;
  private static objectName = 'ConnectedApp';

  public async run(): Promise<AnyJson> {

    // init flags
    const appName = this.flags.name;
    const appLabel = this.flags.label || appName;
    const appUrl = this.flags.calbackurl || 'sfdx://success';
    const appDesc = this.flags.description || 'Auto Generated by nforce';

    //parse scopes
    let appScopes = this.flags.scopes;
    if (appScopes){
      appScopes = appScopes.split(",");
    }
    else{
      appScopes = ['Api', 'Web', 'Basic', 'RefreshToken'];
    }

    // create a secret
    let appSecret = await util.generateConsumerSecret();

    // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
    const conn = this.org.getConnection();
    let app;

    app = [
      {
        description: appDesc,
        fullName: appName,
        label: appLabel,
        oauthConfig: {
          callbackUrl: appUrl,
          consumerSecret: appSecret,
          scopes: appScopes
        },
        contactEmail: 'sample@sample.com'
      }
    ];

    // do we need a new cert ?
    if (this.flags.cert) {
      // get keys
      const keys = forge.pki.rsa.generateKeyPair(2048);
      const privateKey = forge.pki.privateKeyToPem(keys.privateKey);

      // sign cert
      const cert = await certHelper.generateCert(keys);

      const publicKey = forge.pki.certificateToPem(cert);

      const path = './certs/' + appName;
      // Create necesary folders
      fs.emptyDirSync(path);
      
      fs.writeFile(path + '/server.key', privateKey, (error) => {
        if (error) {
          throw new core.SfdxError('We were not able to save the cert');
        }
      });

      fs.writeFile(path + '/server.crt', publicKey, (error) => {
        if (error) {
          throw new core.SfdxError('We were not able to save the cert');
        }
      });

      app[0].oauthConfig.certificate = publicKey;

      fs.writeFile(path + '/app.json', JSON.stringify(app), (error) => {
        if (error) {
          throw new core.SfdxError('We were not able to save the app to the json file');
        }
      });
    }

    let connectedApp; 
    const createResult = <SaveResult> await conn.metadata.createSync(AppCreate.objectName, app);
    
    if (!createResult.success){
      throw new core.SfdxError(messages.getMessage('auth-create-error-message') + JSON.stringify(createResult));
    }
    else{
      connectedApp = await conn.metadata.readSync(AppCreate.objectName, appName);
      if (!connectedApp)
      {
        throw new core.SfdxError(messages.getMessage('auth-red-error-message'), JSON.stringify(connectedApp));
      }
      else{
        connectedApp.oauthConfig.consumerSecret = appSecret;
        this.ux.log(JSON.stringify(connectedApp));

        // Return an object to be displayed with --json
        return connectedApp;
      }
    }
  }
}