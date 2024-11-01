// gitmoji-commit.js
import enquirer from 'enquirer';
import { execSync } from 'child_process';

const { prompt } = enquirer;

// Gitmoji一覧（選択肢には説明を含め、コミットメッセージには絵文字のみを使用）
const gitmojis = [
    { name: '✨ Add new feature', value: '✨' },
    { name: '🐛 Fix a bug', value: '🐛' },
    { name: '🔨 Refactor code', value: '🔨' },
    { name: '📝 Documentation update', value: '📝' },
    // 他のGitmojiもここに追加可能
];

// Gitmojiを選択してコミットメッセージを入力し、コミットを実行
async function commitWithGitmoji() {
    // Gitmojiの選択
    const { gitmoji } = await prompt({
        type: 'select',
        name: 'gitmoji',
        message: 'Choose a Gitmoji for this commit:',
        choices: gitmojis.map(g => ({ name: g.name, value: g.value })),
    });

    // コミットメッセージの入力
    const { message } = await prompt({
        type: 'input',
        name: 'message',
        message: 'Enter your commit message:',
    });

    // Gitmojiを先頭に付けたメッセージ
    const fullMessage = `${gitmoji} ${message}`;

    // コミットを実行
    try {
        execSync(`git commit -m "${fullMessage}"`, { stdio: 'inherit' });
        console.log('コミットが完了しました！');
    } catch (error) {
        console.error('コミットに失敗しました:', error);
    }
}

commitWithGitmoji();
