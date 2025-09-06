import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import FruitItem from "./FruitItem";

export default function FruitList({ droppableId, fruits, styles, emptyText }) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            flex: 1,
            padding: "10px",
            background: snapshot.isDraggingOver
              ? styles.activeBg
              : styles.normalBg,
            minHeight: "300px",
            minWidth: "200px",
            borderRadius: "8px",
            border: `2px dashed ${styles.border}`,
            color: "black",
          }}
        >
          <h3>{styles.title}</h3>
          {fruits.length === 0 ? (
            <div>{emptyText}</div>
          ) : (
            fruits.map((fruit, index) => (
              <FruitItem
                key={fruit.id}
                fruit={fruit}
                index={index}
                dragStyles={styles.item}
              />
            ))
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
