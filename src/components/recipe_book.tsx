import React, { useState } from "react";
import { Recipe, TagKey } from "../interfaces/interfaces";
import { RECIPES } from "../info/recipe_data";
import { METHOD_TAGS, TAG_META, TYPE_TAGS } from "../info/tags";
import { tagStyles } from "../styles/tag";


const TagBadge = ({ tag }: { tag: TagKey }) => {
    const m = TAG_META[tag];
    const style: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        fontSize: 11,
        fontWeight: 500,
        padding: "3px 9px",
        borderRadius: 99,
        ...tagStyles[m.cls],
    };

    return (
        <span style={style}>
            {m.icon && <span>{m.icon} </span>}
            {m.label}
        </span>
    );
};

const FilterBtn = ({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) => {
    return (
        <button
            onClick={onClick}
            style={{
                fontSize: 13,
                padding: "5px 13px",
                borderRadius: 99,
                border: active ? "1px solid #888" : "1px solid #ddd",
                background: active ? "#f0f0f0" : "transparent",
                color: active ? "#111" : "#666",
                fontWeight: active ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.15s",
            }}
        >
            {label}
        </button>
    );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            style={{
                fontSize: 12,
                fontWeight: 500,
                color: "#888",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin: "1.25rem 0 0.75rem",
            }}
        >
            {children}
        </div>
    );
};

const RecipeDetail = ({ recipe, onBack }: { recipe: Recipe; onBack: () => void }) => {
    return (
        <div>
            <button
                onClick={onBack}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 14,
                    color: "#666",
                    cursor: "pointer",
                    padding: "6px 0",
                    marginBottom: 16,
                    border: "none",
                    background: "none",
                }}
            >
                ← Все рецепты
            </button>

            <div style={{ border: "0.5px solid #e0e0e0", borderRadius: 12, padding: "1.5rem" }}>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
                    {recipe.tags.map((t) => (
                        <TagBadge key={t} tag={t} />
                    ))}
                </div>

                <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 8 }}>{recipe.title}</div>

                <div
                    style={{
                        display: "flex",
                        gap: 16,
                        flexWrap: "wrap",
                        marginBottom: "1.25rem",
                        paddingBottom: "1.25rem",
                        borderBottom: "0.5px solid #e0e0e0",
                    }}
                >
                    {recipe.time && <span style={{ fontSize: 12, color: "#666" }}>⏱ {recipe.time}</span>}
                    {recipe.temp && <span style={{ fontSize: 12, color: "#666" }}>🌡 {recipe.temp}</span>}
                    {recipe.servings && <span style={{ fontSize: 12, color: "#666" }}>👤 {recipe.servings}</span>}
                </div>

                <SectionLabel>Ингредиенты</SectionLabel>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 6 }}>
                    {recipe.ingredients.map((ing, i) => (
                        <div
                            key={i}
                            style={{ background: "#f7f7f7", borderRadius: 8, padding: "8px 12px", fontSize: 13 }}
                        >
                            <div style={{ fontSize: 12, color: "#888" }}>{ing.amount}</div>
                            {ing.name}
                        </div>
                    ))}
                </div>

                <SectionLabel>Приготовление</SectionLabel>
                <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, padding: 0 }}>
                    {recipe.steps.map((s, i) => (
                        <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                            <div
                                style={{
                                    minWidth: 24,
                                    height: 24,
                                    background: "#f0f0f0",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 12,
                                    fontWeight: 500,
                                    color: "#666",
                                    flexShrink: 0,
                                    marginTop: 1,
                                }}
                            >
                                {i + 1}
                            </div>
                            <div style={{ fontSize: 14, lineHeight: 1.6 }}>{s}</div>
                        </li>
                    ))}
                </ol>

                <SectionLabel>Советы</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {recipe.tips.map((t, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "#666", lineHeight: 1.5 }}>
                            <span style={{ flexShrink: 0 }}>—</span>
                            {t}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function RecipeBook() {
    const [activeMethod, setActiveMethod] = useState<string>("all");
    const [activeType, setActiveType] = useState<string>("all");
    const [openId, setOpenId] = useState<string | null>(null);

    const filtered = Object.entries(RECIPES).filter(([, r]) => {
        const okMethod = activeMethod === "all" || r.tags.includes(activeMethod as TagKey);
        const okType = activeType === "all" || r.tags.includes(activeType as TagKey);
        return okMethod && okType;
    });

    if (openId && RECIPES[openId]) {
        return (
            <div style={{ fontFamily: "system-ui,sans-serif", maxWidth: 800, margin: "0 auto", padding: "0 1rem 2rem" }}>
                <RecipeDetail recipe={RECIPES[openId]} onBack={() => setOpenId(null)} />
            </div>
        );
    }

    return (
        <div style={{ fontFamily: "system-ui,sans-serif", maxWidth: 900, margin: "0 auto", padding: "0 1rem 2rem" }}>
            <div style={{ padding: "1.5rem 0 1rem", borderBottom: "0.5px solid #e0e0e0", marginBottom: "1.25rem" }}>
                <div style={{ fontSize: 22, fontWeight: 500 }}>📖 Мой кулинарный сборник</div>
                <div style={{ fontSize: 14, color: "#888", marginTop: 4 }}>
                    {Object.keys(RECIPES).length} рецептов · показано {filtered.length}
                </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
                <div
                    style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: "#888",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 6,
                    }}
                >
                    Способ приготовления
                </div>
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                    <FilterBtn label="Все" active={activeMethod === "all"} onClick={() => setActiveMethod("all")} />
                    {METHOD_TAGS.map((t) => (
                        <FilterBtn
                            key={t}
                            label={TAG_META[t].label}
                            active={activeMethod === t}
                            onClick={() => setActiveMethod(t)}
                        />
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
                <div
                    style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: "#888",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 6,
                    }}
                >
                    Тип блюда / Продукт
                </div>
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                    <FilterBtn label="Все" active={activeType === "all"} onClick={() => setActiveType("all")} />
                    {TYPE_TAGS.map((t) => (
                        <FilterBtn
                            key={t}
                            label={TAG_META[t].label}
                            active={activeType === t}
                            onClick={() => setActiveType(t)}
                        />
                    ))}
                </div>
            </div>

            {filtered.length === 0 ? (
                <div style={{ fontSize: 14, color: "#888", padding: "2rem 0" }}>Ничего не найдено.Попробуйте другой фильтр.</div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 11 }}>
                    {filtered.map(([id, r]) => (
                        <div
                            key={id}
                            onClick={() => setOpenId(id)}
                            style={{
                                background: "#fff",
                                border: "0.5px solid #e8e8e8",
                                borderRadius: 12,
                                padding: "1rem 1.2rem",
                                cursor: "pointer",
                                transition: "border-color 0.15s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#bbb")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e8e8e8")}
                        >
                            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 9 }}>
                                {r.tags.map((t) => (
                                    <TagBadge key={t} tag={t} />
                                ))}
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>{r.title}</div>
                            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.5 }}>{r.desc}</div>
                            <div
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    marginTop: 11,
                                    paddingTop: 9,
                                    borderTop: "0.5px solid #f0f0f0",
                                    flexWrap: "wrap",
                                }}
                            >
                                {r.time && <span style={{ fontSize: 12, color: "#888" }}>⏱ {r.time}</span>}
                                {r.temp && <span style={{ fontSize: 12, color: "#888" }}>🌡 {r.temp}</span>}
                                {r.servings && <span style={{ fontSize: 12, color: "#888" }}>👤 {r.servings}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

