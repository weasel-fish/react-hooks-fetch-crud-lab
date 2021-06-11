import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(resp=>resp.json())
    .then(data => setQuestions(data))
  }, [])

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
    const idx = questions.findIndex(q => q.id === id)

    const newQs = [...questions]
    newQs.splice(idx, 1)

    setQuestions(newQs)
    })
  }

  function handleUpdate (id, correct) {
    console.log(id)
    console.log(correct)

    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        'correctIndex': correct
      })})
      .then(resp => resp.json())
      .then(console.log)

      setQuestions(questions)
  }
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(q => <QuestionItem handleUpdate={handleUpdate} handleDelete={handleDelete} key={q.id} question={q}/>)}</ul>
    </section>
  );
}

export default QuestionList;
