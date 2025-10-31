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

/// 页面导航功能
function navigateToPage(pageName) {
    const currentBody = document.body;
    
    // 添加退出动画
    currentBody.classList.add('page-transition-out');
    
    setTimeout(() => {
        // 根据目标页面加载新内容
        loadPageContent(pageName);
        currentBody.classList.remove('page-transition-out');
        currentBody.classList.add('page-transition-in');
        
        setTimeout(() => {
            currentBody.classList.remove('page-transition-in');
        }, 800);
        
        currentPage = pageName;
        initializePage();
    }, 800);
}

// 页面导航功能
function navigateToPage(pageName) {
    const currentBody = document.body;
    
    // 添加退出动画
    currentBody.classList.add('page-transition-out');
    
    setTimeout(() => {
        // 根据目标页面加载新内容
        loadPageContent(pageName);
        currentBody.classList.remove('page-transition-out');
        currentBody.classList.add('page-transition-in');
        
        setTimeout(() => {
            currentBody.classList.remove('page-transition-in');
        }, 800);
        
        currentPage = pageName;
        initializePage();
    }, 800);
}

// 加载页面内容
function loadPageContent(pageName) {
    let newContent = '';
    
    switch(pageName) {
        case 'incenseoffering':
            newContent = `
                <div class="incense-container">

                    <!-- 背景图由 CSS 控制，这里只需要容器 -->
                    <img src="ArtAsset/Incenseoffering/IncenseofferingBackgroundBox.png" 
                        class="incense-box" 
                        style="bottom: -97px; animation: slideUp 1s ease-out forwards;">
            
                    <img src="ArtAsset/Incenseoffering/IncenseofferingIncense1.png" 
                        class="incense-item incense-1" 
                        style="animation: slideUp 1s ease-out 0.3s forwards;">
            
                    <img src="ArtAsset/Incenseoffering/IncenseofferingIncense2.png" 
                        class="incense-item incense-2" 
                        style="animation: slideUp 1s ease-out 0.5s forwards;">
            
                    <img src="ArtAsset/Incenseoffering/IncenseofferingIncense3.png" 
                        class="incense-item incense-3" 
                        style="animation: slideUp 1s ease-out 0.7s forwards;">
            
                    <img src="ArtAsset/Incenseoffering/IncenseofferingArrow.png" 
                        class="incense-arrow" 
                        id="incenseArrow">
                </div>
                `;
        // 初始进入页面时保持 NormalCursor
        document.body.className = 'incenseoffering-page';
    break;
    }
    
    document.body.innerHTML = newContent;
}

// Incenseoffering页面功能
function initIncenseOfferingPage() {
    const incenseItems = document.querySelectorAll('.incense-item');
    const incenseArrow = document.getElementById('incenseArrow');

    incenseItems.forEach(item => {
        item.addEventListener('click', function() {
            // 第一次点击时切换鼠标样式
            if (!document.body.classList.contains('new-cursor')) {
                document.body.classList.add('new-cursor');
            }

            // 点击任意一支香后显示箭头
            if (incenseArrow) {
                incenseArrow.classList.add('show');
            }
        });
    });

    if (incenseArrow) {
        incenseArrow.addEventListener('click', function() {
            navigateToPage('building');
        });
    }
}
