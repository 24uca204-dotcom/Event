window.isLoggedIn = false;

// Navigation logic
window.showSection = function(sectionId, navElement = null) {
    // Hide all sections
    const sections = document.querySelectorAll('main section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Update active nav link
    if (navElement) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        navElement.classList.add('active');
    }

    // Show target section
    document.getElementById(sectionId).classList.add('active');
}

// Authentication Modal Logic
window.openAuthModal = function(type) {
    const modal = document.getElementById('auth-modal');
    modal.style.display = 'flex';
    // Trigger reflow to apply transition
    setTimeout(() => modal.classList.add('show'), 10);
    
    switchAuth(type);
}

window.closeAuthModal = function() {
    const modal = document.getElementById('auth-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

window.switchAuth = function(type) {
    if (type === 'login') {
        document.getElementById('login-container').style.display = 'block';
        document.getElementById('register-container').style.display = 'none';
    } else {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('register-container').style.display = 'block';
    }
}

// Application Modal Logic
window.openApplyForm = function(eventName, price) {
    if (!window.isLoggedIn) {
        alert("Please login to apply for events.");
        openAuthModal('login');
        return;
    }
    document.getElementById('modal-event-title').innerText = `Apply for ${eventName}`;
    document.getElementById('app-budget').value = `₹${price}`;
    
    const modal = document.getElementById('application-modal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

window.closeApplyForm = function() {
    const modal = document.getElementById('application-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.getElementById('apply-form').reset();
    }, 300);
}

window.submitApplication = function(event) {
    event.preventDefault();
    closeApplyForm();
    alert("Successfully applied! We have received your event details and will contact you shortly.");
}

// Close modals if clicked outside the content area
window.onclick = function(event) {
    const authModal = document.getElementById('auth-modal');
    const appModal = document.getElementById('application-modal');
    
    if (event.target === authModal) {
        closeAuthModal();
    }
    if (event.target === appModal) {
        closeApplyForm();
    }
}
