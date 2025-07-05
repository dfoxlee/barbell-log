import { createContext, useReducer } from "react";
import {
   initialCompositionState,
   workoutCompositionReducer,
} from "../reducers/workoutCompositionReducer";

type WorkoutCompositionContextType = {
   workoutCompositionState: typeof initialCompositionState;
   workoutCompositionDispatch: React.Dispatch<any>;
};

const WorkoutCompositionContext =
   createContext<WorkoutCompositionContextType | null>(null);

const WorkoutCompositionProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   const [workoutCompositionState, workoutCompositionDispatch] = useReducer(
      workoutCompositionReducer,
      initialCompositionState
   );

   return (
      <WorkoutCompositionContext.Provider
         value={{ workoutCompositionState, workoutCompositionDispatch }}
      >
         {children}
      </WorkoutCompositionContext.Provider>
   );
};

export { WorkoutCompositionContext, WorkoutCompositionProvider };
