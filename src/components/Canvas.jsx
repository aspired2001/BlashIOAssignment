// src/components/Canvas.jsx
import React, { useContext } from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { useDroppable } from '@dnd-kit/core';
import DraggableItemOnCanvas from './DraggableItemOnCanvas';

const Canvas = () => {
    const { layout, setLayout } = useContext(LayoutContext);
    const { setNodeRef } = useDroppable({
        id: 'canvas',
    });

    const handleDrop = (event) => {
        const itemId = event.active.id;
        const canvasBounds = event.over.rect; // Get canvas bounds

        const { clientX, clientY } = event.activatorEvent; // Get mouse position
        const newItem = {
            type: itemId,
            x: clientX - canvasBounds.left, // Calculate x relative to canvas
            y: clientY - canvasBounds.top,  // Calculate y relative to canvas
            width: 'auto',
            height: 'auto',
        };

        setLayout([...layout, newItem]);
    };

    const updatePosition = (index, x, y) => {
        // Update the position of an item in the layout state
        const updatedLayout = layout.map((item, i) =>
            i === index ? { ...item, x, y } : item
        );
        setLayout(updatedLayout);
    };

    return (
        <div
            ref={setNodeRef}
            className="canvas bg-white border p-4 h-full relative"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            {layout.map((item, index) => (
                <DraggableItemOnCanvas
                    key={index}
                    item={item}
                    index={index}
                    updatePosition={updatePosition} // Pass the update function
                />
            ))}
        </div>
    );
};

export default Canvas;
