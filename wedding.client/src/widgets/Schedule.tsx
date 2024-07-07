import { Divider, Grid, List, ListItem, Typography, useMediaQuery, useTheme } from "@mui/material";
import { schedule } from "../entities/event/model/schedule-model";
import CircleIcon from '@mui/icons-material/Circle'; import React from "react";

interface scheduleProps {
    scheduleList?: schedule[]
}

export const ScheduleList: React.FC<scheduleProps> = ({ scheduleList }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    return (
        <div className="schedule-list ">
            <Typography  style={{ fontFamily: "Cormorant Infant", textAlign: "center" }} className="font-cormorantInfant" variant="h4" component="h2" gutterBottom>ПРОГРАММА ДНЯ</Typography>
            {scheduleList ? (
                <List className="schedule-list">
                    {scheduleList.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem className="schedule-list-item flex justify-between items-center">
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item maxWidth="100px" minWidth="80px">
                                        <Typography fontSize={isSmallScreen ? '1.5rem' : isMediumScreen ? '2.125rem' : '2.125rem'} style={{ fontFamily: "Times New Roman" }} variant="h4" component="h2" gutterBottom>
                                            {item.time.slice(0, -3)}
                                        </Typography>
                                    </Grid>
                                    <Grid item maxWidth={isSmallScreen ? "160px" : "220px"} minWidth="100px">
                                        <Typography fontSize={isSmallScreen ? '1.5rem' : isMediumScreen ? '2.125rem' : '2.125rem'} style={{ fontFamily: "Times New Roman", whiteSpace: "normal", overflowWrap: "break-word" }} variant="h4" component="h2" gutterBottom align="center">
                                            {item.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item maxWidth="100px">
                                        <CircleIcon sx={{ fontSize: 10 }} />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            ) : (
                <Typography variant="body1">Loading schedule...</Typography>
            )}
        </div>
    );
};

export default ListItem;