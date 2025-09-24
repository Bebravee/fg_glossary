import styles from "./ContactContent.module.scss";

const ContactContent = () => {
  return (
    <div className={styles.ContactContent}>
      <h1>Данные для связи</h1>

      <div>
        <p>Автор контент: @randomHero6265 {`(тг)`}</p>
        <p>Разработчик: @bebravee1 {`(тг)`}</p>
      </div>
    </div>
  );
};

export default ContactContent;
