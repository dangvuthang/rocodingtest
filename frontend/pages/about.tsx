import { Box,Button, Grid, IconButton, Typography, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import * as React from 'react';
import Dslayout from '../components/dashboard/Ds_layout/Dslayout';

export default function About()  {
   
    return(
    <Dslayout>
        <Box width='98%' sx=
            {{
              py: 1.5,
              mx: 2,
              my: 2,
              bgcolor: 'white',
              borderRadius: 3.5,
            }}><Typography>Hello!</Typography></Box>
    </Dslayout>
    );
}