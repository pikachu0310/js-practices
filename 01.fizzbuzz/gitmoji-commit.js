// gitmoji-commit.js
import enquirer from 'enquirer';
import { execSync } from 'child_process';

const { prompt } = enquirer;

// Gitmoji一覧（選択画面用のnameには説明付き、valueには絵文字のみ）
const gitmojis = [
    { emoji: '✨', description: 'Add new feature' },
    { emoji: '🐛', description: 'Fix a bug' },
    { emoji: '🔨', description: 'Refactor code' },
    { emoji: '📝', description: 'Documentation update' },
    // 他のGitmojiもここに追加可能
];

// Gitmojiを選択してコミットメッセージを入力し、コミットを実行
async function commitWithGitmoji() {
    // Gitmojiの選択
    const { selectedEmoji } = await prompt({
        type: 'select',
        name: 'selectedEmoji',
        message: 'Choose a Gitmoji for this commit:',
        choices: gitmojis.map(g => ({ name: `${g.emoji} ${g.description}`, value: g.emoji })), // 表示には説明を含め、valueには絵文字のみ
    });

    // コミットメッセージの入力
    const { message } = await prompt({
        type: 'input',
        name: 'message',
        message: 'Enter your commit message:',
    });

    // Gitmojiを先頭に付けたメッセージ
    const fullMessage = `${selectedEmoji} ${message}`; // コミットには選択された絵文字のみが含まれる

    // コミットを実行
    try {
        execSync(`git commit -m "${fullMessage}"`, { stdio: 'inherit' });
        console.log('コミットが完了しました！');
    } catch (error) {
        console.error('コミットに失敗しました:', error);
    }
}

commitWithGitmoji();
