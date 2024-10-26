import React, { useState } from "react";
import { Brain } from "lucide-react";
import { TabType } from "./types/quiz";
import { useQuizStorage } from "./hooks/useQuizStorage";
import { QuizForm } from "./components/QuizForm";
import { EntryList } from "./components/EntryList";
import { TabBar } from "./components/TabBar";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("form");
  const { successEntries, errorEntries, addEntry, updateConcept } =
    useQuizStorage();

  // Función para descargar datos del localStorage en formato JSON
  const downloadQuiz = () => {
    const data = localStorage.getItem("quiz_entries") || "[]";
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "quiz_entries.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Función para cargar datos desde un archivo JSON al localStorage
  const uploadQuiz = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        localStorage.setItem("quiz_entries", JSON.stringify(json));
        alert("Datos cargados exitosamente en localStorage");
        window.location.reload(); // Refresca para ver los cambios reflejados
      } catch (error) {
        console.log(error);
        alert("Error al cargar el archivo JSON");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Brain className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Quiz Tracker</h1>
        </div>

        <div className="flex justify-end gap-4 mb-4">
          <button
            onClick={downloadQuiz}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
          >
            Descargar JSON
          </button>
          <input
            type="file"
            accept="application/json"
            onChange={uploadQuiz}
            className="hidden"
            id="upload-json"
          />
          <label
            htmlFor="upload-json"
            className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-500"
          >
            Cargar JSON
          </label>
        </div>

        <TabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          successCount={successEntries.length}
          errorCount={errorEntries.length}
        />

        {activeTab === "form" && <QuizForm onSubmit={addEntry} />}
        {activeTab === "success" && (
          <EntryList
            entries={successEntries}
            type="success"
            onUpdateConcept={updateConcept}
          />
        )}
        {activeTab === "errors" && (
          <EntryList
            entries={errorEntries}
            type="errors"
            onUpdateConcept={updateConcept}
          />
        )}
      </div>
    </div>
  );
}

export default App;
