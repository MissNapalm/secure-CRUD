async function fetchItems() {
  const res = await fetch('http://localhost:3002/items');
  const items = await res.json();
  const ul = document.getElementById('items');
  // Handle empty state
  if (items.length === 0) {
    document.getElementById('emptyState').classList.remove('hidden');
    ul.innerHTML = '';
    return;
  }
  document.getElementById('emptyState').classList.add('hidden');
  ul.innerHTML = '';
  [...items].reverse().forEach(item => {
    const li = document.createElement('li');
    li.className = 'group bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg p-4 flex items-center justify-between transition-all duration-200';
    li.innerHTML = `<span class="text-slate-700 font-medium">${item.name}</span><div class="flex gap-2"></div>`;
    // Edit button
    const edit = document.createElement('button');
    edit.textContent = 'Edit';
    edit.className = 'px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded-md text-sm font-medium transition-all duration-200';
    edit.onclick = (e) => { e.stopPropagation(); updateItem(item.id); };
    li.querySelector('div').appendChild(edit);
    // Delete button
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.className = 'px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-md text-sm font-medium transition-all duration-200';
    del.onclick = (e) => { e.stopPropagation(); deleteItem(item.id); };
    li.querySelector('div').appendChild(del);
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