+++
title = "Mycelium Operator"
date = 2021-01-07
description = "a Kubernetes operator to deploy and manage Minecraft servers at scale"
template = "post.html"

[extra]
links = [["Source Code", "https://github.com/nikhiljha/mycelium"]]
technologies = ["Rust", "Kubernetes", "Kotlin"]
+++

## Installation

```bash
helm repo add mycelium https://harbor.ocf.berkeley.edu/chartrepo/mycelium
kubectl create ns mycelium
helm install mycelium/mycelium -n mycelium
```

## Architecture

Mycelium uses two CustomResourceDefinitions (CRDs) to represent parts of a Minecraft deployment. The first is a `MinecraftSet`: a collection of almost-identical Minecraft servers (e.x. `bedwars-0`, `bedwars-1`, ..., `bedwars-n`). The second is a `MinecraftProxy`: a collection of identical proxy servers.

The `MinecraftProxy` object requires a selector to determine which `MinecraftSet`s to point to. This can change dynamically after the proxy has been created without a proxy or server restart required. All changes to Mycelium CRDs are eventually consistent (target < 30 seconds).

Combined with rollout tools, this allows for highly available proxies that, when a restart is required (by one of your plugins, Mycelium never requires restarts), will (a) spin up a new proxy with the modified configuration (b) disallow players from joining old proxies (c) when the old proxies eventually have 0 players, shut them down.

## Spec

## MinecraftSet

```yaml
kind: MinecraftSet
apiVersion: mycelium.njha.dev/v1beta1
metadata:
  name: example
  labels:
    mycelium.njha.dev/proxy: cluster
spec:
  replicas: 1
  runner: {} # see below
  container: {} # see below
  proxy:
    # set this to get a forced host
    hostname: mc.example.com
    # set this to add to the default try list, lower=closer, ties broken arbitrarily
    priority: 29
```

## MinecraftProxy

```yaml
kind: MinecraftProxy
apiVersion: mycelium.njha.dev/v1beta1
metadata:
  name: proxy
spec:
  replicas: 1
  # this is a standard selector CRD, but only matchLabels is supported as of v0.4.0
  selector:
    matchLabels:
      mycelium.njha.dev/proxy: cluster
  runner: {} # see below
  container: {} # see below
```

## Runner

Both `MinecraftSet` and `MinecraftProxy` have an identical `runner` field in the spec. Here's how to use it...

```yaml
  runner:
    # information for the papermc api about which jar to get
    jar:
      type: paper # must be "paper" for mcset, "velocity" for mcproxy as of mycelium v0.4.0
      version: 1.18.1 # depends on papermc api
      build: "114" # depends on papermc api
    # space separated options to pass to the JVM
    jvm: "-Xmx1G -Xms1G"
    # configmaps to mount inside the minecraft root
    config:
        # name of configmap to mount
      - name: "coolplugin-cfg"
        # location relative to the Minecraft root to mount the configmap
        path: "/plugins/coolplugin"
    # URLs of plugins to get
    plugins:
      - "https://example.com/coolplugin-v0.1.0.jar"
```

## Container

Both `MinecraftSet` and `MinecraftProxy` have an identical `container` field in the spec. Here's how to use it...

```yaml
  container:
    # standard pod resource requirements definition
    resources:
      requests:
        cpu: "2"
    # standard node label selector
    nodeSelector:
      cool: beans
    # standard PodSecurityContext
    securityContext:
      runAsUser: 1000
      runAsGroup: 2000
      fsGroup: 2000
    # standard VolumeClaimTemplate
    volumeClaimTemplate:
      metadata:
        name: root
      spec:
        accessModes: ["ReadWriteOnce"]
        storageClassName: openebs-zfspv
        resources:
          requests:
            storage: 64Gi
```
