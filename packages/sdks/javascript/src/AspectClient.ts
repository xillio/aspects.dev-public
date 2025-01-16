import { AspectLogger } from "./AspectLogger";

type ServerApi = {
    version: string;
}
type Auth = {
    username: string;
    password: string;
}
type TLS = {
    /** Enables or disables TLS/SSL for the connection. */
    tls?: boolean;
    /** A boolean to enable or disables TLS/SSL for the connection. (The ssl option is equivalent to the tls option.) */
    ssl?: boolean;
    /** Specifies the location of a local .pem file that contains either the client's TLS/SSL certificate and key. */
    tlsCertificateKeyFile?: string;
    /** Specifies the password to de-crypt the tlsCertificateKeyFile. */
    tlsCertificateKeyFilePassword?: string;
    /** Specifies the location of a local .pem file that contains the root certificate chain from the Certificate Authority. This file is used to validate the certificate presented by the mongod/mongos instance. */
    tlsCAFile?: string;
    /** Specifies the location of a local CRL .pem file that contains the client revokation list. */
    tlsCRLFile?: string;
    /** Bypasses validation of the certificates presented by the mongod/mongos instance */
    tlsAllowInvalidCertificates?: boolean;
    /** Disables hostname validation of the certificate presented by the mongod/mongos instance. */
    tlsAllowInvalidHostnames?: boolean;
    /** Disables various certificate validations. */
    tlsInsecure?: boolean;
}

type AspectClientOptions = TLS & Partial<Auth> & Partial<ServerApi> & {
    applicationName?: string;
}

export interface AsyncDisposable {
    /**
     * @beta
     * @experimental
     */
    [Symbol.asyncDispose](): Promise<void>;

    /**
     * @internal
     *
     * A method that wraps disposal semantics for a given resource in the class.
     */
    asyncDispose(): Promise<void>;
}

export class AspectClient implements AsyncDisposable {
    private readonly logger: AspectLogger | undefined;

    constructor(
        private readonly connectionString: string,
        private readonly options?: AspectClientOptions
    ) { }

    public async connect() {
        this.logger?.debug(`Connecting to ${this.connectionString}`);
    }
    public async close() {
        this.logger?.debug(`Closing connection to ${this.connectionString}`);
    }

    declare [Symbol.asyncDispose]: () => Promise<void>;
    /** @internal */
    async asyncDispose() {
        await this.close();
    }
}
