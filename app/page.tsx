"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      title: "AI Study Buddy",
      description: "Help students learn with AI",
    },
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Inside component, after useState declarations:
  useEffect(() => {
    fetch("/api/ideas")
      .then((res) => res.json())
      .then((data) => setIdeas(data));
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch("/api/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    const newIdea = await response.json();
    setIdeas([...ideas, newIdea]);
    setTitle("");
    setDescription("");
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Hackathon Idea Board</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-6 border rounded-lg">
        <h2 className="text-2xl mb-4">Submit an Idea</h2>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          rows={3}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Idea
        </button>
      </form>

      {/* Ideas List */}
      <div>
        <h2 className="text-2xl mb-4">Ideas ({ideas.length})</h2>
        {ideas.map((idea) => (
          <div key={idea.id} className="border p-4 rounded mb-4">
            <h3 className="text-xl font-bold">{idea.title}</h3>
            <p className="text-gray-600">{idea.description}</p >
          </div>
        ))}
      </div>
    </main>
  );
}