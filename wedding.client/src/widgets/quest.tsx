import React, { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';

interface FormData {
    attending: string;
    partnerName?: string;
    alcoholPreferences: string[];
}

const EventForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        attending: '',
        partnerName: '',
        alcoholPreferences: [],
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                alcoholPreferences: checked
                    ? [...prevData.alcoholPreferences, value]
                    : prevData.alcoholPreferences.filter((item) => item !== value),
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
                <RadioGroup name="attending" value={formData.attending} onChange={handleChange}>
                    <FormControlLabel value="yes" control={<Radio />} label="Да" />
                    <FormControlLabel value="no" control={<Radio />} label="Нет" />
                    <FormControlLabel value="couple" control={<Radio />} label="Приду с парой" />
                </RadioGroup>
            </FormControl>
            {formData.attending === 'couple' && (
                <TextField
                    label="Имя пары"
                    name="partnerName"
                    value={formData.partnerName}
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
                                value="beer"
                                checked={formData.alcoholPreferences.includes('beer')}
                                onChange={handleChange}
                            />
                        }
                        label="Пиво"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="alcoholPreferences"
                                value="wine"
                                checked={formData.alcoholPreferences.includes('wine')}
                                onChange={handleChange}
                            />
                        }
                        label="Вино"
                    />
                    {/* Add more alcohol options as needed */}
                </FormGroup>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
                Отправить
            </Button>
        </form>
    );
};

export default EventForm;
