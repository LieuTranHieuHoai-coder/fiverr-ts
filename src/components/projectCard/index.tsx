import React from "react";
import "./projectCard.scss";

interface ProjectCardProps {
  card: {
    img: string;
    pp: string;
    cat: string;
    username: string;
  };
}
function ProjectCard({ card }: ProjectCardProps) {
  return (
    <div className="projectCard">
      <img src={card.img} alt="" />
      <div className="info">
        <img src={card.pp} alt="" />
        <div className="texts">
          <h2>{card.cat}</h2>
          <span>{card.username}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
