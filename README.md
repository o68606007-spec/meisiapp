# サービス名
デジタル名刺アプリ

# サービスの説明
勉強会で名刺交換をする中で、書いてある内容がそれぞれ違うため話題が生まれにくく、持っている人持っていない人がいることに目をつけて誰もがその場で登録できるオンライン名刺システムを開発することにしました
オンライン名刺はその日まで有効で、次の日にはみれなくなるようにしようと考えました

# 環境設定の方法(.envなど)
このリポジトリをクローンしてください。 
git@github.com/o68606007-spec/meisiapp.git

依存関係のインストールをしてください。 
npm ci

.envファイルを作成しsupabaseの設定値を入力してください 
1.meisiappという名前でプロジェクト名を作成してください。 
2.users、user_skill、skillsという名前のテーブルを作成し、以下のカラムを作成してください。
3.プロジェクトURLとプロジェクトキーを.env内のVITE_SUPABASE_URLとVITE_SUPABASE_PROJECT_KEY変数にコピー&ペーストしてください。

users

|カラム名 | 型 |option|
|:--------|:----|:------|
|user_id	|varchar	|non null|
|name	|varchar	|non null|
|description	|text	|non null|
|github_id	|varchar	|null|
|qiita_id	|varchar	|null|
|x_id	|varchar	|null|

user_skill

|カラム名 | 型 |option|
|:--------|:----|:------|
|id	|int8	|　|
|user_id	|varchar|	non null|
|skill_id	|int8	|non null|

skills

|カラム名 | 型 |option|
|:--------|:----|:------|
|id	|int8	|　|
|name	|varchar	|non null|

それぞれのテーブルの条件は以下になっている。
users.user_id = user_skill.user_id
skills.id = user_skill.skill_id


# 起動の仕方
npm run dev ターミナルでURLをクリックすると、開くことができます。
