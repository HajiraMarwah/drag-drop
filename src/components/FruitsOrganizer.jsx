import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import FruitList from "./FruitList";

const initialFruits = [
  { id: "1", name: "Apple" },
  { id: "2", name: "Banana" },
  { id: "3", name: "Orange" },
  { id: "4", name: "Mango" }
];

export default function FruitsOrganizer() {
  const [available, setAvailable] = useState(initialFruits);
  const [dropped, setDropped] = useState([]);

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const move = (sourceList, destList, source, destination) => {
    const src = [...sourceList];
    const dst = [...destList];
    const [removed] = src.splice(source.index, 1);
    dst.splice(destination.index, 0, removed);
    return source.droppableId === "available"
      ? { available: src, dropped: dst }
      : { available: dst, dropped: src };
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "available") {
        setAvailable(reorder(available, source.index, destination.index));
      } else {
        setDropped(reorder(dropped, source.index, destination.index));
      }
    } else {
      const moveResult = move(
        source.droppableId === "available" ? available : dropped,
        source.droppableId === "available" ? dropped : available,
        source,
        destination
      );
      setAvailable(moveResult.available);
      setDropped(moveResult.dropped);
    }
  };

  const resetLists = () => {
    setAvailable(initialFruits);
    setDropped([]);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <button
        onClick={resetLists}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Reset Lists
      </button>

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          <FruitList
            droppableId="available"
            fruits={available}
            emptyText="No fruits here"
            styles={{
              title: "Available Fruits",
              normalBg: "#dcfce7",
              activeBg: "#bbf7d0",
              border: "#16a34a",
              item: {
                normalBg: "#fef3c7",
                activeBg: "#fcd34d",
                border: "#d97706",
                textColor: "#78350f"
              }
            }}
          />

          <FruitList
            droppableId="dropped"
            fruits={dropped}
            emptyText="Drop fruits here"
            styles={{
              title: "Dropped Fruits",
              normalBg: "#fee2e2",
              activeBg: "#fecaca",
              border: "#dc2626",
              item: {
                normalBg: "#dbeafe",
                activeBg: "#93c5fd",
                border: "#2563eb",
                textColor: "#1e3a8a"
              }
            }}
          />
        </div>
      </DragDropContext>
    </div>
  );
}
