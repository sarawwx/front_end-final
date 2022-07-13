import {Episodio} from "../../types/personagensType";
import "./card-episodio.css";

type Props = {
  episodio: Episodio,
}

// este é o card para cada episódio na visualização do personagem

const CardEpisodio = ({ episodio }: Props) => {
  return (
    <div className="card-episodio">
      <h4>{episodio.name}</h4>
      <div>
        <span>{episodio.episode}</span>
        <span>{episodio.air_date}</span>
      </div>
    </div>
  );
};

export default CardEpisodio;