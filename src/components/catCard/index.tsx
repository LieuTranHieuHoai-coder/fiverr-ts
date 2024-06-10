import { Link } from "react-router-dom";
import "./catcard.scss"

interface CardProps {
  img: string;
  desc: string;
  title: string;
}
function CatCard({ card }: { card: CardProps }) {
  return (
    <Link to="/gigs?cat=design">
      <div className="catCard">
        <img src={card.img} alt="" />
        <span className="desc">{card.desc}</span>
        <span className="title">{card.title}</span>
      </div>
    </Link>
  );
}
export default CatCard;