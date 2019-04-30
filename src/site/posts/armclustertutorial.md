---
title: "ARM Clusters + Selfhosting: A Perfect Match"
date: 2019-04-27
---

In this article, I'll go over the pros and cons of a single x86_64 server vs an ARM Cluster, as well as show you how you can set up your own ARM Cluster with Docker Swarm, GlusterFS, and Ansible with a focus on achieving a balance between laziness, user friendliness, and power.

If you listen to the advice of certain selfhosting communities, the best way to go about hosting your services is to head over to eBay and buy a used Poweredge R710. They're not *necessarily* wrong either. You can pick up a 12 Core @ 2.8GHz, 72 GB RAM, 2TB HDD beast of a server for about $200 (USD) after shipping.

With a modular ARM cluster (like what we'll be building in this article), you would have a zero to low-noise, low energy consumption, low power, fully modular cluster that is up to most tasks that the x64 server could do. If I need more computing power or storage space, I can just plug in another board and all my services will automatically be rebalanced through the new cluster.

For me, the benefits for ARM outweigh the benefits of x64 and the cons of ARM, making it the obvious choice. Here are a few things you may want to consider when choosing one...

| x64 PRO                    | x64 CON            | ARM PRO                | ARM CON                |
|----------------------------|--------------------|------------------------|------------------------|
| Fast                       | Runs hot           | Fully Modular          | Slower                 |
| Excellent Software Support | Electricity costs* | Runs Cool + Quiet      | Higher initial cost    |
| More Popular               | Noisy              | Low Power Consumption  | Worse software support |
|                            | Large              | Small                  | Less popular           |

\* An *idling* R710 would cost me 460 USD/yr to run. My cluster at *full load* costs about ​20 USD/yr.

Okay, lets get into building an ARM cluster.


## Hardware Choices

(I'm not going to link to vendors, but a full parts list is at the end of this section.)

### SBC

I went with the Odroid N2 as the main compute board for my cluster. They're the fastest SBC that Odroid have ever made, and they run completely silent. Of course, they're in high demand right now (or at least have low supply), so it might be easier to get your hands on a different SBC. It also might be cheaper, since the XU4 for example is about half as fast but also less than half the price.

The neat thing about clusters is that they are completely modular. If you need storage in your cluster, you can add in an SBC that deals with storage. For example, if I needed more storage space I would get an Odroid HC2 and drop a hard drive in it.

You can mix and match as many decently fast SBCs to get exactly the right set of features you need. A word of warning though: stay away from the Raspberry Pi! The Pi 3 is sort of fast, but you can do much better for $35. The Pi is an excellent project that made SBCs mainstream (my first one was a Pi 1) and it's definitely worth supporting, but if you try to run more than one thing on one, you're not going to have a good time.

### Power

Some people opt to buy a single 12V power supply to power their entire cluster. I didn't want to work with wires so I just bought the cheapest UL-Listed 12V@4A power supplies I could find. One for each board.

### Networking

Any gigabit switch should be fine. I found one lying around and repurposed it. Any cables that are Cat 5e or better should also be fine.

### Parts List

- To
- Do

## Software Choices

### Docker (Swarm Mode)

A lot of people don't like docker because "why run VMs for everything when you can just run things bare metal." This is a completely justified way of thinking if you're willing to set up and configure every piece of software on your own.

Remember though, we want to be lazy. Docker means we can copy-paste other people's services, and if they don't work then we can just find a new config to copy-paste. Sometimes projects will even have official docker images! This may not be the "purest" way of setting up a server, but it is *by far* the easiest.

Issues with this method include...
- Security (who made the image?)
- Ease of Debugging (somewhat circumvented by just deleting it and 
restarting)
- If a docker image doesn't already exist you need to make one. This
is generally rare.

### GlusterFS

Docker Swarm will automatically pick which server to run a service on. Unfortunately, it doesn't sync persistent data across servers (which means your services won't actually work). With GlusterFS, any server can access the data on the gluster mount.

It has a few different modes, but the one I use is duplication (every board keeps a copy of all the data). If I had more than two boards I would keep duplication at 2x, so I get the benefit of redundancy while also getting more storage space.

### Portainer

It manages Docker Swarm through a Web interface and makes pretty visualizations. You could do without this but deploying new apps from a GUI is pretty cool.

### Traefik

It automatically manages subdomains for you based on docker container labels, grabs wildcard certificates from LE, and is fast.

## Software Setup

Most SBCs come with Ubuntu and a preconfigured user. To avoid getting confused as to which board is which, you'll need to do a bit of one-at-a-time setup.

After SSHing in with the default login and switching to root...

```bash
# Change hostname
echo MY_HOSTNAME > /etc/hostname
hostname MY_HOSTNAME

# Add user
adduser MY_USER # INTERACTIVE
usermod -aG sudo MY_USER

# Disable Xorg
sudo systemctl set-default multi-user.target

# Update
apt update
apt full-upgrade
reboot
```

Odroid boards have weird locale errors when you login. If you see one and live in the US (en_US) then you can fix it by...

```bash
# Locale Setup

locale-gen en_US.UTF-8
dpkg-reconfigure locales
dpkg-reconfigure keyboard-configuration
localedef -i en_US -c -f UTF-8 en_US.UTF-8
reboot
```

### GlusterFS

I followed someone elses guide to do this, so you can have a link.

TODO

```bash
# you might need to sudo mkdir -p /bricks/brick1/.glusterfs/indices
# if gluster volume status is bad
```

### Docker Swarm 

```bash
# install docker
apt install curl
curl -fsSL get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker njha

# The following runs on ONE node...
# docker swarm init
# docker swarm join-token manager

# Run the command it gives you on the other nodes.
```

### Deploy Portainer

```bash
# Install Portainer
mkdir -p /mnt/g1/stacks
cd /mnt/g1/stacks
curl -L https://downloads.portainer.io/portainer-agent-stack.yml -o portainer-agent-stack.yml
mkdir -p /mnt/g1/portainer

# remove the docker volume and replace it with /mnt/g1/portainer
vi portainer-agent-stack.yml

# deploy to cluster
docker stack deploy --compose-file=portainer-agent-stack.yml portainer
```

