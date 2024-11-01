export function removeDuplicateQuestions(...arrays) {
  // Combinamos todos los arrays en uno solo
  const combinedArray = arrays.flat();

  // Usamos un Map para almacenar las preguntas únicas
  const uniqueQuestions = new Map();

  combinedArray.forEach((item) => {
    if (!uniqueQuestions.has(item.question)) {
      uniqueQuestions.set(item.question, item); // Almacenamos solo una vez la pregunta
    }
  });

  // Devolvemos un array con los valores únicos del Map
  return Array.from(uniqueQuestions.values());
}
