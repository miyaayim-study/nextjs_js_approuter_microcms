// "use client";
// import axios from "axios";

// import { useState } from "react";
// import { useState, useEffect } from "react";

import Link from "next/link";
import { getList } from "../../libs/microcms";
import { getCategories } from "../../libs/microcms";
import styles from "./page.module.scss";
import utility from "src/scss/utility/utility.module.scss";

import { Category } from "@/features/components/blog/Category/Category";

export default async function Home() {
  // const [category, setCategory] = useState([]);

  // ブログ一覧を取得
  const listResponse = await getList();

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: posts, error: listError } = await listResponse.json();

  // この時点の'response'の中身は、
  // [{id:(...), title:(...), content:(...)},{id:(...), title:(...), content:(...)}]
  // といった感じ。
  // console.log("posts => ", posts);

  // ブログカテゴリーを取得
  const categoriesResponse = await getCategories();

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: categories, error: categoriesError } =
    await categoriesResponse.json();
  // console.log("categories => ", categories);

  // ページの生成された時間を取得
  const time = new Date().toLocaleString();

  if (listError != null) {
    return <div>記事リスト取得エラーが発生しました。</div>;
  }
  if (categoriesError != null) {
    return <div>カテゴリ取得エラーが発生しました。</div>;
  }

  // 記事がない場合
  if (!posts || posts.length === 0) {
    return <h1>記事が0件でした。</h1>;
  }

  return (
    <div className={`${styles.container} ${utility.inner}`}>
      <Category
        categories={categories}
        // currentCategory={currentCategory}
        // setCurrentCategory={setCurrentCategory}
      />
      <div>
        <h1>生成time: {time}</h1>
        <li>
          <Link href="/blog/test">/blog/testへのリンク</Link>
        </li>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
            <p>{post.id}</p>
          </li>
        ))}
      </div>
    </div>
  );
}
