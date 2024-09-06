// src/components/DraggableItem.jsx
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import PropTypes from 'prop-types';
import { CSS } from '@dnd-kit/utilities';

const DraggableItem = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
        id,
    });

    const style = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
        width:'15rem',
        fontWeight:'600',
        border: '1px solid #ddd',
        padding: '8px',
        borderRadius: '4px',
        backgroundColor: '#fff',
        cursor: 'move',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            {children}
        </div>
    );
};

// Prop validation
DraggableItem.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default DraggableItem;
