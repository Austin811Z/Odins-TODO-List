import '../css/style.css';

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Webpack + JavaScript is working!');

    const status = document.getElementById('status');
    const button = document.getElementById('test-btn');

    if (status) {
        status.textContent = '✅ Webpack is successfully bundling JS and CSS!';
    }

    if (button) {
        button.addEventListener('click', () => {
            alert('Webpack is working perfectly! 🎉');
        });
    }
});