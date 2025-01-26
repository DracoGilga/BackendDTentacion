import inquirer from "inquirer";
import { spawn } from "child_process";

const runCommand = (command: string, args: string[]) => {
    return new Promise<void>((resolve, reject) => {
        const process = spawn(command, args, { stdio: "inherit", shell: true });

        process.on("error", (error) => {
            console.error(`❌ Error: ${error.message}`);
            reject(error);
        });

        process.on("close", (code) => {
            if (code !== 0) {
                console.error(`❌ Process exited with code ${code}`);
                reject(new Error(`Process exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
};

const main = async () => {
    const { action } = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What do you want to execute?",
            choices: [
                { name: "Run migrations (The database must already exist!)", value: "migrate" },
                { name: "Start the server", value: "startServer" },
            ],
        },
    ]);

    try {
        if (action === "migrate") {
            console.log("Running migrations...");
            await runCommand("npx", ["knex", "migrate:latest", "--knexfile", "./knexfile.ts"]);
        } else if (action === "startServer") {
            console.log("Starting the server...");
            await runCommand("npx", ["tsx", "index.ts"]);
        }
    } catch (error) {
        console.error("❌ An error occurred:", error);
    }
};

main().catch((error) => {
    console.error("Unexpected error:", error);
});