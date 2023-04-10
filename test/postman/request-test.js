const users = pm.collectionVariables.get("users");

if (users && users.length > 0) {
  postman.setNextRequest("Loop Post Parameter");
} else {
  postman.setNextRequest(null);
}

pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});
