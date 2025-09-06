import React from "react";
import { Draggable } from "@hello-pangea/dnd";

export default function FruitItem({ fruit, index, dragStyles }) {
  return (
    <Draggable draggableId={fruit.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            padding: "10px",
            marginBottom: "8px",
            background: snapshot.isDragging
              ? dragStyles.activeBg
              : dragStyles.normalBg,
            border: `1px solid ${dragStyles.border}`,
            borderRadius: "5px",
            fontWeight: "bold",
            color: dragStyles.textColor,
            ...provided.draggableProps.style,
          }}
        >
          {fruit.name}
        </div>
      )}
    </Draggable>
  );
}
