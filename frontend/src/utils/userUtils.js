const filterUsers = (users = [], search = "", role = "all") => {
  return users.filter((user) => {
    const matchesSearch = user.username
      ?.toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesRole = role === "all" || user.role === role;

    return matchesSearch && matchesRole;
  });
};

export default filterUsers;
