let users = pm.collectionVariables.get("user");

if (!users || users.length == 0) {
  users = [
    {
      full_name: "Mandy Leuschke",
      email: "M30@yahoo.com",
      password: "rG2A67XhrxsGMHx",
    },
    {
      full_name: "Clara Marquardt",
      email: "C.l@yahoo.com",
      password: "0z1zDpEgVZrs0Tq",
    },
    {
      full_name: "Marguerite Hodkiewicz",
      email: "M73@gmail.com",
      password: "rbqbmM66EFKID8d",
    },
    {
      full_name: "Judith Waelchi",
      email: "J_u34@hotmail.com",
      password: "B6rwdvTEF1jWImT",
    },
    {
      full_name: "Vanessa Hackett",
      email: "V19@hotmail.com",
      password: "nyFhVICY6XnwyIE",
    },
    {
      full_name: "Derrick Walter",
      email: "D_e@hotmail.com",
      password: "DXhNQ47xQ4posEg",
    },
    {
      full_name: "Jesse Zieme",
      email: "J_e80@yahoo.com",
      password: "hKTQwUfFe8y15QV",
    },
    {
      full_name: "Kathleen Gorczany DDS",
      email: "K_a@hotmail.com",
      password: "zhSnMuL3sjXbqnL",
    },
    {
      full_name: "Preston Glover",
      email: "P76@hotmail.com",
      password: "dAQMvZh9gCi88t9",
    },
    {
      full_name: "Becky Mitchell",
      email: "B81@hotmail.com",
      password: "cmFopv7YJTF_Uoh",
    },
    {
      full_name: "Dr. Frances Schimmel",
      email: "D.r91@hotmail.com",
      password: "A0H2I2TRNQFngtO",
    },
    {
      full_name: "Candice Bogisich",
      email: "C_a17@gmail.com",
      password: "25_Ks3e1X7SCWo9",
    },
    {
      full_name: "Mrs. Sheri Kirlin",
      email: "M_r@hotmail.com",
      password: "Wvdae1Dv4vR3hCm",
    },
    {
      full_name: "Ms. Alice Rippin",
      email: "M.s64@yahoo.com",
      password: "WD_nn98fqxQgkLF",
    },
    {
      full_name: "Gene Franecki",
      email: "G.e80@yahoo.com",
      password: "nWZbe8tx_kO31wJ",
    },
  ];
}

let currentUser = users.shift();
pm.collectionVariables.set("currentUser", currentUser);
pm.collectionVariables.set("users", users);
