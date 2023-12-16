import chalk from "chalk";
import ora from "ora";
import downloadGitRepo from "download-git-repo";
import path from "path";

function logInfo(info, type) {
    console.log(`${chalk[type](info)}`);
}

function formatTargetDir(targetDir) {
    return targetDir?.trim().replace(/\/+$/g, "");
}

function downloadTemplate(projectName, option) {
    const { framework, language } = option;
    const loading = ora("Downloading Template");
    loading.color = "blue";
    return new Promise(async (resolve, reject) => {
        loading.start();
        const projectPath = path.join(process.cwd(), projectName);
        downloadGitRepo(`github:Sunalone/${framework}-${language}-template`, projectPath, (error) => {
            if (error) {
                loading.fail("Download failed");
                reject(error);
            } else {
                loading.succeed("Download success");
                resolve(true);
            }
        });
    });
}

export { logInfo, formatTargetDir, downloadTemplate };
