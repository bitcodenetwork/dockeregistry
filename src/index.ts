import { RegistryCatalog, RegistryManifest, RegistryTagResponse } from "./types";
import { ConnectOptions, Utils } from "./utils";

class Registry {
  constructor({ hostname, port }: RegistryConstructor) {
    this.hostname = hostname ?? "localhost";
    this.port = port ?? 5001;

    // Get the hostname from the environment
    if (process.env.REGISTRY_HOSTNAME) {
      this.hostname = process.env.REGISTRY_HOSTNAME;
    }

    // Get the port from the environment
    if (process.env.REGISTRY_PORT) {
      this.port = Number(process.env.REGISTRY_PORT);
    }
  }

  private readonly version: string = "v2";
  private readonly hostname: string;
  private readonly port: number;

  private createRequestOption(param: CreateRequestOption): ConnectOptions {
    return {
      method: param.method,
      hostname: this.hostname,
      port: this.port,
      path: `/${this.version}/${param.path}`,
      headers: param.headers ?? {},
      query: param.query ?? {},
      body: param.body ?? {}
    }
  }

  public async ping(): Promise<void> {
    const options: ConnectOptions = this.createRequestOption({
      method: "GET",
      path: "",
    });

    return await Utils.connect(options);
  }

  public async tag(repository: string, query?: { n: number, last: number }): Promise<RegistryTagResponse> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'GET',
      path: `${repository}/tags/list`,
      query: query
    });

    return await Utils.connect(options);
  }

  public async manifest(repository: string, reference: string): Promise<RegistryManifest> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'GET',
      path: `${repository}/manifest/${reference}`,
    });

    return await Utils.connect(options);
  }

  public async manifestUpdate(repository: string, reference: string, body: RegistryManifest): Promise<void> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'PUT',
      path: `${repository}/manifest/${reference}`,
      body: body
    });

    return await Utils.connect(options);
  }

  public async manifestDelete(repository: string, tag: string): Promise<any> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'DELETE',
      path: `${repository}/manifests/${tag}`,
    });

    return await Utils.connect(options);
  }

  public async catalog(query?: { n: number, last: number }): Promise<RegistryCatalog> {
    const options: ConnectOptions = this.createRequestOption({
      method: 'GET',
      path: '_catalog',
      query: query
    });

    return await Utils.connect(options);
  }
}

export default Registry;

type RegistryConstructor = {
  hostname?: string;
  port?: number;
}

type CreateRequestOption = {
  method: "GET" | 'PUT' | "POST" | "DELETE" | "HEAD";
  path: string;
  headers?: any;
  query?: any;
  body?: any;
}