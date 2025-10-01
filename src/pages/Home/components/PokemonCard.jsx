import * as React from 'react';
import { useState } from 'react';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Box, Card, Paper } from '@mui/material';

function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const PokemonCard = ({ id, name, image }) => {
    const [hover, setHover] = useState(false)
    return (
        <Box onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            sx={{outline: hover ? '2px solid #000' : null}}
                >
            <Paper
                elevation={5} // nível da sombra (0 a 24)
            >
                <Card >
                    <CardMedia
                        component="img"
                        image={image}
                        sx={{ width: 140, height: 140, margin: '0 auto', paddingTop: '10px' }}

                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {capitalizeFirst(name)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to={`/pokemon/${id}`}>
                            <Button size="small">Detalhes</Button>
                        </Link>
                    </CardActions>
                </Card>
            </Paper>
        </Box>
    )
}
