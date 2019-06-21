import React from "react";
import GithubStargazerList from "../containers/GithubStargazerList";

export default ({
  username,
  loading,
  repos,
  total,
  onLoadMore,
  onSeachStargazers
}) => {
  if (!username) {
    return <div>Enter a username to search!</div>;
  }
  return (
    <div>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            {repo.name}{' '}
            <button
              onClick={() =>
                onSeachStargazers && onSeachStargazers(username, repo.name)
              }
            >
               Star: ({repo.stargazers_count})
            </button>
            <GithubStargazerList repo_name={repo.name} repo_id={repo.id} stargazers_count={repo.stargazers_count} />
          </li>
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
