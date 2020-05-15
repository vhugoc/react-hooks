import React, { useState, useEffect } from 'react';
import './style.css';

function App() {

  const [repositories, setRepositories] = useState([]);
  const [user, setUser] = useState();

  async function fetchRepositories(user) {
    const response = await fetch(`https://api.github.com/users/${user}/repos`);
    const data = await response.json();
    data.length ? setRepositories(data) : alert("Este usuário não existe");
  }

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);
    document.title = `Você tem ${filtered.length} favoritos`;
  }, [repositories]);

  function handleKeyDown(e) {
    if (e.which === 13) {
      fetchRepositories(user);
    }
  }

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });
    setRepositories(newRepositories);
  }

  return (
    <>
      <div className="repositories-list">
        <div className="search-container">
          <input
            type="text"
            placeholder="Pesquisar usuário"
            onChange={event => setUser(event.target.value)}
            onKeyDown= { handleKeyDown }
          ></input>
        </div>
        <ul>
          {repositories.map(repo => (
            <li key={repo.id} onClick={() => handleFavorite(repo.id)}>
              <span>
                {repo.favorite && <span className="favorite">{repo.name}</span>}
                {!repo.favorite && <span>{repo.name}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
