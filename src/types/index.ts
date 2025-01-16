export type RegistryCatalog = {
  repositories: string[];
}

export type RegistryTagResponse = {
  name: string;
  tags: string[];
};

export type RegistryManifest = {
  name: string;
  tag: string;
  fsLayers: {
    [key: string]: string;
  }[],
  history: string;
  signature: string;
}