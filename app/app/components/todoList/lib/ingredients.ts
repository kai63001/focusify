export interface Ingredient {
    icon: string;
    label: string;
  }
  
  export const allIngredients = [
    { icon: "🍅", label: "Description" },
    { icon: "🥬", label: "Settings" },
    { icon: "🧀", label: "Cheese" },
    { icon: "🥕", label: "Carrot" },
    { icon: "🍌", label: "Banana" },
    { icon: "🫐", label: "Blueberries" },
    { icon: "🥂", label: "Champers?" }
  ];
  
  const [description, settings ] = allIngredients;
  export const initialTabs = [description, settings];
  
  export function getNextIngredient(
    ingredients: Ingredient[]
  ): Ingredient | undefined {
    const existing = new Set(ingredients);
    return allIngredients.find((ingredient) => !existing.has(ingredient));
  }
  