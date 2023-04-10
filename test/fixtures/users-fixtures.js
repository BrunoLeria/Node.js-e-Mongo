const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");

const maxItems = 15;

const fixtureFile = path.normalize(
  path.join(__dirname, "../", "json", "users-seed.json")
);

const callback = (err) => {
  if (err) throw err;

  console.log(`Seed generated in "${fixtureFile}"`);
};

const users = [];

for (let i = 0; i < maxItems; i++) {
  const full_name = faker.name.fullName();
  const data = {
    full_name,
    email: faker.internet.email(full_name[0], full_name[1]),
    password: faker.internet.password(),
  };

  users.push(data);

  console.log(data);
}

fs.writeFile(fixtureFile, JSON.stringify(users), "utf8", callback);
