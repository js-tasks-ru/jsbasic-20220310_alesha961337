function showSalary(users, age) {
  let usersFiltred = users.filter(user => user.age <= age);
  let usersSalary = usersFiltred.map(user => `${user.name}, ${user.balance}`);
  return usersSalary.join('\n');
}