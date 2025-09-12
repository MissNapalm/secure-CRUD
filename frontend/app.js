async function fetchItems() {
  const res = await fetch('http://localhost:3002/items');
  const items = await res.json();
  const ul = document.getElementById('items');
  ul.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name;
    // Edit button
    const edit = document.createElement('button');
    edit.textContent = 'Edit';
    edit.onclick = (e) => { e.stopPropagation(); updateItem(item.id); };
    li.appendChild(edit);
    // Delete button
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.onclick = (e) => { e.stopPropagation(); deleteItem(item.id); };
    li.appendChild(del);
    ul.appendChild(li);
  });
}

async function createItem() {
  const name = document.getElementById('newItem').value;
  await fetch('http://localhost:3002/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  fetchItems();
}

async function updateItem(id) {
  const name = prompt('New name:');
  if (name) {
    await fetch(`http://localhost:3002/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    fetchItems();
  }
}

async function deleteItem(id) {
  await fetch(`http://localhost:3002/items/${id}`, { method: 'DELETE' });
  fetchItems();
}

fetchItems();