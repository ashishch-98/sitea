# Sitecore Headless SXA Next.js Application

## 🛠️ Prerequisites

Before getting started, ensure the following are installed:

- Node.js LTS version `v22.17.1`
- Sitecore XP 10.4 with SXA and has following packages installed:
  * [Sitecore Headless Services](https://developers.sitecore.com/downloads/Sitecore_Headless_Rendering) 22.x
  * [Sitecore Management Services](https://doc.sitecore.com/xp/en/developers/100/developer-tools/sitecore-management-services.html) (installed via package on CM)

## 📁 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ashishch-98/sitea.git
cd sitea
```

or you can unzip the folder from the attachments.

### 2. Install Dependencies

```
npm install -g @sitecore-jss/sitecore-jss-cli

dotnet new tool-manifest

dotnet tool install Sitecore.CLI --add-source https://sitecore.myget.org/F/sc-packages/api/v3/index.json
```

### 3. Configure Environment

1. Create a copy of `.env` and rename it to `.env.local`
2. Update the values as shown below:

   PUBLIC_URL= //your frontend host ex:- http://localhost:3000

   JSS_EDITING_SECRET=your-32-character-guid

   SITECORE_API_KEY=your-api-key //you can get it from /sitecore/system/Settings/Services/API Keys

   SITECORE_API_HOST=your-sitecore-host //make sure to not have a / at the end of URL

   SITECORE_ID_HOST=your-sitecore-host-id-server // ex - https://localsitecoreidentityserver.dev.local

   NODE_TLS_REJECT_UNAUTHORIZED=0

### 4. Update Sitecore Configs

1. Remove .example from the file /sitecore/config/foodly.deploysecret.config.example and add a guid to `deploymentSecret`.
2. Edit sitecore/config/foodly.config and update the following:
   Set `JavaScriptServices.ViewEngine.Http.JssEditingSecret` to match your .env.local value.
3. Update the SMTP entries for ``zzz.CustomSMTP.config.example`` and remove ``.example `` from the file name.

  Verify your FE endpoint is same as added here and update the same for sitecore rendering host
  `serverSideRenderingEngineEndpointUrl`
  `serverSideRenderingEngineApplicationUrl`.

### Run Initial Setup & Start:

In your project terminal run ``npm run init`` this will install the dependencies and run setup for sitecore items using sitecore serialization.

If the above command fails you can run the steps manually in the following order:

```
jss deploy config        #Deploys sitecore configs to your AppConfig folder

npm install              #Installs dependencies

npm run sc:login         #Authenticates the terminal to perform serialization

npm run sc:push          #Pushes Sitecore items from local repo to CM

npm run start:connected  # Starts Next.js in connected mode
```

## ⚠️ Troubleshooting (Common Issues)

* **500/400 error on form submission:** make sure all the configs in /sitecore/config are deployed to the /App_Config\Include\zzz
* **Serialization errors:** Confirm Sitecore CLI login (`dotnet sitecore login`) and Management Services are installed.
