import { useContext } from "react";
import { WorkoutCompositionContext } from "../contexts/WorkoutCompositionContext";

export const useWorkoutCompositionContext = () => {
  const context = useContext(WorkoutCompositionContext);
  if (!context) {
    throw new Error(
      "useWorkoutCompositionContext must be used within a WorkoutCompositionProvider"
    );
  }
  return context;
};