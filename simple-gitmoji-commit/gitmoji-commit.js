#!/usr/bin/env node

import inquirer from "inquirer";
import inquirerSearchList from "inquirer-search-list";
import { execSync } from "child_process";

inquirer.registerPrompt("search-list", inquirerSearchList);

const gitmojis = [
  { name: "🎨:art: Improve structure / format of the code", value: "🎨" },
  { name: "⚡️:zap: Improve performance", value: "⚡️" },
  { name: "🔥:fire: Remove code or files", value: "🔥" },
  { name: "🐛:bug: Fix a bug", value: "🐛" },
  { name: "🚑️:ambulance: Critical hotfix", value: "🚑️" },
  { name: "✨:sparkles: Introduce new features", value: "✨" },
  { name: "📝:memo: Add or update documentation", value: "📝" },
  { name: "🚀:rocket: Deploy stuff", value: "🚀" },
  { name: "💄:lipstick: Add or update the UI and style files", value: "💄" },
  { name: "🎉:tada: Begin a project", value: "🎉" },
  { name: "✅:white_check_mark: Add, update, or pass tests", value: "✅" },
  { name: "🔒️:lock: Fix security or privacy issues", value: "🔒️" },
  { name: "🔐:closed_lock_with_key: Add or update secrets", value: "🔐" },
  { name: "🔖:bookmark: Release / Version tags", value: "🔖" },
  { name: "🚨:rotating_light: Fix compiler / linter warnings", value: "🚨" },
  { name: "🚧:construction: Work in progress", value: "🚧" },
  { name: "💚:green_heart: Fix CI Build", value: "💚" },
  { name: "⬇️:arrow_down: Downgrade dependencies", value: "⬇️" },
  { name: "⬆️:arrow_up: Upgrade dependencies", value: "⬆️" },
  { name: "📌:pushpin: Pin dependencies to specific versions", value: "📌" },
  { name: "👷:construction_worker: Add or update CI build system", value: "👷" },
  { name: "📈:chart_with_upwards_trend: Add or update analytics or track code", value: "📈" },
  { name: "♻️:recycle: Refactor code", value: "♻️" },
  { name: "➕:heavy_plus_sign: Add a dependency", value: "➕" },
  { name: "➖:heavy_minus_sign: Remove a dependency", value: "➖" },
  { name: "🔧:wrench: Add or update configuration files", value: "🔧" },
  { name: "🔨:hammer: Add or update development scripts", value: "🔨" },
  { name: "🌐:globe_with_meridians: Internationalization and localization", value: "🌐" },
  { name: "✏️:pencil2: Fix typos", value: "✏️" },
  { name: "💩:poop: Write bad code that needs to be improved", value: "💩" },
  { name: "⏪️:rewind: Revert changes", value: "⏪️" },
  { name: "🔀:twisted_rightwards_arrows: Merge branches", value: "🔀" },
  { name: "📦️:package: Add or update compiled files or packages", value: "📦️" },
  { name: "👽️:alien: Update code due to external API changes", value: "👽️" },
  { name: "🚚:truck: Move or rename resources", value: "🚚" },
  { name: "📄:page_facing_up: Add or update license", value: "📄" },
  { name: "💥:boom: Introduce breaking changes", value: "💥" },
  { name: "🍱:bento: Add or update assets", value: "🍱" },
  { name: "♿️:wheelchair: Improve accessibility", value: "♿️" },
  { name: "💡:bulb: Add or update comments in source code", value: "💡" },
  { name: "🍻:beers: Write code drunkenly", value: "🍻" },
  { name: "💬:speech_balloon: Add or update text and literals", value: "💬" },
  { name: "🗃️:card_file_box: Perform database related changes", value: "🗃️" },
  { name: "🔊:loud_sound: Add or update logs", value: "🔊" },
  { name: "🔇:mute: Remove logs", value: "🔇" },
  { name: "👥:busts_in_silhouette: Add or update contributor(s)", value: "👥" },
  { name: "🚸:children_crossing: Improve user experience / usability", value: "🚸" },
  { name: "🏗️:building_construction: Make architectural changes", value: "🏗️" },
  { name: "📱:iphone: Work on responsive design", value: "📱" },
  { name: "🤡:clown_face: Mock things", value: "🤡" },
  { name: "🥚:egg: Add or update an easter egg", value: "🥚" },
  { name: "🙈:see_no_evil: Add or update a .gitignore file", value: "🙈" },
  { name: "📸:camera_flash: Add or update snapshots", value: "📸" },
  { name: "⚗️:alembic: Perform experiments", value: "⚗️" },
  { name: "🔍️:mag: Improve SEO", value: "🔍️" },
  { name: "🏷️:label: Add or update types", value: "🏷️" },
  { name: "🌱:seedling: Add or update seed files", value: "🌱" },
  { name: "🚩:triangular_flag_on_post: Add, update, or remove feature flags", value: "🚩" },
  { name: "🥅:goal_net: Catch errors", value: "🥅" },
  { name: "💫:dizzy: Add or update animations and transitions", value: "💫" },
  { name: "🗑️:wastebasket: Deprecate code that needs to be cleaned up", value: "🗑️" },
  { name: "🛂:passport_control: Work on code related to authorization", value: "🛂" },
  { name: "🩹:adhesive_bandage: Simple fix for a non-critical issue", value: "🩹" },
  { name: "🧐:monocle_face: Data exploration/inspection", value: "🧐" },
  { name: "⚰️:coffin: Remove dead code", value: "⚰️" },
  { name: "🧪:test_tube: Add a failing test", value: "🧪" },
  { name: "👔:necktie: Add or update business logic", value: "👔" },
  { name: "🩺:stethoscope: Add or update healthcheck", value: "🩺" },
  { name: "🧱:bricks: Infrastructure related changes", value: "🧱" },
  { name: "🧑‍💻:technologist: Improve developer experience", value: "🧑‍💻" },
  { name: "💸:money_with_wings: Add sponsorships or money related infrastructure", value: "💸" },
  { name: "🧵:thread: Add or update code related to multithreading", value: "🧵" },
  { name: "🦺:safety_vest: Add or update code related to validation", value: "🦺" },
];

async function commitWithGitmoji() {
    try {
        if (!hasStagedChanges()) {
            printMessage("No changes staged for commit. Use 'git add' to stage changes.");
            return;
        }

        const selectedEmoji = await promptEmojiSelection();
        const message = await promptCommitMessage();

        if (!message.trim()) {
            printMessage("Commit message cannot be empty.");
            return;
        }

        const fullMessage = `${selectedEmoji} ${message}`;
        execSync(`git commit -m "${fullMessage}"`, { stdio: "inherit" });
    } catch (error) {
        printMessage(`An error occurred: ${error.message}`);
    }
}

function hasStagedChanges() {
    return execSync("git diff --cached --name-only").toString().trim();
}

async function promptEmojiSelection() {
    const { selectedEmoji } = await inquirer.prompt([
        {
            type: "search-list",
            name: "selectedEmoji",
            message: "Choose a Gitmoji for this commit:",
            choices: gitmojis,
        },
    ]);
    return selectedEmoji;
}

async function promptCommitMessage() {
    const { message } = await inquirer.prompt([
        {
            type: "input",
            name: "message",
            message: "Enter your commit message:",
        },
    ]);
    return message;
}

function printMessage(message) {
    console.log(message);
}

commitWithGitmoji();
