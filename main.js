// 全局变量
let currentPage = 'start';
let clickedItems = [];
let interpretationResult = '';

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // 根据当前页面初始化相应功能
    switch(currentPage) {
        case 'start':
            initStartPage();
            break;
        case 'incenseoffering':
            initIncenseOfferingPage();
            break;
        case 'building':
            initBuildingPage();
            break;
        case 'drawinglots':
            initDrawingLotsPage();
            break;
        case 'interpretation':
            initInterpretationPage();
            break;
        case 'ending':
            initEndingPage();
            break;
    }
}

// Start页面功能
function initStartPage() {
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', function() {
            navigateToPage('incenseoffering');
        });
    }
}
