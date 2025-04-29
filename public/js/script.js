document.addEventListener('DOMContentLoaded', () => {
	
	//dashboard
	
	if(window.location.pathname === '/dashboard') {
		const header = document.querySelector('#dashboardHeader');
		const addFile = document.querySelector('#addFile');
		const closeForm = document.querySelector('#closeForm');
		const addFileForm = document.querySelector('.addingFiles');
		const logoutBtn = document.querySelector('#logout');
		const listOfFiles = document.querySelector('#listOfFiles');
		
		fetch('/userLogin')
			.then(res => res.json())
			.then(data => {
				header.textContent = `Welcome ${data.username} !!`;
			}) 
			.catch (err => {
				header.textContent = `Welcome Back!! `;
				console.error(`/userLogin was not loaded: ${err}`);
			})
		
		addFile.addEventListener('click', () => {
			addFileForm.style.display = 'block';
			setTimeout(() => {
				addFileForm.style.opacity = '1';
			}, 10);
		});
		
		closeForm.addEventListener('click', (e) => {
			e.preventDefault();
			addFileForm.style.opacity = '0';
			setTimeout(() => {
				addFileForm.style.display = 'none';
			}, 1000);
		});
		
		logoutBtn.addEventListener('click', () => {
			window.location.href = '/logout';
		});
		
		fetch('/userFiles')
			.then(res => res.json())
			.then(fileNames => {
				fileNames.forEach(file => {
					const li = document.createElement('li');
					
					li.textContent = file;
					listOfFiles.appendChild(li);
				});
			})
			.catch(err => console.error(`Error adding files to list: ${err}`));
	}
});
