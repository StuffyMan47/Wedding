import React, { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { alcohol } from '../entities/enums/alcohol';

interface FormData {
    guestId: number;
    coupleName?: string;
    isCome?: boolean;
    alcohols: alcohol[];
}

interface GuestFormProps {
    guestId: number;
}

const EventForm: React.FC<GuestFormProps> = ({ guestId }) => {
    const [formData, setFormData] = useState<FormData>({
        guestId: guestId,
        coupleName: '',
        alcohols: [],
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                alcoholPreferences: checked
                    ? [...prevData.alcohols, value]
                    : prevData.alcohols.filter((item) => item.toString() !== value),
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
            <FormControl component="fieldset">
                <FormLabel component="legend">Вы придетё?</FormLabel>
                <RadioGroup name="attending" value={formData.isCome} onChange={handleChange}>
                    <FormControlLabel value={true} control={<Radio />} label="Да" />
                    <FormControlLabel value={false} control={<Radio />} label="Нет" />
                    <FormControlLabel value={true} control={<Radio />} label="Приду с парой" />
                </RadioGroup>
            </FormControl>
            {formData.isCome && (
                <TextField
                    label="Имя пары"
                    name="partnerName"
                    value={formData.coupleName}
                    onChange={handleChange}
                />
            )}
            <FormControl component="fieldset">
                <FormLabel component="legend">Какой алкоголь предпочитаете?</FormLabel>
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
                        label="Шампанское"
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
                        label="Коньяк"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="alcoholPreferences"
                                value={alcohol.DryRedWine}
                                checked={formData.alcohols.includes(alcohol.DryRedWine)}
                                onChange={handleChange}
                            />
                        }
                        label="Красное сухое вино"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="alcoholPreferences"
                                value={alcohol.DryWhiteWine}
                                checked={formData.alcohols.includes(alcohol.DryWhiteWine)}
                                onChange={handleChange}
                            />
                        }
                        label="Белое сухое вино"
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
                        label="Красное полусладкое вино"
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
                        label="Белое полусладкое вино"
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
                        label="Водка"
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
                        label="Безалкогольное"
                    />
                </FormGroup>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
                Отправить
            </Button>
        </form>
    );
};

export default EventForm;
