import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  console.log(filterName);

  const handleSubmit = (e) => {
    e.preventDefault();
    // add new person to phonebook
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons((prevState) => [
        ...prevState,
        { name: newName, number: newNumber },
      ]);
    }
    setNewName("");
    setNewNumber("");
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:{" "}
        <input
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterName
        ? filteredPersons.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))
        : persons.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))}
    </div>
  );
};

export default App;
