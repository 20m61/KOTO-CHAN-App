module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // タイプの定義
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新機能
        'fix',      // バグ修正
        'docs',     // ドキュメント
        'style',    // フォーマット（機能に影響しない）
        'refactor', // リファクタリング
        'perf',     // パフォーマンス改善
        'test',     // テスト追加・修正
        'chore',    // ビルドプロセスやツール変更
        'ci',       // CI設定変更
        'build',    // ビルドシステム変更
        'revert',   // リバート
      ],
    ],
    // サブジェクトの最大文字数
    'subject-max-length': [2, 'always', 72],
    // サブジェクトの最小文字数
    'subject-min-length': [2, 'always', 3],
    // サブジェクトの大文字小文字（小文字開始）
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    // サブジェクトの末尾にピリオドを付けない
    'subject-full-stop': [2, 'never', '.'],
    // ヘッダーの最大文字数
    'header-max-length': [2, 'always', 72],
    // 本文の各行の最大文字数
    'body-max-line-length': [2, 'always', 100],
    // フッターの各行の最大文字数
    'footer-max-line-length': [2, 'always', 100],
  },
};