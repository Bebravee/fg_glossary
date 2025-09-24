import styles from "./CreditsContent.module.scss";

const CreditsContent = () => {
  return (
    <div className={styles.CreditsContent}>
      <h1>Авторы сайта</h1>

      <div>
        <p>Редактор контента: randomHero</p>
        <p>Разработчик: bebravee</p>
      </div>
    </div>
  );
};

export default CreditsContent;
