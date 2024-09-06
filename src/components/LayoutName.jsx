// src/components/LayoutName.js
import React, { useContext } from 'react';
import { LayoutContext } from '../context/LayoutContext';

const LayoutName = () => {
    const { layoutName, setLayoutName } = useContext(LayoutContext);

    return (
        <input
            type="text"
            value={layoutName}
            onChange={(e) => setLayoutName(e.target.value)}
            placeholder="Enter Layout Name"
            className="border px-2 py-1"
        />
    );
};

export default LayoutName;