document.getElementById('addForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('nameInput').value;
    addRecord(name);
    document.getElementById('nameInput').value = ''; // Limpiar el campo después de agregar
    displayRecords();
});

function getRecords() {
    const records = localStorage.getItem('records');
    return records ? JSON.parse(records) : [];
}

function addRecord(name) {
    const records = getRecords();
    records.push({ id: Date.now(), name });
    localStorage.setItem('records', JSON.stringify(records));
}

function deleteRecord(id) {
    if (confirm("¿Está seguro de que desea eliminar este registro?")) {
        const records = getRecords().filter(record => record.id !== id);
        localStorage.setItem('records', JSON.stringify(records));
        displayRecords();
    }
}

function editRecord(id) {
    const newName = prompt("Editar el nombre del registro:");
    if (newName) {
        const records = getRecords();
        const updatedRecords = records.map(record => {
            if (record.id === id) {
                return { ...record, name: newName };
            }
            return record;
        });
        localStorage.setItem('records', JSON.stringify(updatedRecords));
        displayRecords();
    }
}

function showRecordDetails(id) {
    const records = getRecords();
    const record = records.find(record => record.id === id);
    const detailsDiv = document.getElementById('recordDetails');
    if (record) {
        detailsDiv.innerHTML = `<h3>Detalles del Registro:</h3><p>ID: ${record.id}</p><p>Nombre: ${record.name}</p>`;
    } else {
        detailsDiv.innerHTML = "<p>Registro no encontrado.</p>";
    }
}

function searchRecord(searchText) {
    const records = getRecords();
    const filteredRecords = records.filter(record => record.name.toLowerCase().includes(searchText.toLowerCase()));
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = '';
    filteredRecords.forEach(record => {
        const li = document.createElement('li');
        li.innerHTML = `${record.name}
                        <button onclick="showRecordDetails(${record.id})">Detalles</button>
                        <button onclick="editRecord(${record.id})">Editar</button>
                        <button onclick="deleteRecord(${record.id})">Eliminar</button>`;
        itemsList.appendChild(li);
    });
}

// Mostrar registros iniciales
displayRecords();
