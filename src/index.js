import Inquirer from "inquirer";
import fs from "fs-extra";
import { logInfo, formatTargetDir, downloadTemplate } from "./utils.js";

logInfo("Start Creating Cli -------------------", "green");

const name = formatTargetDir(process.argv[2]);

if (!name) {
    logInfo("The project name cannot be empty！", "red");
    process.exit(1);
} else {
    init(name);
}

function init(name) {
    logInfo(name, "green");
    if (fs.existsSync(name)) {
        logInfo("Has the same name project,please input another projectName！", "yellow");
        return;
    }
    new Inquirer.prompt([
        {
            name: "framework",
            type: "list",
            message: "Select your framework",
            choices: [
                {
                    name: "Vue",
                    value: "vue",
                },
                {
                    name: "React",
                    value: "react",
                },
            ],
        },
        {
            name: "language",
            type: "list",
            message: "Select your language",
            choices: [
                {
                    name: "JavaScript",
                    value: "js",
                },
                {
                    name: "TypeScript",
                    value: "ts",
                },
            ],
        },
    ])
        .then(async (data) => {
            await downloadTemplate(name, data);
        })
        .catch((error) => {
            logInfo(error, "red");
        });
}
