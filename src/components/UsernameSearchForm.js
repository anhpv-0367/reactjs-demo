import React, { useState, useCallback } from "react";

export default ({ onSearch }) => {
  const [username, setUsername] = useState("");

  const handleKeyUp = useCallback(
    e => {
      if (e.which === 13) {
        onSearch && onSearch(username);
      }
    },
    [onSearch, username]
  );

  return (
    <input
      type="text"
      onKeyUp={e => handleKeyUp(e)}
      onChange={e => setUsername(e.target.value)}
      value={username}
    />
  );
};
