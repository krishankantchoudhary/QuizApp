export const fetchQuizData = async () => {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
      if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
      
      const data = await response.json();
      console.log("✅ Fetched Data:", data);
  
      // Add options field
      const formattedQuestions = data.results.map((question) => {
        const allOptions = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];
        
        // Shuffle options
        const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
  
        return {
          ...question,
          options: shuffledOptions,
        };
      });
  
      return formattedQuestions;
    } catch (error) {
      console.error("❌ Error fetching quiz data:", error);
      return [];
    }
  };
  