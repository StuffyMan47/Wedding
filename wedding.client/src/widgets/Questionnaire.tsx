import React, { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { alcohol } from '../entities/enums/alcohol';

interface FormData {
    guestId: number;
    coupleName?: string;
    isCome?: string;
    alcohols: alcohol[];
}

interface GuestFormProps {
    guestId: number;
}

const EventForm: React.FC<GuestFormProps> = ({ guestId }) => {
    const [formData, setFormData] = useState<FormData>({
        guestId: guestId,
        coupleName: undefined,
        alcohols: [],
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                alcohols: checked
                    ? [...prevData.alcohols, Number(value) as alcohol]
                    : prevData.alcohols.filter((item) => item !== Number(value)),
            }));
        } else if (name === "attending") {
            setFormData((prevData) => ({
                ...prevData,
                isCome: value,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://localhost:44333/api/Events/questionnaire', formData);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="border-6 border-backgroundGreen">
            <Typography style={{ fontFamily: "Times New Roman" }} variant="h4" component="h2" gutterBottom>Ваше присутствие</Typography>
            <div className="ml-16 mb-8">
                <FormControl component="fieldset" className="w-full">
                    
                        <RadioGroup name="attending" value={formData.isCome} onChange={handleChange}>
                            <FormControlLabel value={"solo"} control={<Radio />} label={<Typography style={{ fontFamily: "Times New Roman" }} variant="h5" component="h5" gutterBottom>Я приду</Typography> } />
                            <FormControlLabel value={"couple"} control={<Radio />} label={<Typography style={{ fontFamily: "Times New Roman" }} variant="h5" component="h5" gutterBottom>Мы придём</Typography>} />
                            <FormControlLabel value={"false"} control={<Radio />} label={<Typography style={{ fontFamily: "Times New Roman" }} variant="h5" component="h5" gutterBottom>Не приду</Typography>} />
                </RadioGroup>
                </FormControl>
                <div>
                {formData.isCome === "partner" && (
                <TextField
                    label="Имя пары"
                    name="coupleName"
                    value={formData.coupleName}
                    onChange={handleChange}
                />
                    )}
                </div>
            </div>
            <Typography style={{ fontFamily: "Times New Roman" }} variant="h4" component="h2" gutterBottom>Предпочтения по алкоголю</Typography>
            <div className="ml-16 mb-8">
                <FormControl component="fieldset" className="w-full">
                    
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="alcoholPreferences"
                                value={alcohol.Champagne}
                                checked={formData.alcohols.includes(alcohol.Champagne)}
                                onChange={handleChange}
                            />
                        }
                                label={<Typography style={{ fontFamily: "Times New Roman" }} variant="h5" component="h5" gutterBottom>Шампанское</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="alcoholPreferences"
                                value={alcohol.Cognac}
                                checked={formData.alcohols.includes(alcohol.Cognac)}
                                onChange={handleChange}
                            />
                        }
                                label={<Typography style={{ fontFamily: "Times New Roman" }} variant="h5" component="h5" gutterBottom>Коньяк</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="alcoholPreferences"
                                value={alcohol.RedWine}
                                checked={formData.alcohols.includes(alcohol.RedWine)}
                                onChange={handleChange}
                            />
                        }
                                label={<Typography style={{ fontFamily: "Times New Roman" }} variant="h5" component="h5" gutterBottom>Красное вино</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="alcoholPreferences"
                                value={alcohol.WhiteWine}
                                checked={formData.alcohols.includes(alcohol.WhiteWine)}
                                onChange={handleChange}
                            />
                        }
                                label={<Typography style={{ fontFamily: "Times New Roman" }} variant="h5" component="h5" gutterBottom>Белое вино</Typography>}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="alcoholPreferences"
                                value={alcohol.Vodka}
                                checked={formData.alcohols.includes(alcohol.Vodka)}
                                onChange={handleChange}
                            />
                        }
                                label={<Typography style={{ fontFamily: "Times New Roman" }} variant="h5" component="h5" gutterBottom>Водка</Typography>}
                    />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="alcoholPreferences"
                                        value={alcohol.Moonshine}
                                        checked={formData.alcohols.includes(alcohol.Moonshine)}
                                        onChange={handleChange}
                                    />
                                }
                                label={<Typography style={{ fontFamily: "Times New Roman" }} variant="h5" component="h5" gutterBottom>Самогон</Typography>}
                            />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="alcoholPreferences"
                                value={alcohol.NoAlcohol}
                                checked={formData.alcohols.includes(alcohol.NoAlcohol)}
                                onChange={handleChange}
                            />
                        }
                                label={<Typography style={{ fontFamily: "Times New Roman" }} variant="h5" component="h5" gutterBottom>Безалкогольное</Typography>}
                    />
                </FormGroup>
                </FormControl>
                </div>
                <div className="mt-10 mb-6">
            <Button style={{ borderRadius: 20, backgroundColor: '#455646' }} type="submit" variant="contained" color="primary">Отправить</Button>
                </div>
            </div>
        </form>
    );
};

export default EventForm;
