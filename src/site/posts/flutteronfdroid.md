---
title: Publishing Your Flutter App on F-Droid
date: 2018-09-02T18:14:56+00:00
---
So you made a Flutter app, and it's open source. Normally the first thing you'd do is upload it to F-Droid - but at first glance, it looks like F-Droid doesn't support Flutter! Luckily the workaround is so easy it doesn't even feel like a workaround.

It's as easy as 1, 2, 3! (I've always wanted to say that, and yes I realize that I skipped a few numbers between 2 and 6.)

## Steps

1. If you have signing setup already, move the config for signing (inside your application build.gradle) into the actual signing config like so:

This step can be safely ignored if you still are using the null signing config.

```
    signingConfigs {
        release {
            def keystorePropertiesFile = rootProject.file("key.properties")
            def keystoreProperties = new Properties()

            if (!keystorePropertiesFile.exists()) return;

            keystoreProperties.load(new FileInputStream(keystorePropertiesFile))

            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }

```

2. Add a new `fdroid` product flavor like so:

```
    flavorDimensions "deploy"

    productFlavors {
        fdroid {
            dimension "deploy"
            signingConfig null
        }
    }

    android.applicationVariants.all { variant ->
        if (variant.flavorName == "fdroid") {
            variant.outputs.all { output ->
                output.outputFileName = "app-fdroid-release.apk"
            }
        }
    }
```

3. Use this in your build config in the fdroid data. Need a starter config? [See here.](https://gitlab.com/fdroid/fdroiddata/blob/master/metadata/org.deluge.trireme.txt) All you need to do is clone that repository, copy that config, edit the values, and submit a merge request AFTER TESTING it. For more information on that process, [look here.](https://f-droid.org/en/docs/Submitting_to_F-Droid_Quick_Start_Guide/)

```yaml
Builds:
  - versionName: changeme
    versionCode: changeme
    commit: your_git_tag
    output: build/app/outputs/apk/fdroid/release/app-fdroid-release.apk
    srclibs:
      # I usually use the dev version of flutter, but beta and removing the @ altogether works too.
      - flutter@dev
    prebuild: rm -fr ios # iOS folder has binaries sometimes
    build: |-
        export PATH=$$flutter$$/bin:$PATH && flutter build apk --flavor fdroid
```

## Full Examples

build.gradle: [Lobsters App](https://gitlab.com/nikhiljha/lobsters-app/blob/4326b69792c8575e5cbea7c0f2f7ff1b2c38d83d/android/app/build.gradle) and [Trireme](https://github.com/teal77/trireme/blob/master/android/app/build.gradle).

fdroid config: [Trireme](https://gitlab.com/fdroid/fdroiddata/blob/master/metadata/org.deluge.trireme.txt)
