import * as cfn from 'aws-cdk-lib/aws-cloudformation';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import * as customResource from 'aws-cdk-lib/custom-resources';
import * as path from 'path';
import { Construct } from 'constructs';
import { SesSmtpCredentialsProps } from './common';

export { SesSmtpCredentialsProps };

export class SesSmtpCredentialsProvider extends Construct {
    public readonly provider: customResource.Provider;

    public static getOrCreate(scope: Construct): customResource.Provider {
        const stack = cdk.Stack.of(scope);
        const id = 'com.isotoma.cdk.custom-resources.ses-smtp-credentials';
        const x = (stack.node.tryFindChild(id) as SesSmtpCredentialsProvider) || new SesSmtpCredentialsProvider(stack, id);
        return x.provider;
    }
    
    constructor(scope: Construct, id: string) {
        super(scope, id);
        this.provider = new customResource.Provider(this, 'ses-smtp-credentials-provider', {
            onEventHandler: new lambdaNodejs.NodejsFunction(this, 'ses-smtp-credentials-event', {
                entry: path.join(__dirname, 'provider', 'main.ts'),
                projectRoot: path.join(__dirname, 'provider'),
                depsLockFilePath: path.join(__dirname, 'provider', 'package-lock.json'),
                runtime: lambda.Runtime.NODEJS_12_X,
                // To handle parcel-based versions of NodejsFunction
                nodeModules: [
                    'utf8',
                    'aws-sdk',
                ],
                // To handle esbuild-based versions of NodejsFunction
                bundling: {
                    externalModules: [
                        'utf8',
                        'aws-sdk',
                    ],
                },
                handler: 'onEvent',
                timeout: cdk.Duration.minutes(5),
                initialPolicy: [
                    new iam.PolicyStatement({
                        resources: ['*'],
                        actions: [
                            'iam:CreateUser',
                            'iam:PutUserPolicy',
                            'iam:CreateAccessKey',
                            'iam:DeleteUser',
                            'iam:DeleteUserPolicy',
                            'iam:DeleteAccessKey'
                        ],
                    }),
                ],
            } as lambdaNodejs.NodejsFunctionProps),
        });
    }
}

export class SesSmtpCredentials extends Construct {
    public readonly region: string;
    private resource: cdk.CustomResource;

    constructor(scope: Construct, id: string, props: SesSmtpCredentialsProps) {
        super(scope, id);
        if (!props.region) {
            throw new Error('No region specified');
        }
        this.region = props.region;
        const provider = SesSmtpCredentialsProvider.getOrCreate(this);
        this.resource = new cdk.CustomResource(this, 'Resource', {
            serviceToken: provider.serviceToken,
            resourceType: 'Custom::SesSmtpCredentials',
            properties: {
                Region: this.region
            }
        });
    }

    public username(): string {
        return this.resource.getAttString('Username')
    }
    
    public password(): string {
        return this.resource.getAttString('Password')
    }
}
