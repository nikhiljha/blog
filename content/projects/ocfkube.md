+++
title = "OCF Kubernetes Cluster"
date = 2020-10-30

[extra]
links = [["Source", "https://github.com/ocf/kubernetes"]]
media = "/images/projects/argocd.png"
media_alt = "ArgoCD Kubernetes Dashboard"
+++

[~fydai](https://fyd.ai) and I are upgrading the Puppet / Debian / VM based infrastructure at the [Berkeley Open Computing Facility](https://ocf.berkeley.edu/) to [Kubernetes](https://k8s.io)! After evaluating hundreds of "cloud-native" technologies, we finally settled on a tech stack that has been simple and low-maintainance. A cluster operator keeps track of how the representation in Git is different from the real cluster, and periodically converges the two.
