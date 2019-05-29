export default (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_NAMEINPUT":
      return {
        ...state,
        user_name: action.user_name
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.page
      };
    case "SET_PREVPAGE":
      return {
        ...state,
        page: action.page
      };
    case "SET_PAGINATEFLAG":
      return {
        ...state,
        paginate_flag: action.paginate_flag
      };
    case "SET_REPOS":
      return {
        ...state,
        repos: action.repos
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading
      };

    default:
      return state;
  }
};
