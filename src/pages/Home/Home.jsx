import { HomeTable } from "./components/HomeTable";
import pokemonService from "../../services/pokemonService";
import { useEffect, useState } from "react";
import { Box, Pagination } from '@mui/material';
import { SearchInputText } from "./components/SearchInputText";
import { SelectInput } from "./components/SelectInput";

export const Home = () => {
    const [pokemon, setPokemon] = useState([])
    const [filteredPokemon, setFilteredPokemon] = useState([])
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [filters, setFilters] = useState();

    const pokemonTypesOpt = [
        { value: 'null', name: 'Selecione um tipo' },
        { value: 'normal', name: 'Normal' },
        { value: 'fighting', name: 'Lutador' },
        { value: 'flying', name: 'Voador' },
        { value: 'poison', name: 'Venenoso' },
        { value: 'ground', name: 'Terra' },
        { value: 'rock', name: 'Pedra' },
    ]

    const perPageOpt = [
        { value: 5, name: '5' },
        { value: 10, name: '10' },
        { value: 15, name: '15' },
        { value: 20, name: '20' },
        { value: 25, name: '25' },
        { value: 30, name: '20' },

    ]

    const handleSearch = (data) => {
        if (data.length > 0) {

            const filtered = pokemon.filter(item =>
                item.name.toLowerCase().includes(data.toLowerCase())
            )
            console.log(data)
            setFilteredPokemon(filtered)
        } else {
            console.log(data)

            setFilteredPokemon(pokemon)

        }
    }

    const fetchData = async ({ page, perPage, filters }) => {
        try {
            const response = await pokemonService.fetchPokemons({ page, perPage, filters })

            if (response) {
                setPokemon(response)
                setFilteredPokemon(response)
            }
        } catch (e) {
            console.error(e)
        };
    }


    const handlePagination = (event, value) => {
        setPage(value);
    }

    useEffect(() => {
        fetchData({ page, perPage, filters })
    }, [filters, page, perPage])

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                <Box sx={{ width: '400px' }}>
                    <SearchInputText fieldName={'Pesquise o nome do Pokemon na pagina'} handleSearch={handleSearch} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: '20px', width: '25%' }}>
                    <Box sx={{ width: '200px' }}>
                        <SelectInput fieldName={''} options={pokemonTypesOpt} handleSelection={setFilters} />
                    </Box>
                    <Box sx={{ width: '70px' }}>
                        <SelectInput fieldName={''} options={perPageOpt} handleSelection={setPerPage} />
                    </Box>
                </Box>
            </Box >

            <HomeTable fetchData={fetchData} data={pokemon} filteredData={filteredPokemon} />
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
                <Pagination count={perPage} size="large" page={page} onChange={handlePagination} color="primary" />
            </Box>

        </>
    )
}