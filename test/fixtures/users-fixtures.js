const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");

const maxItems = 5;

const fixtureFile = path.normalize(
  path.join(__dirname, "../", "json", "users-seed.json")
);

const callback = (err) => {
  if (err) throw err;

  console.log(`Seed generated in "${fixtureFile}"`);
};

const users = [];

for (let i = 0; i < maxItems; i++) {
  const name = faker.name.fullName().replace("Ms.", "").replace("Mrs.", "");
  const data = {
    name,
    email: faker.internet.email(name.split(" ")[0], name.split(" ")[1]),
    password: faker.internet.password(),
  };

  users.push(data);

  console.log(data);
}

fs.writeFile(fixtureFile, JSON.stringify(users), "utf8", callback);
