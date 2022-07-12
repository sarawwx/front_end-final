import { Personagem } from "../types/personagensType";

// essa é a função que adiciona o 'Favorito' em um objeto
export const addCampoFavoritoEmObj = (obj: Personagem, initialValue = false) => ({...obj,favorito: initialValue})

export const getEpisodiosId = (episodios: string[]) => {

  let ids = episodios.map(episodio => {
       let index = episodio.indexOf("e/");
       return episodio.slice(index + 2, episodio.length);
  })

  return ids;
}
