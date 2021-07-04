+++
title = "OCF Kubernetes Cluster"
date = 2020-10-30
description = "cutting-edge Kubernetes deployment with git-ops and our own Python 3 infrastructure as code setup"

[extra]
links = [["Source Code", "https://github.com/ocf/kubernetes"]]
technologies = ["Python", "Kubernetes"]
media = "/images/projects/argocd.png"
media_alt = "ArgoCD Kubernetes Dashboard"
media_type = "image"
+++

[~fydai](https://fyd.ai) and I are upgrading the Puppet / Debian / VM based infrastructure at the [Berkeley Open Computing Facility](https://ocf.berkeley.edu/) to [Kubernetes](https://k8s.io)! After evaluating hundreds of "cloud-native" technologies, we finally settled on a tech stack that has been simple and low-maintainance. A cluster operator keeps track of how the representation in Git is different from the real cluster, and periodically converges the two.
