// ── Types ──────────────────────────────────────────────────────────────────────
export type MethodTag = "airfryer" | "pan" | "blender" | "marinade" | "drink";
export type TypeTag = "chicken" | "tofu" | "snack" | "dessert" | "mainDish" | "sauce";
export type TagKey = MethodTag | TypeTag;

export interface TagMeta { label: string; cls: string; icon?: string; }
export interface Ingredient { name: string; amount: string; }
export interface Recipe {
    tags: TagKey[];
    title: string;
    desc: string;
    time?: string;
    temp?: string;
    servings?: string;
    ingredients: Ingredient[];
    steps: string[];
    tips: string[];
}
