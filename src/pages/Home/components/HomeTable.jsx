import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import { PokemonCard } from './PokemonCard';



export const HomeTable = ({ filteredData }) => {
console.log(filteredData)
    return (
        filteredData && (<React.Fragment>
            <Grid container spacing={2} >
                {filteredData.length > 0 ?
                
                    filteredData.map((_, index) => (

                        <Grid key={index} size={2} >
                            <PokemonCard id={filteredData[index].id} name={filteredData[index].name} image={filteredData[index].imageLink} />
                        </Grid>
                    ))
                    : <></>
                    
                    // data.map((_, index) => (

                    //     <Grid key={index} size={2} >
                    //         <PokemonCard id={data[index].id} name={data[index].name} image={data[index].imageLink} />
                    //     </Grid>

                    // ))
                }
            </Grid>

        </React.Fragment>)
    )
}
