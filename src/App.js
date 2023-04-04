import { useEffect, useState } from "react"
import axios from "axios"
import personService from "./services/Persons"

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")
	const [filterName, setFilterName] = useState("")

	//  fetch initial state from server for persons
	useEffect(() => {
		personService.getAll().then((returnedPersons) => {
			setPersons(returnedPersons)
		})
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		// add new person to phonebook or update existing number
		if (persons.map((person) => person.name).includes(newName)) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				const selectedPerson = persons.find((p) => p.name === newName)
				const updatedPerson = { ...selectedPerson, number: newNumber }
				personService
					.update(selectedPerson.id, updatedPerson)
					.then((returnedPerson) =>
						setPersons(
							persons.map((person) =>
								person.id !== selectedPerson.id ? person : returnedPerson
							)
						)
					)
			}
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
			}
			personService.create(newPerson).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson))
			})
			// setPersons((prevState) => [
			// 	...prevState,
			// 	{ name: newName, number: newNumber },
			// ])
		}
		setNewName("")
		setNewNumber("")
	}

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(filterName.toLowerCase())
	)

	const handleDelete = (id) => {
		if (
			window.confirm(
				`Delete ${persons.find((person) => person.id === id).name} ?`
			)
		) {
			personService.deletePerson(id).then((returnedPerson) => {
				personService.getAll().then((allPersons) => setPersons(allPersons))
			})
		}
	}

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
					<input onChange={(e) => setNewName(e.target.value)} value={newName} />
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
							{person.name} {person.number}{" "}
							<button onClick={() => handleDelete(person.id)}>delete</button>
						</li>
				  ))
				: persons.map((person) => (
						<li key={person.name}>
							{person.name} {person.number}{" "}
							<button onClick={() => handleDelete(person.id)}>delete</button>
						</li>
				  ))}
		</div>
	)
}

export default App
