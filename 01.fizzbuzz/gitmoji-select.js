// gitmoji-select.js
import enquirer from 'enquirer';

const { prompt } = enquirer;

// Gitmoji一覧
const gitmojis = [
    { name: '✨ Feature', value: '✨' },
    { name: '🐛 Bug fix', value: '🐛' },
    { name: '🔨 Refactor', value: '🔨' },
    { name: '📝 Documentation', value: '📝' },
];

// Gitmojiを選択
async function selectGitmoji() {
    const { gitmoji } = await prompt({
        type: 'select',
        name: 'gitmoji',
        message: 'Choose a Gitmoji:',
        choices: gitmojis.map(g => ({ name: g.name, value: g.value })),
    });
    return gitmoji;
}

(async () => {
    const gitmoji = await selectGitmoji();
    console.log(`Selected Gitmoji: ${gitmoji}`);
})();
