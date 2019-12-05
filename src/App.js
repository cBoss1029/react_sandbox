import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {

    if (users.length === 0) {
      // fetch('https://randomuser.me/api/')
      // .then(res => console.log(res))
      // .catch(err => console.log(err));
      fetchUser();

      setUsers([
        { name: "kiley" },
        { name: "cory" },
        { name: "wyatt" },
        { name: "bella" }
      ]);
      setFilteredUsers([
        { name: "kiley" },
        { name: "cory" },
        { name: "wyatt" },
        { name: "bella" }
      ]);
    };
  }, [users]);

  const renderUser = (user, index) => {
    return <p key={index}>{user.name}</p>;
  };

  const fetchUser = async () => {
    await fetch('https://randomuser.me/api/')
    .then(async res => {
      const response = await res.json();
      console.log(response);
    })
    .catch(err => console.log(err));
  }

  const handleFilter = searchVal => {
    setSearchTerm(searchVal);
    const matchedUsers = [];
    users.forEach(user => {
      if (user.name.includes(searchVal)) {
        matchedUsers.push(user);
      }
    });
    console.log(matchedUsers);
    setFilteredUsers(matchedUsers);
  };

  const clearSearch = () => {
    handleFilter("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <input
            type="text"
            onChange={e => handleFilter(e.target.value)}
            value={searchTerm}
          />
          <button type="button" onClick={clearSearch}>
            Clear
          </button>
        </div>

        <div>
          {filteredUsers && filteredUsers.map((user, index) => renderUser(user, index))}
        </div>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
