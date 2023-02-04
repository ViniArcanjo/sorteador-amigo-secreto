import style from './Card.module.scss';

export function Card({ children }) {
  return <div className={style.card_wrapper}>{children}</div>;
}
