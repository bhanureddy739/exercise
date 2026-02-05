import React, { useState, useEffect } from "react";
import ClassWelcome from "./welcome";
import ActivitySummary from "./summary";



export default function FormPage() {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    age: "",
    goal: "",
    activities: [
      { exercise: "", reps: "" }
    ]
  });

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem("studentActivity");
    if (saved) {
      setForm(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleActivityChange = (index, field, value) => {
    const updated = [...form.activities];
    updated[index][field] = value;
    setForm({ ...form, activities: updated });
  };

  const addActivity = () => {
    setForm({
      ...form,
      activities: [...form.activities, { exercise: "", reps: "" }]
    });
  };

  const removeActivity = (index) => {
    const updated = form.activities.filter((_, i) => i !== index);
    setForm({ ...form, activities: updated });
  };

  const handleSubmit = () => {
    localStorage.setItem("studentActivity", JSON.stringify(form));
    setSubmitted(true);
  };

  return (
    <div className="form-page">
      <h2>📝 Student Activity Log</h2>

      {!submitted ? (
        <div className="form-card">

          <h3>👤 Student Details</h3>

          <input
            name="name"
            placeholder="Student name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
          />

          <select name="goal" value={form.goal} onChange={handleChange}>
            <option value="">Select fitness goal</option>
            <option value="Strength">💪 Strength</option>
            <option value="Endurance">🏃 Endurance</option>
            <option value="Flexibility">🤸 Flexibility</option>
            <option value="General Fitness">❤️ General Fitness</option>
          </select>

          <h3>🏃 What exercises did you do today?</h3>

          {form.activities.map((act, index) => (
            <div key={index} className="activity-row">
              <input
                placeholder="Exercise name (e.g. Jumping Jacks)"
                value={act.exercise}
                onChange={(e) =>
                  handleActivityChange(index, "exercise", e.target.value)
                }
              />

              <input
                type="number"
                placeholder="Reps / seconds"
                value={act.reps}
                onChange={(e) =>
                  handleActivityChange(index, "reps", e.target.value)
                }
              />

              {form.activities.length > 1 && (
                <button
                  className="remove"
                  onClick={() => removeActivity(index)}
                >
                  ❌
                </button>
              )}
            </div>
          ))}

          <button className="add" onClick={addActivity}>
            ➕ Add Another Exercise
          </button>

          <button
            className="submit"
            disabled={!form.name || !form.age || !form.goal}
            onClick={handleSubmit}
          >
            Save Activity ✅
          </button>
        </div>
      ) : (
        <div className="success-card">
          <h2>🎉 Well Done, {form.name}!</h2>

          <p>Age: {form.age}</p>
          <p>Goal: {form.goal}</p>

          <hr />

          <h3>📊 Today’s Activities</h3>

          {form.activities.map((act, index) => (
            <p key={index}>
              🏋️ {act.exercise || "Exercise"} — {act.reps || 0}
            </p>
          ))}

          <button onClick={() => setSubmitted(false)}>
            Edit Again ✏️
          </button>
        </div>
      )}
    </div>
  );
}
