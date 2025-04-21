const loginBtn = document.querySelector('#signin');
const loginForm = document.querySelector('#loginForm');
const registerBtn = document.querySelector('#signup');
const registerForm = document.querySelector('#registerForm');

function openingForm(formValue) {
	formValue.style.display = 'block';
	
	setTimeout(() => {
	formValue.style.opacity = '1';
	}, 10)
}

function closingForm(formValue) {
	formValue.style.opacity = '0';
	
	setTimeout(() => {
	formValue.style.display = 'none';
	}, 1000)
}

loginBtn.addEventListener('click', () => {
	closingForm(registerForm);
	openingForm(loginForm);
});

registerBtn.addEventListener('click', () => {
	closingForm(loginForm);
	openingForm(registerForm);
});