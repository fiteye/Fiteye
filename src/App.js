import React, { useState } from "react";

const foodDB = {
  "pates": { calories: 131, protein: 5, carbs: 25, fat: 1.1 },
  "riz": { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  "poulet": { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
};

export default function App() {
  const [view, setView] = useState("home");
  const [log, setLog] = useState([]);
  const [food, setFood] = useState("");
  const [grams, setGrams] = useState(100);
  const [workouts, setWorkouts] = useState([]);
  const [session, setSession] = useState({ name: "", date: "", list: [] });
  const [exercise, setExercise] = useState({ name: "", sets: "", reps: "", weight: "" });

  const goals = { calories: 2200, protein: 150, carbs: 250, fat: 70 };
  const totals = log.reduce((acc, cur) => {
    acc.calories += cur.calories;
    acc.protein += cur.protein;
    acc.carbs += cur.carbs;
    acc.fat += cur.fat;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const addFood = () => {
    const item = foodDB[food.toLowerCase()];
    if (!item) return alert("Aliment inconnu");
    const factor = grams / 100;
    setLog([...log, {
      name: food, grams,
      calories: item.calories * factor,
      protein: item.protein * factor,
      carbs: item.carbs * factor,
      fat: item.fat * factor
    }]);
    setFood("");
    setGrams(100);
  };

  const addExercise = () => {
    setSession({ ...session, list: [...session.list, exercise] });
    setExercise({ name: "", sets: "", reps: "", weight: "" });
  };

  const saveWorkout = () => {
    if (!session.name || !session.date || session.list.length === 0) return alert("Complète la séance");
    setWorkouts([...workouts, session]);
    setSession({ name: "", date: "", list: [] });
  };

  return (
    <div style={{ background: "#121212", color: "white", minHeight: "100vh", padding: 20, fontFamily: "sans-serif" }}>
      <h1>🏋️‍♂️ Fiteye</h1>
      {view === "home" && (
        <div>
          <button onClick={() => setView("nutrition")}>Suivi Nutrition</button>
          <button onClick={() => setView("muscu")} style={{ marginLeft: 10 }}>Suivi Muscu</button>
        </div>
      )}

      {view === "nutrition" && (
        <div>
          <button onClick={() => setView("home")}>← Retour</button>
          <h2>🍽️ Suivi Nutrition</h2>
          <input value={food} onChange={e => setFood(e.target.value)} placeholder="Aliment (ex: riz)" />
          <input type="number" value={grams} onChange={e => setGrams(+e.target.value)} placeholder="Quantité (g)" />
          <button onClick={addFood}>Ajouter</button>
          <div style={{ marginTop: 20 }}>
            <p>Calories : {totals.calories.toFixed(0)} / {goals.calories}</p>
            <p>Protéines : {totals.protein.toFixed(1)}g / {goals.protein}g</p>
            <p>Glucides : {totals.carbs.toFixed(1)}g / {goals.carbs}g</p>
            <p>Lipides : {totals.fat.toFixed(1)}g / {goals.fat}g</p>
          </div>
          <ul>
            {log.map((item, i) => (
              <li key={i}>{item.grams}g {item.name} → {item.calories.toFixed(0)} kcal, {item.protein.toFixed(1)}P / {item.carbs.toFixed(1)}G / {item.fat.toFixed(1)}L</li>
            ))}
          </ul>
        </div>
      )}

      {view === "muscu" && (
        <div>
          <button onClick={() => setView("home")}>← Retour</button>
          <h2>💪 Suivi Muscu</h2>
          <input value={session.name} onChange={e => setSession({ ...session, name: e.target.value })} placeholder="Nom de la séance" />
          <input type="date" value={session.date} onChange={e => setSession({ ...session, date: e.target.value })} />
          <input value={exercise.name} onChange={e => setExercise({ ...exercise, name: e.target.value })} placeholder="Exercice" />
          <input value={exercise.sets} onChange={e => setExercise({ ...exercise, sets: e.target.value })} placeholder="Séries" />
          <input value={exercise.reps} onChange={e => setExercise({ ...exercise, reps: e.target.value })} placeholder="Répétitions" />
          <input value={exercise.weight} onChange={e => setExercise({ ...exercise, weight: e.target.value })} placeholder="Poids (kg)" />
          <button onClick={addExercise}>Ajouter</button>
          <button onClick={saveWorkout}>Sauvegarder la séance</button>
          <div>
            <h3>Historique des séances</h3>
            {workouts.map((w, i) => (
              <div key={i}>
                <strong>{w.date} - {w.name}</strong>
                <ul>
                  {w.list.map((ex, j) => (
                    <li key={j}>{ex.name} : {ex.sets}x{ex.reps} à {ex.weight}kg</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}