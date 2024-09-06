// src/pages/HomePage.jsx
import React, { useContext } from 'react';
import { DndContext } from '@dnd-kit/core';
import DraggableItem from '../components/DraggableItem';
import LayoutControls from '../components/LayoutControls';
import Canvas from '../components/Canvas';
import { LayoutContext } from '../context/LayoutContext';

const HomePage = () => {
    const { layout, setLayout } = useContext(LayoutContext);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && over.id === 'canvas') {
            const newItem = {
                type: active.id,
                props: {}, // Custom properties can be added here later
            };
            setLayout([...layout, newItem]);
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex h-screen">
                {/* Left Part */}
                <div className="w-1/4 bg-blue-600 p-4 space-y-4 max-lg:hidden">
                    <DraggableItem id="InputBox">Input Box</DraggableItem>
                    <DraggableItem id="CheckBox">Check Box</DraggableItem>
                    <DraggableItem id="Button">Button</DraggableItem>
                    <DraggableItem id="Table">Table</DraggableItem>
                    <DraggableItem id="TextLabel">Text Label</DraggableItem>
                </div>

                {/* Right Part */}
                <div className="w-3/4 flex flex-col p-4">
                    {/* Upper Part */}
                    <div className="flex-none space-x-4 mb-4">
                        <LayoutControls />
                    </div>

                    {/* Lower Part */}
                    <div className="flex-grow bg-white border p-4">
                        <Canvas />
                    </div>
                </div>
            </div>
        </DndContext>
    );
};

export default HomePage;
