function makeFriendsList(friends) {
  let friendsUl = document.createElement('ul');
  for (let friend of friends) {
    let friendsLi = document.createElement('li');
    friendsLi.append(`${friend.firstName} ${friend.lastName}`);
    friendsUl.append(friendsLi); 
  }
  return friendsUl;
}