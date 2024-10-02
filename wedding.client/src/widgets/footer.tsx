// src/componetns/Footer.tsx

import { FC, ReactElement } from "react";
import { Box, Container, Grid, Link, Typography, useMediaQuery, useTheme } from "@mui/material";

export const Footer: FC = (): ReactElement => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "#F0F5ED",
                paddingTop: "1rem",
                paddingBottom: "1rem",
            }}
        >
            <Container maxWidth="lg">
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <Typography fontSize={isSmallScreen ? '1rem' : isMediumScreen ? '1.875rem' : '1.625rem'} style={{ fontFamily: "Times New Roman" }} variant="h4" component="h4" gutterBottom>
                            developed by <Link style={{ color: 'black' }} href="https://t.me/stuffyman">Марсель</Link><br />
                            design by <Link style={{ color: 'black' }} href="https://t.me/YGuzelR">Гузель</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;