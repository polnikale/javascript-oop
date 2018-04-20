const panels = document.querySelectorAll('.panel');

const tabBar = new TabBar({
    element: document.querySelector('.tab-bar'),
    onChange: handleChange
});

function handleChange(activeTab) {
    panels.forEach(panel => {
        if (panel.id === activeTab.id) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    })
}