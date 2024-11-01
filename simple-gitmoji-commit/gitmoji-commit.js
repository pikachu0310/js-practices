import inquirer from "inquirer";
import { execSync } from "child_process";

const gitmojis = [
  { name: "🎨 Improve structure / format of the code", value: "🎨" },
  { name: "⚡️ Improve performance", value: "⚡️" },
  { name: "🔥 Remove code or files", value: "🔥" },
  { name: "🐛 Fix a bug", value: "🐛" },
  { name: "🚑️ Critical hotfix", value: "🚑️" },
  { name: "✨ Introduce new features", value: "✨" },
  { name: "📝 Add or update documentation", value: "📝" },
  { name: "🚀 Deploy stuff", value: "🚀" },
  { name: "💄 Add or update the UI and style files", value: "💄" },
  { name: "🎉 Begin a project", value: "🎉" },
  { name: "✅ Add, update, or pass tests", value: "✅" },
  { name: "🔒️ Fix security or privacy issues", value: "🔒️" },
  { name: "🔐 Add or update secrets", value: "🔐" },
  { name: "🔖 Release / Version tags", value: "🔖" },
  { name: "🚨 Fix compiler / linter warnings", value: "🚨" },
  { name: "🚧 Work in progress", value: "🚧" },
  { name: "💚 Fix CI Build", value: "💚" },
  { name: "⬇️ Downgrade dependencies", value: "⬇️" },
  { name: "⬆️ Upgrade dependencies", value: "⬆️" },
  { name: "📌 Pin dependencies to specific versions", value: "📌" },
  { name: "👷 Add or update CI build system", value: "👷" },
  { name: "📈 Add or update analytics or track code", value: "📈" },
  { name: "♻️ Refactor code", value: "♻️" },
  { name: "➕ Add a dependency", value: "➕" },
  { name: "➖ Remove a dependency", value: "➖" },
  { name: "🔧 Add or update configuration files", value: "🔧" },
  { name: "🔨 Add or update development scripts", value: "🔨" },
  { name: "🌐 Internationalization and localization", value: "🌐" },
  { name: "✏️ Fix typos", value: "✏️" },
  { name: "💩 Write bad code that needs to be improved", value: "💩" },
  { name: "⏪️ Revert changes", value: "⏪️" },
  { name: "🔀 Merge branches", value: "🔀" },
  { name: "📦️ Add or update compiled files or packages", value: "📦️" },
  { name: "👽️ Update code due to external API changes", value: "👽️" },
  { name: "🚚 Move or rename resources", value: "🚚" },
  { name: "📄 Add or update license", value: "📄" },
  { name: "💥 Introduce breaking changes", value: "💥" },
  { name: "🍱 Add or update assets", value: "🍱" },
  { name: "♿️ Improve accessibility", value: "♿️" },
  { name: "💡 Add or update comments in source code", value: "💡" },
  { name: "🍻 Write code drunkenly", value: "🍻" },
  { name: "💬 Add or update text and literals", value: "💬" },
  { name: "🗃️ Perform database related changes", value: "🗃️" },
  { name: "🔊 Add or update logs", value: "🔊" },
  { name: "🔇 Remove logs", value: "🔇" },
  { name: "👥 Add or update contributor(s)", value: "👥" },
  { name: "🚸 Improve user experience / usability", value: "🚸" },
  { name: "🏗️ Make architectural changes", value: "🏗️" },
  { name: "📱 Work on responsive design", value: "📱" },
  { name: "🤡 Mock things", value: "🤡" },
  { name: "🥚 Add or update an easter egg", value: "🥚" },
  { name: "🙈 Add or update a .gitignore file", value: "🙈" },
  { name: "📸 Add or update snapshots", value: "📸" },
  { name: "⚗️ Perform experiments", value: "⚗️" },
  { name: "🔍️ Improve SEO", value: "🔍️" },
  { name: "🏷️ Add or update types", value: "🏷️" },
  { name: "🌱 Add or update seed files", value: "🌱" },
  { name: "🚩 Add, update, or remove feature flags", value: "🚩" },
  { name: "🥅 Catch errors", value: "🥅" },
  { name: "💫 Add or update animations and transitions", value: "💫" },
  { name: "🗑️ Deprecate code that needs to be cleaned up", value: "🗑️" },
  { name: "🛂 Work on code related to authorization", value: "🛂" },
  { name: "🩹 Simple fix for a non-critical issue", value: "🩹" },
  { name: "🧐 Data exploration/inspection", value: "🧐" },
  { name: "⚰️ Remove dead code", value: "⚰️" },
  { name: "🧪 Add a failing test", value: "🧪" },
  { name: "👔 Add or update business logic", value: "👔" },
  { name: "🩺 Add or update healthcheck", value: "🩺" },
  { name: "🧱 Infrastructure related changes", value: "🧱" },
  { name: "🧑‍💻 Improve developer experience", value: "🧑‍💻" },
  { name: "💸 Add sponsorships or money related infrastructure", value: "💸" },
  { name: "🧵 Add or update code related to multithreading", value: "🧵" },
  { name: "🦺 Add or update code related to validation", value: "🦺" },
];

async function commitWithGitmoji() {
  const { selectedEmoji } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedEmoji",
      message: "Choose a Gitmoji for this commit:",
      choices: gitmojis,
    },
  ]);

  const { message } = await inquirer.prompt([
    {
      type: "input",
      name: "message",
      message: "Enter your commit message:",
    },
  ]);

  const fullMessage = `${selectedEmoji} ${message}`;

  execSync(`git commit -m "${fullMessage}"`, { stdio: "inherit" });
}

commitWithGitmoji();
