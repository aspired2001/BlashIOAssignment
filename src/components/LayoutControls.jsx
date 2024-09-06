// src/components/LayoutControls.jsx
import { useContext } from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { saveLayout, loadLayout } from '../services/firebase';
import { useNavigate } from 'react-router-dom'; // Add useNavigate

const LayoutControls = () => {
    const { layoutName, setLayoutName, layout, setLayout } = useContext(LayoutContext); 
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSave = async () => {
        const jsonLayout = JSON.stringify(layout);
        const newLayoutRef = await saveLayout({ name: layoutName, layout: jsonLayout });
        alert('Layout saved successfully!');
        return newLayoutRef.key; // Return the key of the saved layout
    };

    const handleLoad = async () => {
        const loadedLayout = await loadLayout(layoutName);
        if (loadedLayout) setLayout(JSON.parse(loadedLayout.layout)); // Use setLayout to update the layout
    };
    const handlePublish = async () => {
        const layoutId = await handleSave(); // Save layout and get the ID
        navigate(`/published/${layoutId}`); // Redirect to published page with layout ID
    };

    return (
        <div className="space-x-4">
            <input
                type="text"
                value={layoutName}
                onChange={(e) => setLayoutName(e.target.value)}
                placeholder="Layout Name"
                className="border px-2 py-1"
            />
            <button onClick={handleSave} className="btn">Save Layout</button>
            <button onClick={handleLoad} className="btn">Load Layout</button>
            <button onClick={handlePublish} className="btn">Publish</button>
        </div>
    );
};

export default LayoutControls;
