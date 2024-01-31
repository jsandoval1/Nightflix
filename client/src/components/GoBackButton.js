import React from 'react';
import Button from '@mui/material/Button'; // Import the Button component from Material-UI
import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Button variant="contained" onClick={handleGoBack}>
            Go Back
        </Button>
    );
};

export default GoBackButton;
