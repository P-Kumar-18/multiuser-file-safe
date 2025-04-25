document.addEventListener('DOMContentLoaded', () => {
	
	
	
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
