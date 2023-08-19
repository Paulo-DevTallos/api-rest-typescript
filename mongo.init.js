// eslint-disable-next-line no-undef
db.createUser({
  roles: [
    {
      role: "readWrtie",
      db: "crud-clean-api",
    },
  ],
});
