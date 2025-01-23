# DockeRegistrySDK

Connect to your own Docker Registry

---

This package is a tool to connect with the [container registry distribution](https://hub.docker.com/_/registry).

## Get Started

If your container registry is public, you can use this library directly. If your container registry is authentication protected, the first thing to check is to make sure your Docker Engine has successfully logged into your container registry. If you have not logged in, you can do so by using the following command:

``` powershell
$ docker login <registry_hostname>  
```

For more information, you can visit the page about [docker login](https://docs.docker.com/reference/cli/docker/login/).

### Ping

Checking connectivity with docker container registry.

`registry.ping()`

**Example**

``` ts
import Registry from "@repoxcode/docker-registry";

const registry = Registry({ hostname: "localhost", port: 5001 });

const isConnected = await registry.ping();
```

### Catalog

Get a list of catalogs in the container registry.

`registry.catalog({ n, last })`

- **optional** n: the amount of data you want to retrieve.
- **optional** last: the beginning of the data sequence you want to retrieve

**Example**

``` ts
import Registry from "@repoxcode/docker-registry";

const registry = Registry({ hostname: "localhost", port: 5001 });

const catalog = await registry.catalog();
```

### Tag

Get a list of tags on a container, inside the container registry.

`registry.tag(name, { n, last })`

- name: container name.
- **optional** n: the amount of data you want to retrieve.
- **optional** last: the beginning of the data sequence you want to retrieve

**Example**

``` ts
import Registry from "@repoxcode/docker-registry";

const registry = Registry({ hostname: "localhost", port: 5001 });

const catalog = await registry.tag();
```

### Manifest

Retrieving details from the data catalog inside the docker container registry.

`registry.manifest(name, reference)`

- name: container name.
- reference: container reference, you can use container tag.

**Example**

``` ts
import Registry from "@repoxcode/docker-registry";

const registry = Registry({ hostname: "localhost", port: 5001 });

const catalog = await registry.manifest("nginx", "latest");
```

### Update Manifest

Retrieving details from the data catalog inside the docker container registry.

`registry.manifest(name, reference, body)`

- name: container name.
- reference: container reference, you can use container tag.
- body: the data you want to update.

**Example**

``` ts
import Registry from "@repoxcode/docker-registry";

const registry = Registry({ hostname: "localhost", port: 5001 });

const body = {
  name: "nginx-test",
}

const catalog = await registry.manifestUpdate("nginx", "latest", body);
```

### Delete Manifest

Remove catalog from docker container registry.

`registry.manifest(name, reference)`

- name: container name.
- reference: container reference, you can use container tag.

**Example**

``` ts
import Registry from "@repoxcode/docker-registry";

const registry = Registry({ hostname: "localhost", port: 5001 });

const body = {
  name: "nginx-test",
}

const catalog = await registry.manifestDelete("nginx", "latest");
```