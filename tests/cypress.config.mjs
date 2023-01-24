import "dotenv/config";
import { defineConfig } from "cypress";
import { getCurrentVtexEnvironment } from "./utils/getCurrentVtexEnvironment.mjs";
import { vtexWorkspaceLogin } from "./utils/vtexWorkspaceLogin.mjs";

const { workspace, accountName, userEmail } = await getCurrentVtexEnvironment();
const workspaceUrl = `https://${workspace}--${accountName}.myvtex.com`;
const token = await vtexWorkspaceLogin();

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        env: {
            authToken: token.stdout.trim(),
        },
        baseUrl: workspaceUrl,
        // pluginsFile: "cypress/plugins/index.js",
        supportFile: "cypress/support/e2e.js",
    },

    viewportWidth: 1920,
    viewportHeight: 1080,
});
