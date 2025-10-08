export interface NutrientInfo {
   nutrientId: number;
   nutrientName: string;
   value: number;
   unitName: string;
}

export interface FoodNutrient {
   nutrientId: number;
   nutrientName: string;
   nutritientNumber: string;
   unitName: string;
   value: number;
}

export interface UsdaFoodObject {
   fdcId: number;
   description: string;
   dataType: string;
   brandOwner: string;
   brandName: string;
   servingSizeUnit: string | null;
   servingSize: number | null;
   foodNutrients: FoodNutrient[];
}

export interface NutritionInfo {
   fdcId: number;
   dateRecorded?: Date | string;
   dataType: string;
   brandName: string;
   servingSize: string;
   description: string;
   quantity: number;
   calories: number;
   totalFat: number;
   protein: number;
   carbohydrates: number;
   addedSugar: number;
   totalFiber: number;
   totalSugar: number;
   cholesterol: number;
   sodium: number;
}

export interface GroupedNutritionInfo {
   dateGroup: Date | string;
   totalAddedSugar: number;
   totalCalories: number;
   totalCarbohydrates: number;
   totalCholesterol: number;
   totalProtein: number;
   totalQuantity: number;
   totalSodium: number;
   totalFiber: number;
   totalSugar: number;
}
