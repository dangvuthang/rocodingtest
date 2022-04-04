import { Box,Button, Grid, IconButton, Typography, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import * as React from 'react';
import Dslayout from '../components/dashboard/Dslayout/Dslayout';

export default function Dashboard()  {
    const [check, setCheck] = React.useState(false);
    const handleCheckBox = () => {
        setCheck(!check);
        console.log(check);
      }
    return(
    <Dslayout>
        <Grid >
        <Grid item>
          <Box width='98%' sx=
            {{
              py: 1.5,
              mx: 2,
              my: 2,
              bgcolor: 'white',
              borderRadius: 3.5,
            }}>
            <Button variant="contained" startIcon={<AddIcon />} sx={{ ml: 2 }}>Add exam</Button>
            <Button variant="contained" sx={{ ml: 2 }}>Weekly Details</Button>
            <Button variant="contained" sx={{ ml: 2 }}>Move to category</Button>
            <Button variant="contained" sx={{ ml: 2 }}>Move to archiev</Button>
          </Box>
        </Grid>
        <Grid item>
          <Box width='98%' sx=
            {{
              py: 1,
              mx: 2,
              my: 2,
              bgcolor: 'white',
              borderRadius: 3.5,
              height: '80vh',
            }}>
            {/* Page Content */}
            <Grid container spacing={2} direction="column"
              justifyContent="center"
              alignItems="center">
              <Grid item sx={{ width: '90%' }}>
                <Box mb={3}>
                  <Paper>
                    <Box p={2}>
                      <Grid container alignItems="center" spacing={1}>
                        {check === false ?
                          <IconButton onClick={handleCheckBox}>
                            <CheckBoxOutlineBlankIcon />
                          </IconButton> :
                          <IconButton onClick={handleCheckBox}>
                            <CheckBoxIcon />
                          </IconButton>}
                        <Grid item>
                          <img src="https://picsum.photos/200/300" alt="hehe" width="100%" />
                        </Grid>
                        <Grid item>
                          <Typography>hehe</Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Dslayout>
    );
}