import React from "react";

export default ({ username, loading, repos, total, onLoadMore }) => {
  if (!username) {
    return <div>Enter a username to search!</div>;
  }
  return (
    <div>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
      {loading && <div>Loading...</div>}
      <button
        disabled={repos.length >= total || loading}
        onClick={() => onLoadMore && onLoadMore()}
      >
        Load more ({repos.length} / {total})
      </button>
    </div>
  );
};
