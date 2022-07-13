import * as tipos from '../../types/personagensType';
import { Personagem, Info } from '../../types/personagensType';

const initialState = {
  isFetching: false,
  personagens: [],
  personagem: {} as Personagem,
  favPersonagens: [],
  episodios: [],
  favIdPersonagens: [] as any[],
  errorMessage: undefined,
  paginacao: {} as Info,
}

export const personagemReducer = (state = initialState, action: tipos.ActionType) => {
  switch(action.type) {
    case tipos.FETCH_PERSONAGENS_STARTED:
      return {
        ...state,
        isFetching: true,
      }
    case tipos.FETCH_PERSONAGENS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        paginacao: action.payload.info,
        personagens:
        action.payload.results.map( ( personagem: Personagem ) => {
          if ( state.favIdPersonagens.find( ( el: number ) => el === personagem.id ) ) {
              return {
                ...personagem,
                favorito: true,
              }
            }
            return personagem;
        })

      }
    case tipos.FETCH_PERSONAGEM: //valida o estado favoritado quando feito o refetch
      return {
        ...state,
        isFetching: false,
        personagem: state.favIdPersonagens.find(el => el === action.payload.id) ? {...action.payload, favorito: true} : action.payload,
      }
    case tipos.FETCH_EPISODIOS:
      return {
        ...state,
          episodios: action.payload,
      }
    case tipos.FETCH_PERSONAGENS_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    case tipos.FETCH_PERSONAGENS_FAVORITO:
      return {
        ...state,
        isFetching: false,
        favPersonagens: action.payload,
      }
    case tipos.UPDATE_PERSONAGEM_FAVORITO_STATUS:
      return { //para atualizar o estado favoritado do personagem
        ...state,
        personagem: state.personagem.id === action.payload ? {
          ...state.personagem,
          favorito: !state.personagem.favorito
        } : state.personagem,
        favIdPersonagens:  
        state.favIdPersonagens.find( id => id === action.payload ) ?
        state.favIdPersonagens.filter( id => id !== action.payload ) :
        [ ...state.favIdPersonagens , action.payload ],
        favPersonagens: 
        state.favPersonagens.find( ( personagem: Personagem ) => personagem.id === action.payload ) ?
        state.favPersonagens.filter( ( personagem: Personagem ) => personagem.id !== action.payload ) :
        [ ...state.favPersonagens ],
        personagens: 
        state.personagens.map( ( personagem: Personagem ) => {
          if ( personagem.id !== action.payload ) {
              return personagem;
            }
            return {
              ...personagem,
              favorito: !personagem.favorito,
            };
        })

      }
    case tipos.REMOVER_TODOS_FAVS: 
      return {
        ...state,
        favPersonagens: [],
        favIdPersonagens: [],
        personagens: state.personagens.map( ( personagem: Personagem ) =>  ( { ...personagem , favorito: false } ))
      }
    default: 
      return state;
  }  
}