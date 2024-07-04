import { useRouter } from "next/router";
import styles from "./styles.module.css";

interface ICards {
  name: string;
  id: number;
}

const Cards = (props: ICards) => {
  const router = useRouter();
  const handleClick = () => router.push(`/person/${props.name.toLowerCase().replace(/\s+/g, '-')}?id=${props.id}`);

  return (
    <div className={styles.column} onClick={handleClick}>
      <div className={styles.card}>{props.name}</div>
    </div>
  )
}

export default Cards;