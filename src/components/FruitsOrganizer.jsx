import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const move = (sourceList, destList, source, destination) => {
    const src = Array.from(sourceList);
    const dst = Array.from(destList);
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

//   return (
//     <div style={{ padding: "20px", background: "#f9fafb" }}>
//       <button
//         onClick={resetLists}
//         data-testid="reset-button"
//         style={{
//           marginBottom: "20px",
//           padding: "8px 16px",
//           background: "#2563eb",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer"
//         }}
//       >
//         Reset Lists
//       </button>

//       <DragDropContext onDragEnd={onDragEnd}>
//         <div style={{ display: "flex", gap: "20px" }}>
//           {/* Available Fruits */}
//           <Droppable droppableId="available">
//             {(provided, snapshot) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 data-testid="available-column"
//                 style={{
//                   flex: 1,
//                   padding: "10px",
//                   background: snapshot.isDraggingOver ? "#bbf7d0" : "#dcfce7",
//                   minHeight: "300px",
//                   borderRadius: "8px",
//                   border: "2px dashed #16a34a",
//                   color:"black"
//                 }}
//               >
//                 <h3>Available Fruits</h3>
//                 {available.length === 0 ? (
//                   <div data-testid="available-empty">No fruits here</div>
//                 ) : (
//                   available.map((fruit, index) => (
//                     <Draggable
//                       key={fruit.id}
//                       draggableId={fruit.id}
//                       index={index}
//                     >
//                       {(provided, snapshot) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           data-testid={`item-${fruit.id}`}
//                           style={{
//                             padding: "10px",
//                             marginBottom: "8px",
//                             background: snapshot.isDragging
//                               ? "#fcd34d" // Yellow while dragging
//                               : "#fef3c7", // Light yellow normally
//                             border: "1px solid #d97706",
//                             borderRadius: "5px",
//                             fontWeight: "bold",
//                             color: "#78350f",
//                             ...provided.draggableProps.style
//                           }}
//                         >
//                           {fruit.name}
//                         </div>
//                       )}
//                     </Draggable>
//                   ))
//                 )}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>

//           {/* Dropped Fruits */}
//           <Droppable droppableId="dropped">
//             {(provided, snapshot) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 data-testid="dropped-column"
//                 style={{
//                   flex: 1,
//                   padding: "10px",
//                   background: snapshot.isDraggingOver ? "#fecaca" : "#fee2e2",
//                   minHeight: "300px",
//                   borderRadius: "8px",
//                   border: "2px dashed #dc2626"
//                 }}
//               >
//                 <h3>Dropped Fruits</h3>
//                 {dropped.length === 0 ? (
//                   <div data-testid="dropped-empty">Drop fruits here</div>
//                 ) : (
//                   dropped.map((fruit, index) => (
//                     <Draggable
//                       key={fruit.id}
//                       draggableId={fruit.id}
//                       index={index}
//                     >
//                       {(provided, snapshot) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           data-testid={`item-${fruit.id}`}
//                           style={{
//                             padding: "10px",
//                             marginBottom: "8px",
//                             background: snapshot.isDragging
//                               ? "#93c5fd" // Blue while dragging
//                               : "#dbeafe", // Light blue normally
//                             border: "1px solid #2563eb",
//                             borderRadius: "5px",
//                             fontWeight: "bold",
//                             color: "#1e3a8a",
//                             ...provided.draggableProps.style
//                           }}
//                         >
//                           {fruit.name}
//                         </div>
//                       )}
//                     </Draggable>
//                   ))
//                 )}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </div>
//       </DragDropContext>
//     </div>
//   );
return (
  <div
    style={{
     width: "100vw",
height: "100vh",
      background: "#f9fafb",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center", // centers vertically
    }}
  >
    <button
      onClick={resetLists}
      data-testid="reset-button"
      style={{
        marginBottom: "20px",
        padding: "8px 16px",
        background: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Reset Lists
    </button>

    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Available Fruits */}
        <Droppable droppableId="available">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              data-testid="available-column"
              style={{
                flex: 1,
                padding: "10px",
                background: snapshot.isDraggingOver ? "#bbf7d0" : "#dcfce7",
                minHeight: "300px",
                minWidth: "200px",
                borderRadius: "8px",
                border: "2px dashed #16a34a",
                color: "black",
              }}
            >
              <h3>Available Fruits</h3>
              {available.length === 0 ? (
                <div data-testid="available-empty">No fruits here</div>
              ) : (
                available.map((fruit, index) => (
                  <Draggable
                    key={fruit.id}
                    draggableId={fruit.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        data-testid={`item-${fruit.id}`}
                        style={{
                          padding: "10px",
                          marginBottom: "8px",
                          background: snapshot.isDragging
                            ? "#fcd34d"
                            : "#fef3c7",
                          border: "1px solid #d97706",
                          borderRadius: "5px",
                          fontWeight: "bold",
                          color: "#78350f",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {fruit.name}
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Dropped Fruits */}
        <Droppable droppableId="dropped">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              data-testid="dropped-column"
              style={{
                flex: 1,
                padding: "10px",
                background: snapshot.isDraggingOver ? "#fecaca" : "#fee2e2",
                minHeight: "300px",
                minWidth: "200px",
                borderRadius: "8px",
                border: "2px dashed #dc2626",
                color:"black"
              }}
            >
              <h3>Dropped Fruits</h3>
              {dropped.length === 0 ? (
                <div data-testid="dropped-empty">Drop fruits here</div>
              ) : (
                dropped.map((fruit, index) => (
                  <Draggable
                    key={fruit.id}
                    draggableId={fruit.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        data-testid={`item-${fruit.id}`}
                        style={{
                          padding: "10px",
                          marginBottom: "8px",
                          background: snapshot.isDragging
                            ? "#93c5fd"
                            : "#dbeafe",
                          border: "1px solid #2563eb",
                          borderRadius: "5px",
                          fontWeight: "bold",
                          color: "#1e3a8a",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {fruit.name}
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  </div>
);

}
