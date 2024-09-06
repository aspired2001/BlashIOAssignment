// src/components/DraggableItemOnCanvas.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDraggable } from '@dnd-kit/core';
// import { CSS } from '@dnd-kit/utilities';

const DraggableItemOnCanvas = ({ item, index, updatePosition }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `canvas-item-${index}`,
    });

    const [dragStyle, setDragStyle] = useState({
        left: item.x || 0,
        top: item.y || 0,
    });

    useEffect(() => {
        if (transform && isDragging) {
            // Dynamically update position based on transform during drag
            setDragStyle({
                left: (item.x || 0) + transform.x,
                top: (item.y || 0) + transform.y,
            });
        }
    }, [transform, isDragging, item.x, item.y]);

    const handleDragEnd = () => {
        // Update the position in the layout state when dragging ends
        updatePosition(index, dragStyle.left, dragStyle.top);
    };

    const style = {
        ...dragStyle,
        position: 'absolute',
        border: '1px solid #ddd',
        padding: '8px',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
        cursor: 'move',
        width: item.width || 'auto',
        height: item.height || 'auto',
    };

    const renderItem = () => {
        switch (item.type) {
            case 'InputBox':
                return <input type="text" placeholder="Input Box" className="p-2 border w-[60%]" />;
            case 'CheckBox':
                return <input type="checkbox" className="p-2" />;
            case 'Button':
                return <button className="p-2 bg-blue-500 text-white rounded">Button</button>;
            case 'Table':
                return (
                    <table className="table-auto border-collapse border border-gray-400 w-[60%]">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Hello!</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Data</td>
                            </tr>
                        </tbody>
                    </table>
                );
            case 'TextLabel':
                return <label className="p-2 text-lg">Username</label>;
            default:
                return null;
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onMouseUp={handleDragEnd} // Trigger update when drag ends
        >
            {renderItem()}
        </div>
    );
};

DraggableItemOnCanvas.propTypes = {
    item: PropTypes.shape({
        type: PropTypes.string.isRequired,
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.string,
        height: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    updatePosition: PropTypes.func.isRequired, // New prop to update position
};

export default DraggableItemOnCanvas;
