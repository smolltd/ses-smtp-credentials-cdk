# ses-smtp-credentials-cdk

Forked from isotoma/ses-smtp-credentials-cdk

Generate AWS SES SMTP credentials for sending mail via SES.

## What

On the 10th January 2019 AWS changed how SES SMTP authentication works to restrict
access on a per-region basis. This makes providing SES credentials annoyingly hard, if you are automating everything via Cloudformation.

This addresses that.

## Usage

```typescript
import { SesSmtpCredentials } from 'ses-smtp-credentials-cdk';

// ...

const smtpCredentials = new SesSmtpCredentials(this, 'Credentials', {
    region: 'eu-west-1'
});
```

## Implementation

1. A user is created in IAM with only permissions for ses:SendRawEmail.
2. The user is given an access key.
3. The secret key is signed for the desired region (see below)
4. the access key and signed secret key are set in a secret

## Signature algorithm

The algorithm for signing the key is as specified here:

https://docs.aws.amazon.com/ses/latest/DeveloperGuide/smtp-credentials.html
## Development

### Releasing a new version

Run
```
$ npm version (patch|minor|major)
$ git push origin master [tag you just created]
```
