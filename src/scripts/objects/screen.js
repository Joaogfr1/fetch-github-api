const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = 
        ` 
        <div class="info">
            <img src="${user.avatarUrl}" alt="Foto de perfil do usúario"/>
                <div class="data">
                    <h1>${user.name ?? 'Não possui nome cadastrado 😓'}</h1>
                    <p>${user.bio ?? 'Não possui bio cadastrada 😓'}</p>

                    <br>

                    <p class="number"> 👥Número de seguidores: ${user.followers} </p>
                    <p class="number"> 👥Número de pessoas seguidas: ${user.following} </p>
                </div>
        </div>
        `

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens +=
            `
            <li> 
                <a href="${repo.html_url}" target="_blank">${repo.name}
                    <br><br>
                    <div class="repo-icons">
                        <span>🍴${repo.forks}</span> 
                        <span>🌟${repo.stargazers_count}</span> 
                        <span>👀${repo.watchers}</span> 
                        <span>👩‍💻${repo.language ?? 'Não possui'}</span>
                    </div>
                </a>
            </li>
            `
        )

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += 
            `
            <div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItens}</ul>
            </div>
            `
        }

        let eventsItems = '';
        user.events.forEach(events => {
            if (events.type === 'PushEvent' && events.payload.commits.length > 0) {
                const commitMessage = events.payload.commits[0]?.message || 'Sem mensagem de commit'

                eventsItems += 
                `
                <li>
                    <div class="event-title">${events.repo.name} -</div> ${commitMessage}
                </li>
                `
            } else if (events.type === 'CreateEvent') {
                eventsItems += 
                `
                <li>
                    <div class="event-title">${events.repo.name} -</div> Sem mensagem de commit 
                </li>
                `
            }
        });
    
        if (user.events.length > 0) {
            this.userProfile.innerHTML += 
            `
            <div class="events">
                <h2>Eventos</h2>
                <ul>${eventsItems}</ul>
            </div>
            `;
        }

    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export {screen}