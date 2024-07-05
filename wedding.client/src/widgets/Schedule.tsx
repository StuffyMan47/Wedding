import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { schedule } from "../entities/event/model/schedule-model";
import CircleIcon from '@mui/icons-material/Circle'; import React from "react";

interface scheduleProps {
    scheduleList?: schedule[]
}

export const ScheduleList: React.FC<scheduleProps> = ({ scheduleList }) => {
    return (
        <div className="schedule-list">
            <Typography variant="h4" component="h2" gutterBottom>
                Программа дня
            </Typography>
            {scheduleList ? (
                <List className="schedule-list">
                    {scheduleList.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem className="schedule-list-item">
                                <ListItemText
                                    primary={
                                        <>
                                            <span className="schedule-list-item-time">
                                                {item.time.slice(0, -3)}
                                            </span>
                                            <span className="schedule-list-item-name">
                                                {item.name}
                                            </span>
                                            <CircleIcon sx={{ fontSize: 10 }} />
                                        </>
                                    }
                                />
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