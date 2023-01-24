import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

const getByVTEXCli = async () => {
    const { stdout: whoami } = await execPromise("vtex whoami");
    const removeANSIRegex =
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

    const splitedInto = whoami.replace(removeANSIRegex, "").split("into");
    const splitedAs = splitedInto[1].split("as");
    const splitedAt = splitedAs[1].split("at");
    const splitedWorkspace = splitedInto[1].split("workspace");

    const userEmail = splitedAt[0].trim();
    const workspace = splitedWorkspace[1].trim();
    const accountName = splitedAs[0].trim();

    return {
        userEmail,
        workspace,
        accountName,
    };
};

export const getCurrentVtexEnvironment = async () => {
    if (
        process.env.USER_EMAIL &&
        process.env.WORKSPACE &&
        process.env.ACCOUNT_NAME
    ) {
        return {
            userEmail: process.env.USER_EMAIL,
            workspace: process.env.WORKSPACE,
            accountName: process.env.ACCOUNT_NAME,
        };
    } else {
        return getByVTEXCli();
    }
};
