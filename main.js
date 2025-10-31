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

        case 'start':
            newContent = `
                <div class="start-container">
                    <img src="ArtAsset/Start/StartBackground.png" alt="背景" class="start-background">
                    <img src="ArtAsset/Start/StartTitle.png" alt="标题" class="start-title floating">
                    <img src="ArtAsset/Start/StartButton.png" alt="开始按钮" class="start-button" id="startButton">
                </div>
            `;
            document.body.className = 'start-page';
        break;


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

        case 'building':
            newContent = `
                <div class="building-container">

                    <img src="ArtAsset/Building/BuildingArrow.png" class="building-arrow" id="buildingArrow">

                    <div class="building-items">

                        <div class="building-item pixiu">
                            <img src="ArtAsset/Building/BuildingPixiu.png" class="building-main">
                            <img src="ArtAsset/Building/BuildingPixiuIcon.png" class="building-icon pixiu-icon">
                        </div>

                        <div class="building-item huangdaxiansi">
                            <img src="ArtAsset/Building/BuildingHuangdaxiansi.png" class="building-main">
                            <img src="ArtAsset/Building/BuildingHuangdaxiansiIcon.png" class="building-icon huangdaxiansi-icon">
                        </div>

                        <div class="building-item sanshengtang">
                            <img src="ArtAsset/Building/BuildingSanshengtang.png" class="building-main">
                            <img src="ArtAsset/Building/BuildingSanshengtangIcon.png" class="building-icon sanshengtang-icon">
                        </div>

                        <div class="building-item shengxiang">
                            <img src="ArtAsset/Building/BuildingShengxiang.png" class="building-main">
                            <img src="ArtAsset/Building/BuildingShengxiangIcon.png" class="building-icon shengxiang-icon">
                        </div>
                    </div>
                </div>
            `;
            document.body.className = 'building-page new-cursor';
            break;

        case 'drawinglots':
            newContent = `
                <div class="drawinglots-container">
                    <img src="ArtAsset/Drawinglots/DrawinglotsYellowSpot.png" class="drawinglots-spot">
                    <img src="ArtAsset/Drawinglots/DrawinglotsLotpot.png" class="drawinglots-pot" id="drawinglotsPot">
                    <img src="ArtAsset/Drawinglots/DrawinglotsLot.png" class="drawinglots-lot" id="drawinglotsLot">
                </div>
            `;
            document.body.className = 'drawinglots-page new-cursor';
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

// Building页面功能
function initBuildingPage() {
    const buildingItems = document.querySelectorAll('.building-item');
    let clickedCount = 0;
    
    buildingItems.forEach(item => {
        item.addEventListener('click', function() {
            const icon = item.querySelector('.building-icon');
            if (!icon.classList.contains('show')) {
                icon.classList.add('show');
                clickedCount++;
                
                if (clickedCount === buildingItems.length) {
                    // 所有建筑都被点击后，3秒后自动跳转
                    setTimeout(() => {
                        navigateToPage('drawinglots');
                    }, 3000);
                }
            }
        });
    });
}

// Drawinglots页面功能
function initDrawingLotsPage() {
    const pot = document.getElementById('drawinglotsPot');
    const lot = document.getElementById('drawinglotsLot');

   if (pot) {
    // 页面初始化时触发淡入
        pot.classList.add('show');

        pot.addEventListener('click', function() {
            // 先移除再强制重绘，保证动画每次都能触发
            pot.classList.remove('shake');
            void pot.offsetWidth;   // 强制浏览器重绘
            pot.classList.add('shake');

            setTimeout(() => {
                pot.classList.remove('shake');
                lot.classList.add('show');
            }, 500);
        } 
        );
    }


    if (lot) {
        lot.addEventListener('click', function() {
            navigateToPage('interpretation');
        });
    }
}

