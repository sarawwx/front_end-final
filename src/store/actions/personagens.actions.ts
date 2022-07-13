import * as tipos from '../../types/personagensType';
import { addCampoFavoritoEmObj } from '../../utils/utils';
export const fetchPersonagensStarted = () => ({type: tipos.FETCH_PERSONAGENS_STARTED});

export const fetchPersonagensSuccess = (apiData: tipos.ApiData): tipos.ActionType => (
  {
    type: tipos.FETCH_PERSONAGENS_SUCCESS,
    payload: apiData
  }
)

// return mensagem de erro
export const fetchPersonagensError = (errorMessage: string): tipos.ActionType => (
  {
    type: tipos.FETCH_PERSONAGENS_ERROR,
    payload: errorMessage
  }
)

// atualiza o estado favoritado no personagem
export const updateFavPersonagem = (id: number): tipos.ActionType => (
  {
    type: tipos.UPDATE_PERSONAGEM_FAVORITO_STATUS,
    payload: id
  }
)

// remove todos os pesonagens favoritados
export const removerTodosFavs = (): tipos.ActionType => (
  {
    type: tipos.REMOVER_TODOS_FAVS
  }
)

// faz a busca pelos personagens favoritados
export const fetchFavPersonagens = (personagens: tipos.Personagem[]): tipos.ActionType => (
  {
    type: tipos.FETCH_PERSONAGENS_FAVORITO,
    payload: personagens,
  }
)

export const fetchPersonagem = (personagem: tipos.Personagem):tipos.ActionType => (
  {
    type: tipos.FETCH_PERSONAGEM,
    payload: personagem,
  }
)

export const fetchEpisodios = (episodios: tipos.Episodio[]): tipos.ActionType => (
  {
    type: tipos.FETCH_EPISODIOS,
    payload: episodios,
  } 
)

// faz uma requisição para recuperar apenas um personagem conforme o ID
export const fetchPersonagensThunk = () => async (dispatch: any) => {

  dispatch(fetchPersonagensStarted());

  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    
    const mutatedData = data.results.map((personagem: tipos.Personagem) => addCampoFavoritoEmObj(personagem));

    dispatch(fetchPersonagensSuccess({info: data.info, results: mutatedData}));

  } catch(error: any) {
    dispatch(fetchPersonagensError(error.message));
  }
}

// faz uma requisição para recuperar

export const filterPersonagensThunk = (filtro: string) => async (dispatch: any) => {

  dispatch(fetchPersonagensStarted());
  
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${filtro}`);
    const data = await response.json();
    
    const mutatedData = data.results.map((personagem: tipos.Personagem) => addCampoFavoritoEmObj(personagem));
    
    dispatch(fetchPersonagensSuccess({info: data.info, results: mutatedData}));

  } catch(error: any){
    dispatch(fetchPersonagensError(error.message));
  }
}


export const fetchFavPersonagensThunk = (idPersonagens: number[]) => async (dispatch: any) => { 

  dispatch(fetchPersonagensStarted());
  
  try {
    let auxArray = [];

    const response = await fetch(`https://rickandmortyapi.com/api/character/${idPersonagens}`);
    const data = await response.json();

    if(!Array.isArray(data)) {
      auxArray.push(data);  
    } else {
      auxArray.push(...data);
    }

    const mutatedData = auxArray.map((personagem: tipos.Personagem) => addCampoFavoritoEmObj(personagem, true));
    
    dispatch(fetchFavPersonagens(mutatedData));
  
  } catch(error: any) {
    dispatch(fetchPersonagensError(error.message));
  }
}

export const fetchNovaPaginaThunk = (url: string) => async (dispatch:any) => {

  dispatch(fetchPersonagensStarted());

  try {
    const response = await fetch(url);
    const data = await response.json();

    const mutatedData = data.results.map((personagem: tipos.Personagem) => addCampoFavoritoEmObj(personagem));

    dispatch(fetchPersonagensSuccess({info: data.info, results: mutatedData}));

  } catch(error: any) {
    dispatch(fetchPersonagensError(error.message));
  }
}

export const fetchPersonagemThunk = (id: string) => async (dispatch: any) => {
  
  dispatch(fetchPersonagensStarted());

  try {
    const response  = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const data = await response.json();
    const mutatedData = addCampoFavoritoEmObj(data);
    dispatch(fetchPersonagem(mutatedData));

  } catch(error: any) {
    dispatch(fetchPersonagensError(error.message));
  }
}

export const fetchEpisodiosThunk = (idEpisodios: string[]) => async(dispatch: any) => {
  
  try {
    let auxArray = [];
    const response = await fetch(`https://rickandmortyapi.com/api/episode/${idEpisodios}`);
    const data = await response.json();
  
    if(!Array.isArray(data)) {
      auxArray.push(data);  
    } else {
      auxArray.push(...data);
    }


    dispatch(fetchEpisodios(auxArray));

  } catch(error: any) {
    dispatch(fetchPersonagensError(error.message));
  }
}