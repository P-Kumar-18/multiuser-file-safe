document.addEventListener('DOMContentLoaded', () => {
	
	//homepage
	if (window.location.pathname === '/') {
		const loginBtn = document.querySelector('#signin');
		const loginForm = document.querySelector('#loginForm');
		const loginRedirect = document.querySelector('#Login');
		const registerBtn = document.querySelector('#signup');
		const registerForm = document.querySelector('#registerForm');
		const registerRedirect = document.querySelector('#Register');

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

		loginRedirect.addEventListener('click', () => {
			closingForm(registerForm);
			openingForm(loginForm);
		});

		registerBtn.addEventListener('click', () => {
			closingForm(loginForm);
			openingForm(registerForm);
		});

		registerRedirect.addEventListener('click', () => {
			closingForm(loginForm);
			openingForm(registerForm);
		});
		
	}
	//dashboard
	
	if (window.location.pathname === '/dashboard') {
		const header = document.querySelector('#dashboardHeader');
		
		fetch('/userLogin')
			.then (res => res.json())
			.then (data => {
				header.textContent = `Welcome ${data.username} !!`;
			}) 
			.catch (err => {
				header.textContent = `Welcome Back!! `;
				console.error(`/userLogin was not loaded: ${err}`);
			})

	}
});
