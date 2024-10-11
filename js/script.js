// Função para alternar o menu
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}

// Countdown Timer
const eventDate = new Date('Nov 9, 2024 07:59:59').getTime();

const countdownTimer = setInterval(function () {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = `
    O evento começa em:<br>
        <span class="countdown-item">${days} d</span>
        <span class="countdown-item">${hours} h</span>
        <span class="countdown-item">${minutes} m</span>
        <span class="countdown-item">${seconds} s</span>
    `;

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById('countdown').innerHTML = 'O evento já começou!';
    }
}, 1000);

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Exibe o modal
const consultaButton = document.getElementById('consultaButton');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const emailInput = document.getElementById('emailInput');
const result = document.getElementById('result');
const submitButton = document.getElementById('submitButton');

consultaButton.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    clearModal(); // Limpa os dados do modal
});

// Fecha o modal ao clicar fora do conteúdo
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        clearModal(); // Limpa os dados do modal
    }
};

// Função para limpar os dados do modal
function clearModal() {
    emailInput.value = '';
    result.innerHTML = '';
    emailInput.style.display = 'block';  // Mostra o input de e-mail
    submitButton.style.display = 'block'; // Mostra o botão de consulta
}

// Função para buscar o trabalho submetido pelo e-mail
submitButton.addEventListener('click', () => {
    const emailValue = emailInput.value.trim();

    // Verifica se o e-mail está vazio
    if (emailValue === '') {
        result.innerHTML = `<p style="color: red;">Por favor, insira um e-mail.</p>`;
        return;
    }

    // Faz a requisição ao arquivo JSON externo
    fetch('js/dados.json')
        .then(response => response.json())
        .then(trabalhos => {
            const trabalho = trabalhos.find(t => t.email === emailValue);

            if (trabalho) {
                result.innerHTML = `
                    <p><strong>Título:</strong> ${trabalho.titulo}</p>
                    <p><strong>Autor:</strong> ${trabalho.autor}</p>
                    <p><strong>Situação:</strong> ${trabalho.situacao}</p>
                `;
            } else {
                result.innerHTML = `<p style="color: red;">Dados não encontrados.</p>`;
            }

            // Oculta o campo de e-mail e o botão após a consulta
            emailInput.style.display = 'none';
            submitButton.style.display = 'none';
        })
        .catch(error => {
            result.innerHTML = `<p style="color: red;">Erro ao buscar os dados. Tente novamente mais tarde.</p>`;
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
});
