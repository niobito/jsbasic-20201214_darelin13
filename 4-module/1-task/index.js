/**
 * Генерация полного имени
 * @param {string} firstName
 * @param {string} lastName
 * @returns {string}
 */
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}

/**
 * Возвращает элемент списка
 * @param {Object} friend
 * @returns {HTMLLIElement}
 */
function createFriendElement(friend) {
  const li = document.createElement('li');
  li.append(getFullName(friend));
  return li;
}

/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  const ul = document.createElement('ul');

  friends.forEach(friend => {
    ul.append(createFriendElement(friend));
  });

  return ul;
}
