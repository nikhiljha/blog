+++
title = "Mycelium Operator"
date = 2021-01-07
description = "a Kubernetes operator to deploy and manage Minecraft servers at scale (no stable release yet, but if you want details or a demo feel free to contact me)"
template = "post.html"

[extra]
# [["Source Code", "https://github.com/ocf/kubernetes"]]
technologies = ["Rust", "Kubernetes"]
+++

## Installation

```bash
helm repo add njha https://charts.njha.dev/
kubectl create ns mycelium
helm install -n mycelium njha/mycelium
```

## Architecture

Mycelium uses two CustomResourceDefinitions (CRDs) to represent parts of a Minecraft deployment. The first is a `MinecraftSet`: a collection of almost-identical Minecraft servers (e.x. `bedwars-0`, `bedwars-1`, ..., `bedwars-n`). The second is a `MinecraftProxy`: a collection of identical proxy servers.

The `MinecraftProxy` object requires a selector to determine which `MinecraftSet`s to point to. This can change dynamically after the proxy has been created without a proxy or server restart required. All changes to Mycelium CRDs are eventually consistent (target < 30 seconds).

Combined with rollout tools, this allows for highly available proxies that, when a restart is required (by one of your plugins, Mycelium never requires restarts), will (a) spin up a new proxy with the modified configuration (b) disallow players from joining old proxies (c) when the old proxies eventually have 0 players, shut them down.

## Examples

```yaml
apiVersion: mycelium.njha.dev/v1alpha1
kind: MinecraftSet
metadata:
  name: survival
  labels:
    mycelium.njha.dev/proxy: global
    mycelium.njha.dev/env: production
spec:
  # how many servers to make with the same configs
  replicas: 1
  # currently only paper is supported, so this field is optional
  type: paper
  # names of configmaps in the current namespace...
  # configmaps are (filepath_from_server_root: file content) pairs
  # if file content is a non-str object, it will be rendered as YAML
  config:
    - name: "base-cfg"
      path: "/"
    - name: "towny-cfg"
      path: "/plugins/towny"
  # URLs of plugins to fetch, also accepts .zip, .tar.zst
  plugins:
    - "https://ci.njha.dev/plugin1/latest.jar"
    - "https://ci.njha.dev/plugin2/latest.jar"
    - "https://ci.njha.dev/plugin3/2021-01-01-#1.jar"
  proxy:
    # terra template for the hostname, n = sequential replica number (optional)
    hostname: "survival-{{ n }}.example.com"
```

```yaml
# A set of identical Minecraft server proxies.
apiVersion: mycelium.njha.dev/v1alpha1
kind: MinecraftProxy
metadata:
  name: global
spec:
  # how many identical proxies to make
  replicas: 1
  # currently only velocity is supported, so this field is optional
  type: velocity
  # names of configmaps in the current namespace...
  # configmaps are filepath_from_server_root:file content
  # if file content is a non-str object, it will be converted to YAML
  config:
    - name: "proxy-cfg"
      path: "/"
  # URLs of plugins to fetch, also accepts .zip, .tar.zst
  plugins:
    - "https://ci.njha.dev/plugin4/latest.jar"
    - "https://ci.njha.dev/plugin5/latest.jar"
    - "https://ci.njha.dev/plugin6/2021-01-01-#1.jar"
  # works like the selector in Job, Deployment, ReplicaSet, and DaemonSet
  # aka it ANDs together all the labels and expressions
  selector:
    matchLabels:
      mycelium.njha.dev/proxy: global
    matchExpressions:
      - { key: mycelium.njha.dev/env, operator: In, values: [production] }
```
