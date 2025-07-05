import {
   closestCenter,
   DndContext,
   PointerSensor,
   useSensor,
   useSensors,
} from "@dnd-kit/core";
import { useBarbellLogContext } from "../../../hooks/useBarbellLogContext";

export default function ReorderCompletedExerciseWrapper({ children }) {
   const { barbellLogDispatch } = useBarbellLogContext();

   const sensors = useSensors(useSensor(PointerSensor));

   const handleDragEnd = (event) => {
      const { active, over } = event;

      if (active.id !== over.id) {
         barbellLogDispatch({
            type: "MOVE-EXERCISE",
            payload: {
               dragExerciseOrder: active.id,
               hoverExerciseOrder: over.id,
            },
         });
      }
   };

   return (
      <DndContext
         sensors={sensors}
         onDragEnd={handleDragEnd}
         collisionDetection={closestCenter}
      >
         {children}
      </DndContext>
   );
}
