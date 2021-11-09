const auth = () => {
    const buttonAuth = document.querySelector('.button-auth');
    const modalAuth = document.querySelector('.modal-auth');
    const closeModal = document.querySelector('.close-auth');
    const logInForm = document.getElementById('logInForm');
    const inputLogin = document.getElementById('login');
    const inputPassword = document.getElementById('password');
    const buttonOut = document.querySelector('.button-out');
    const userName = document.querySelector('.user-name');
    const buttonCart = document.querySelector('.button-cart');

    const login = (user) => {
        buttonAuth.style.display = 'none';
        buttonOut.style.display = 'block';
        userName.style.display = 'block';
        userName.textContent = user.login;
        modalAuth.classList.remove('is-open');
        buttonCart.classList.add('is-open');
    }
    const logout = (user) => {
        buttonAuth.style.display = 'block';
        buttonOut.style.display = 'none';
        userName.style.display = 'none';
        userName.textContent = '';
        localStorage.removeItem('user');
        buttonCart.classList.remove('is-open');
    }


    buttonAuth.addEventListener('click', function (){
        modalAuth.classList.add('is-open');
    })
    document.addEventListener('click', (e)=> {
        if ((e.target.classList.contains('close-auth')) ||(e.target === modalAuth) ) {
            modalAuth.classList.remove('is-open');
        }
    })
    logInForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const user = {
            login: inputLogin.value,
            password: inputPassword.value
        }
        if (inputLogin.value.length <= 2) {
            alert('Input login please');
            return false;
        }
        else {
            localStorage.setItem('user', JSON.stringify(user));
            login(user);
        }

    })
    buttonOut.addEventListener('click', () => {
        logout();
    })
    if (localStorage.getItem('user')) {
        login(JSON.parse(localStorage.getItem('user')));
    }

}

auth()
