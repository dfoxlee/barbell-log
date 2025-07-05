import {
   closestCenter,
   DndContext,
   PointerSensor,
   useSensor,
   useSensors,
} from "@dnd-kit/core";
import { useWorkoutCompositionContext } from "../../../hooks/useWorkoutCompositionContext";

export default function ReorderExerciseWrapper({ children }) {
   const { workoutCompositionDispatch } = useWorkoutCompositionContext();

   const sensors = useSensors(useSensor(PointerSensor));

   const handleDragEnd = (event) => {
      const { active, over } = event;

      if (active.id !== over.id) {
         workoutCompositionDispatch({
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
