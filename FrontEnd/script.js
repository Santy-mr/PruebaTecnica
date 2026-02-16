const API_URL = 'http://localhost:3000';

document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userData = {
        user: document.getElementById('user').value,
        passw: document.getElementById('passw').value,
        name: document.getElementById('name').value,
        lastName: document.getElementById('lastName').value,
        idRole: parseInt(document.getElementById('idRole').value),
        status: document.getElementById('status').value
    };

    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        
        const messageDiv = document.getElementById('message');
        messageDiv.style.display = 'block';
        
        if (response.ok) {
            messageDiv.className = 'success';
            messageDiv.textContent = result.message || 'Usuario creado exitosamente';
            document.getElementById('userForm').reset();
            loadUsers();
        } else {
            messageDiv.className = 'error';
            messageDiv.textContent = result.message || 'Error al crear usuario';
        }

        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);

    } catch (error) {
        const messageDiv = document.getElementById('message');
        messageDiv.style.display = 'block';
        messageDiv.className = 'error';
        messageDiv.textContent = 'Error de conexión con el servidor';
        console.error('Error:', error);
    }
});

async function loadUsers() {
    const usersListDiv = document.getElementById('usersList');
    usersListDiv.innerHTML = '<p class="loading">Cargando usuarios...</p>';

    try {
        const response = await fetch(`${API_URL}/`);
        const result = await response.json();

        if (result.success && result.data.length > 0) {
            let tableHTML = `
                <table class="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Rol</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            result.data.forEach(user => {
                const statusClass = user.status.toLowerCase();
                tableHTML += `
                    <tr>
                        <td>${user.idUser}</td>
                        <td>${user.user}</td>
                        <td>${user.name}</td>
                        <td>${user.lastName}</td>
                        <td>${user.roleName}</td>
                        <td><span class="status-badge status-${statusClass}">${user.status}</span></td>
                    </tr>
                `;
            });

            tableHTML += `
                    </tbody>
                </table>
            `;

            usersListDiv.innerHTML = tableHTML;
        } else {
            usersListDiv.innerHTML = '<p>No hay usuarios registrados</p>';
        }
    } catch (error) {
        usersListDiv.innerHTML = '<p class="error">Error al cargar usuarios</p>';
        console.error('Error:', error);
    }
}

loadUsers();