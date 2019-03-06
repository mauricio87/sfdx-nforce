/*
    Credit: Wade Wegner had a sample code that we modified a bit, Thanks
*/
export async function generateConsumerSecret(): Promise<String> {
    let secret = 'nforce-';
    const allchars = 'ABCDEFGIJKLMNOPQRSTUVWXYZ0123456789';

    for(let i=0; i< 24; i++)
    {
        secret += allchars.charAt(Math.floor(Math.random() * allchars.length ));
    }

    return secret; 

}