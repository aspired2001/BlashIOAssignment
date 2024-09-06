// src/pages/PublishedPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadLayout } from '../services/firebase';

const PublishedPage = () => {
    const { layoutId } = useParams(); // Fetch layout ID from URL
    const [layout, setLayout] = useState([]); // Store the loaded layout

    useEffect(() => {
        const fetchLayout = async () => {
            const loadedLayout = await loadLayout(layoutId); // Fetch layout using ID
            if (loadedLayout) {
                const parsedLayout = JSON.parse(loadedLayout.layout); // Parse the JSON layout
                setLayout(parsedLayout); // Set the parsed layout to state
            }
        };
        fetchLayout(); // Trigger layout fetch when component loads
    }, [layoutId]);

    // Function to render layout elements with absolute positioning
    const renderLayoutItem = (item, index) => {
        const style = {
            position: 'absolute',
            left: item.x || 0,
            top: item.y || 0,
            width: item.width || 'auto',
            height: item.height || 'auto',
            // border: 'none', // Remove unnecessary borders
            // backgroundColor: 'transparent', // Ensure transparency
        };

        switch (item.type) {
            case 'InputBox':
                return <input type="text" key={index} style={style} placeholder="Input Box" readOnly className="p-2 border rounded-md w-full" />;
            case 'CheckBox':
                return <input type="checkbox" key={index} style={style} className="p-2" />;
            case 'Button':
                return <button key={index} style={style} className="p-2 bg-blue-500 text-white rounded">Button</button>;
            case 'TextLabel':
                return <label key={index} style={style} className="p-2 text-lg">Text Label</label>;
            case 'Table':
                return (
                    <table key={index} style={style} className="table-auto border-collapse border border-gray-400 w-full">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Header</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Data</td>
                            </tr>
                        </tbody>
                    </table>
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative p-4" style={{ position: 'relative', height: '100vh' }}>
            {layout.length > 0 ? (
                layout.map((item, index) => (
                    // Directly render the layout item without an extra wrapper
                    renderLayoutItem(item, index)
                ))
            ) : (
                <p>Loading layout...</p> // Show loading message
            )}
        </div>
    );
};

export default PublishedPage;
