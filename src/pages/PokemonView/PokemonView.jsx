import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import pokemonService from "../../services/pokemonService";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { capitalizeFirstLetter } from '../../utils/stringHelpers';

export const PokemonView = () => {
    const [loaded, setLodead] = useState(false);
    const [pokemon, setPokemon] = useState()
    const [species, setSpecies] = useState()
    const { id } = useParams();

    const fetchData = async () => {
        // chamar endpoint que pega descricao de pokemon por id e montar a tela de detalhes
        const data = await pokemonService.getPokemonById(id);
        const pokemonSpeciesData = await pokemonService.getSpeciesById(id)

        setPokemon(data)
        setSpecies(pokemonSpeciesData)

        if (data && pokemonSpeciesData) setLodead(true)
    };

    useEffect(() => {
        // Fetch Pokemon data here

        fetchData();
    }, []);

    return (
        !loaded ? <>loading</> :
            <>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom:'40px'}}>
                    <Typography variant="h1" sx={{ fontSize: '4rem' }}>
                        {capitalizeFirstLetter(pokemon.name)}
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid size={6} sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                        <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center", background:'#ccc', borderRadius: '15px'}}>
                            <img src={pokemon.sprites.other['official-artwork'].front_default} alt="" className="w-75" />
                        </Box>
                    </Grid>
                    <Grid size={6}>
                        <Stack spacing={4}>
                            <Box>
                                <Typography sx={{fontWeight: 'bold'}}>Descrição</Typography>
                                <Typography>
                                    {species.flavor_text_entries[0].flavor_text.replace(/\n|\f/g, ' ')}
                                </Typography>
                            </Box>
                            <Grid size={6}>
                                <Grid container sx={{ background: '#2fa7d7', borderRadius: '5px', padding: '15px' }}>
                                    <Grid size={6}>
                                        <Stack sx={{ color: '#FFF' }} spacing={4}>
                                            <Box>
                                                <Typography>Altura</Typography>
                                                <Typography sx={{ color: '#000' }}>{pokemon.height}'</Typography>
                                            </Box>
                                            <Box>
                                                <Typography>Experiência Base</Typography>
                                                <Typography sx={{ color: '#000' }}>{pokemon.base_experience}</Typography>
                                            </Box>
                                        </Stack>
                                    </Grid>
                                    <Grid size={6}>
                                        <Stack sx={{ color: '#FFF' }} spacing={4}>
                                            <Box>
                                                <Typography>Peso</Typography>
                                                <Typography sx={{ color: '#000' }}>{pokemon.weight} lbs</Typography>
                                            </Box>
                                            <Box>
                                                <Typography>Habilidades</Typography>
                                                {pokemon.abilities.map((abilitie) => {
                                                    return (<Typography key={abilitie.slot} sx={{ color: '#000' }}>{abilitie.ability.name}</Typography>)

                                                })}
                                            </Box>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>
            </>
    )
}