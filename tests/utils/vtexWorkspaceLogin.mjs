import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export const vtexWorkspaceLogin = () => {
    return execPromise(`vtex local token`);
};
