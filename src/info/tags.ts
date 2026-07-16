import { TagKey, TagMeta, TypeTag, MethodTag } from "../interfaces/interfaces";
// ── Tag metadata ───────────────────────────────────────────────────────────────
export const TAG_META: Record<TagKey, TagMeta> = {
    airfryer: { label: "Аэрогриль", cls: "tag-airfryer", icon: "🌬️" },
    pan: { label: "Сковорода", cls: "tag-pan", icon: "🔥" },
    blender: { label: "Блендер", cls: "tag-blender" },
    marinade: { label: "Маринад", cls: "tag-marinade" },
    drink: { label: "Напиток", cls: "tag-drink", icon: "☕" },
    chicken: { label: "Курица", cls: "tag-chicken" },
    tofu: { label: "Тофу", cls: "tag-tofu" },
    snack: { label: "Закуска", cls: "tag-snack" },
    dessert: { label: "Десерт", cls: "tag-dessert" },
    mainDish: { label: "Основное", cls: "tag-mainDish" },
    sauce: { label: "Соус/Маринад", cls: "tag-sauce" },
};

export const METHOD_TAGS: MethodTag[] = ["airfryer", "pan", "blender", "marinade", "drink"];
export const TYPE_TAGS: TypeTag[] = ["chicken", "tofu", "snack", "dessert", "mainDish", "sauce"];