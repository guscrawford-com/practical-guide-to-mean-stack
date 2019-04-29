# Get Ready to be MEAN

Being a *MEAN*-stack developer means being knowledgable in areas of **MongoDB**, **Express**, **Angular**, and **Node.js**.

Because MEAN-stackers co-exist in likely one of the most cross-platform ecosystems; the range of tools and options you have for acocmplishing your tasks greatly vary.  This guide is aimed to share some opinions and guid you through setting up a MEAN developer's environment on **Windows**, using **Command-Prompt** as the favorite *ternimal-interface*; but the same guide could be broadly followed for someone using *bash* on a Mac or Linux.

[Install Dev-tools](#Install-Dev-tools) | [Install the Stack](#Install-the-Stack) | 

----

## Install Dev-tools

[Install VSCode](#Install-VSCode) | [Install Git](#Install-Git)

### Install Git

Git is a *workspace version* manager pretty ubiquitously used throughout the MEAN-stack.  It's most fundamental interface is *command-line* but even if you wish to use a *graphic* Git *client* ([Git provides](https://git-scm.com/downloads/guis) a catalog of tools including [GitKracken](https://www.gitkraken.com/) which has a super clever name and is the author's recommendation) it would require the fundamental Git binaries.

Download the installer at the link below:

* We recommend selecting ***use Git from Windows Command Prompt***

[📦 Git for Windows](https://git-scm.com/download/win)

### Install VSCode 
In the MEAN world; and following in the *linux* tradition you can *really* use whatever text-editor/IDE you work fastest in.

Having said that; **Microsoft's (open-source) VS Code** is *incredibly* popular, flexible, and well-tooled out of the box for Node.js application development.

A couple of things it brings to your fingertips:

1. Keyboard-shortcut access to a *terminal*
2. Code-autocomplete driven by `require(...)` look-ups and on-the-fly script-interpretation and linting
3. A deep eco-system of extensions and tooling for different programming languages and platforms. 

A couple of other worthy alternatives:

1. [Atom](https://atom.io/) - **VS Code** is actually forked from this project started by *GitHub*.  VS Code improves usability and brings a tighter more professional feel in the author's opinion; but Atom is similarly flexible, fast to use, and a clean way to work.
2. [Brackets](http://brackets.io) - a clean and popular language-agnostic open-source IDE from **Adobe**

## Install the Stack

[Install NVM & Node.js](#Install-NVM--Nodejs) | [Install Key Global Node.js Packages](#Install-Key-Global-Nodejs-Packages)

### Install NVM & Node.js

As the complexity of problems and solutions you provide builds overtime; you'll likely need to manage Node.js version transitions or be able to test a Node.js application running on a specific version of Node.js.

It's recommended to install NVM first *and use it to [install Node.js](#Install-Nodejs-with-NVM)*, but you can skip that and [install Node.js directly](Install-Node.js) if you wish.

#### Install NVM

[NVM](https://github.com/nvm-sh/nvm) is an application that manages Node.js installations on your computer.  It's recommended to install the latest version of this [Windows port of NVM](https://github.com/coreybutler/nvm-windows/releases).

[📦 nvm-setup.zip (1.1.7)](https://github.com/coreybutler/nvm-windows/releases/download/1.1.7/nvm-setup.zip)

#### Install Node.js with NVM

With the NVM you have a lot of flexibility in targeting specific Node.js versions natively without using Docker or some other kind of container platform.

Open your **command-prompt** and type:

```
nvm install 10.15.3
nvm use 10.15.3
```

*if you got an error like:* `'nvm' is not recognized as an internal or external command,
operable program or batch file.` close and re-launch your *command-prompt*.

You can always check your version of Node.js by running this command in your terminal:

```
node -v
```

#### Install Node.js

If you wish you can install a specific version of Node.js standalone from their website.  It's reccomended to do work targeting *"LTS"* or *Long-term Support* [releases](https://nodesource.com/blog/understanding-how-node-js-release-lines-work/) as you have higher confidence of security patches and improvements that don't break your applications for a longer period of time.

Node.js is an application of Google's open-source v8 JavaScript engine and as such there are always public releases available from [https://nodejs.org](https://nodejs.org/en/)

**LTS** releases have *even numbered major releases*; while the *"edge"* or latest version will have an *ood numbered major release*.

[📦 Current Node.js LTS (10.15.3)](https://nodejs.org/dist/v10.15.3/node-v10.15.3-x64.msi)

[📦 Current Latest Node.js (and *future* LTS) (12.0.0)](https://nodejs.org/dist/v12.0.0/node-v12.0.0-x64.msi)

### Install Key Global Node.js Packages

These recommended installations are **global installations** of Node.js packages commonly used from the *command-line*.

#### Express Generator

[Express](https://expressjs.com/en/starter/generator.html) is an important framework (the **E** in MEAN) for developing back-end APIs or static MVC html applications on Node.js.


```
npm install express-generator -g
```

The **Express Generator** is a command-line tool you can use to *scaffold* a new *express-application*.

```
express new-app
```

#### Angular Command Line Interface

[Angular](https://angular.io/) is an important framework (the **A** in MEAN) for developing front-end *single-page-applications (SPA's)*.

```
npm install @angular/cli -g 
```

The **Angular Command Line** is a tool you can use to scaffold and extend an *Angular application*.

```
ng new ui-project
ng generate component dashboard
```

----

## Further Consideration

### Typescript

### PM2

### Docker