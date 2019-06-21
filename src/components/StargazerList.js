import React from "react";

export default ({
  loading,
  stargazers,
  onLoadMore,
  repo_id,
  repo_name,
  username,
  stargazers_count
}) => {
  return (
    <div>
      <ul>
        {stargazers[repo_id] &&
          stargazers[repo_id].data.map(stargazer => (
            <li key={stargazer.id}>{stargazer.login}</li>
          ))}
        {stargazers[repo_id] &&
        stargazers[repo_id].data.length > 0 &&
        stargazers[repo_id].data.length < stargazers_count ? (
          <button
            disabled={loading}
            onClick={() => onLoadMore && onLoadMore(username, repo_name)}
          >
            Load more
          </button>
        ) : null}
      </ul>
    </div>
  );
};
