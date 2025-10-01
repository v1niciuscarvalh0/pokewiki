import api from './api';

class pokemonService {


    static fetchPokemons = async ({ page, perPage, filters }) => {
        try {
            const offset = (page - 1) * perPage;

            if (filters && filters !== 'null' ) {
                const response = await api.get(`/type/${filters}?offset=${offset}&limit=${5}`);

                response.data.pokemon.map((item) => {
                    const id = item.pokemon.url.split("/").filter(Boolean).pop();
                    item.imageLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                    item.id = id
                    item.name = item.pokemon.name
                });
                const paginated = response.data.pokemon.slice(offset, offset + perPage);
                return paginated;
            }
            const response = await api.get(`/pokemon?limit=${perPage}&offset=${offset}`);

            response.data.results.map((item) => {
                const id = item.url.split("/").filter(Boolean).pop();
                item.imageLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                item.id = id
            });
            return response.data.results;
        } catch (error) {
            console.error('Error fetching all Pokemons:', error);
            throw error;
        }
    };

    static getPokemonById = async (id) => {
        try {
            const response = await api.get(`/pokemon/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching Pokemon with ID ${id}:`, error);
            throw error;
        }
    };

    static getSpeciesById = async (id) => {
        try {
            const response = await api.get(`/pokemon-species/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching Pokemon species with ID ${id}:`, error);
            throw error;
        }
    };
}



export default pokemonService;