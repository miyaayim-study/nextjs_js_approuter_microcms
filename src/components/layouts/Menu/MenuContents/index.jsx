import Link from "next/link";
import styles from "./index.module.scss";
import { getCategoriesList } from "@/libs/microcms";

export const MenuContents = async () => {
  // ブログカテゴリーを取得
  const queries = { fields: "id,name" };
  const categoriesListResponse = await getCategoriesList(queries);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: categories } = await categoriesListResponse.json();

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.menu}>
          <nav className={styles.menu__nav}>
            <ul className={styles.menu__list}>
              {categories.map((category) => {
                return (
                  <li className={styles.menu__item} key={category.id}>
                    <Link
                      href={`/category/${category.id}`}
                      className={styles.menu__link}
                    >
                      <svg className={styles.menu__icon}>
                        <use href="#svg-category" />
                      </svg>
                      <span className={styles.menu__name}>{category.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
