/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  function getFullName({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
  }

  const ul = document.createElement('ul');
  let list = new DocumentFragment();

  for (let i = 0; i < friends.length; ++i) {
    const li = document.createElement('li');
    li.append(getFullName(friends[i]));
    list.append(li);
  }

  ul.append(list);
  return ul;
}
