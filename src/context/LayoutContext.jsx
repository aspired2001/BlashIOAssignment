// src/context/LayoutContext.jsx
import React, { createContext, useState } from 'react';

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [layout, setLayout] = useState([]);
    const [layoutName, setLayoutName] = useState('');

    return (
        <LayoutContext.Provider value={{ layout, setLayout, layoutName, setLayoutName }}>
            {children}
        </LayoutContext.Provider>
    );
};