// -------- 全局状态 --------
let currentPage = 'start';
let clickedItems = [];
let interpretationResult = '';

// -------- 启动入口 --------
document.addEventListener('DOMContentLoaded', () => {
  // 首次页面加载：确保进度条存在，然后初始化当前页
  ensureProgressBar();
  initializePage();
});

// -------- 进度条相关 --------
function ensureProgressBar() {
  // 如果进度条不存在，则插入到 body 末尾...
  if (!document.getElementById('progressBar')) {
    const progressWrap = `
      <div class="progress-wrap">
        <div class="progress-bar" id="progressBar"></div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', progressWrap);
  }
}

function setProgress(percent) {
  // 每次调用都重新获取元素，避免被吃掉了。
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = percent + '%';
  }
}

// -------- 上方提醒文字相关 --------
function showHint(text) {
  const hint = document.getElementById('pageHint');
  hint.innerText = text;
  hint.classList.add('show');
}

function hideHint() {
  const hint = document.getElementById('pageHint');
  hint.classList.remove('show');
}


// -------- 页面初始化 --------
function initializePage() {
  switch (currentPage) {
    case 'start': initStartPage(); break;
    case 'incenseoffering': initIncenseOfferingPage(); break;
    case 'building': initBuildingPage(); break;
    case 'drawinglots': initDrawingLotsPage(); break;
    case 'interpretation': initInterpretationPage(); break;
    case 'ending': initEndingPage(); break;
  }
}

// -------- 页面切换 --------
function navigateToPage(pageName) {
  const currentBody = document.body;

  // 退出动画
  currentBody.classList.add('page-transition-out');

  setTimeout(() => {
    // 加载新页面内容：先屏蔽页面，然后重新加入progress bar
    loadPageContent(pageName);

    // 页面切换时的动画
    currentBody.classList.remove('page-transition-out');
    currentBody.classList.add('page-transition-in');

    setTimeout(() => {
      currentBody.classList.remove('page-transition-in');
    }, 800);

    // 更新当前页并初始化交互
    currentPage = pageName;
    initializePage();
  }, 800);
}

// -------- 加载页面内容 --------
function loadPageContent(pageName) {
  let newContent = '';

  switch (pageName) {
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
          <img src="ArtAsset/Incenseoffering/IncenseofferingBackgroundBox.png" class="incense-box">
          <img src="ArtAsset/Incenseoffering/IncenseofferingIncense1.png" class="incense-item incense-1">
          <img src="ArtAsset/Incenseoffering/IncenseofferingIncense2.png" class="incense-item incense-2">
          <img src="ArtAsset/Incenseoffering/IncenseofferingIncense3.png" class="incense-item incense-3">
          <img src="ArtAsset/Incenseoffering/IncenseofferingArrow.png" class="incense-arrow" id="incenseArrow">
          <img src="ArtAsset/Incenseoffering/IncenseofferingHint.png" class="incense-hint" id="incenseHint">
        </div>
      `;

    //document.getElementById('pageHint').textContent = 'Click to Choose Your Incense';

      document.body.className = 'incenseoffering-page';
      break;

    case 'building':
      newContent = `
        <div class="building-container">
      
          <img src="ArtAsset/Building/BuildingHint.png" class="building-hint" id="buildingHint">
      
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

//document.getElementById('pageHint').textContent = 'Click on the Building Image to Worship';
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

//????先试试
    case 'interpretation': {
  const results = ['Daji', 'Zhongji', 'Xiaoji', 'Xiaoxiong', 'Zhongxiong', 'Daxiong'];
  const randomResult = results[Math.floor(Math.random() * results.length)];
  interpretationResult = randomResult;

  newContent = `
    <div class="interpretation-container">
      <img src="ArtAsset/Interpretation/InterpretationPaper.png" 
           class="interpretation-paper" id="interpretationPaper">
      <img src="ArtAsset/Interpretation/Interpretation${randomResult}.png" 
           class="interpretation-result" id="interpretationResult">
      <button id="saveButton" 
              style="position:absolute; top:10px; right:10px; z-index:1000;">
        Save the Result
      </button>
      <img src="ArtAsset/Interpretation/InterpretationButton.png" 
           class="interpretation-button" id="interpretationButton">
    </div>
  `;

  //document.getElementById('pageHint').textContent = 'Click to Continue';

  document.body.className = 'interpretation-page new-cursor';

  // 在 interpretation 页面渲染完成后，立刻绑定保存事件
    setTimeout(() => {
    const saveBtn = document.getElementById('saveButton');
    const paperEl = document.getElementById('interpretationPaper');
    const resultEl = document.getElementById('interpretationResult');
    if (!saveBtn || !paperEl || !resultEl) return;

    saveBtn.addEventListener('click', async function () {
        if (!resultEl.src || resultEl.src.trim() === '') {
            alert('Please Draw the lot First!');
            return;
        }

        try {
        const paperBlobUrl = await urlToBlobUrl(paperEl.src);
        const resultBlobUrl = await urlToBlobUrl(resultEl.src);

        const paperImg = await loadImage(paperBlobUrl);
        const resultImg = await loadImage(resultBlobUrl);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = paperImg.naturalWidth || paperImg.width;
        canvas.height = paperImg.naturalHeight || paperImg.height;

        ctx.drawImage(paperImg, 0, 0, canvas.width, canvas.height);

        const rw = resultImg.naturalWidth || resultImg.width;
        const rh = resultImg.naturalHeight || resultImg.height;
        const rx = Math.round((canvas.width - rw) / 2);
        const ry = Math.round((canvas.height - rh) / 2);
        ctx.drawImage(resultImg, rx, ry, rw, rh);

        canvas.toBlob(function (blob) {
            const dlUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = dlUrl;
            a.download = '签文.png';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(dlUrl);

            URL.revokeObjectURL(paperBlobUrl);
            URL.revokeObjectURL(resultBlobUrl);
        }, 'image/png');
        } catch (err) {
        console.error(err);
        alert('保存失败：请确保通过 http 方式访问，并且资源路径正确。或者直接去找小田，小田会告诉你解决办法:)');
        }
    });

    async function urlToBlobUrl(url) {
        const res = await fetch(url, { mode: 'same-origin' });
        if (!res.ok) throw new Error('资源加载失败：' + url);
        const blob = await res.blob();
        return URL.createObjectURL(blob);
    }

    function loadImage(src) {
        return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
        });
    }
    }, 100); 

  break;
}

    case 'ending':
      newContent = `
        <div class="ending-container">
          <img src="ArtAsset/Ending/EndingTitle.png" class="ending-title">
          <img src="ArtAsset/Ending/EndingReplay.png" class="ending-replay" id="endingReplay">
        </div>
      `;
      document.body.className = 'ending-page';
      break;
  }


  // 用新内容替换主体
  document.body.innerHTML = newContent;

  // 设置进度条进度
  ensureProgressBar();
  const progressByPage = {
    start: 0,
    incenseoffering: 20,
    building: 40,
    drawinglots: 60,
    interpretation: 80,
    ending: 100
  };
  setProgress(progressByPage[pageName] ?? 0);
}

// -------- 各页面功能，应该没改 --------

// Start 页面
function initStartPage() {
  const startButton = document.getElementById('startButton');
  if (startButton) {
    startButton.addEventListener('click', () => {
      navigateToPage('incenseoffering');
      
      setProgress(20);
    });
  }
}

// Incenseoffering 页面
function initIncenseOfferingPage() {
  const incenseItems = document.querySelectorAll('.incense-item');
  const incenseArrow = document.getElementById('incenseArrow');
  const incenseHint = document.getElementById('incenseHint');

  //showHint("Click to Choose");

  incenseItems.forEach(item => {
    item.addEventListener('click', () => {
      // 第一次点击时切换鼠标样式
      if (!document.body.classList.contains('new-cursor')) {
        document.body.classList.add('new-cursor');
      }
      // 点击后显示箭头
      if (incenseArrow) {
        incenseArrow.classList.add('show');
      }
      /*// 点击后显示提示文字
      if (incenseHint) {
        incenseHint.classList.add('show'); 
      }*/
    });
  });

  if (incenseArrow) {
    incenseArrow.addEventListener('click', () => {
      navigateToPage('building');
      setProgress(40);
    });
  }
}

// Building 页面
function initBuildingPage() {
  const buildingItems = document.querySelectorAll('.building-item');
  let clickedCount = 0;

  buildingItems.forEach(item => {
    item.addEventListener('click', () => {
      const icon = item.querySelector('.building-icon');
      if (icon && !icon.classList.contains('show')) {
        icon.classList.add('show');
        clickedCount++;
        // 全部点击后延时跳转
        if (clickedCount === buildingItems.length) {
          setTimeout(() => {
            navigateToPage('drawinglots');
            setProgress(60);
          }, 1000);
        }
      }
    });
  });

  const buildingArrow = document.getElementById('buildingArrow');
  if (buildingArrow) {
    buildingArrow.addEventListener('click', () => {
      // 箭头直接跳转
      navigateToPage('drawinglots');
      setProgress(60);
    });
  }
}

// Drawinglots 页面
function initDrawingLotsPage() {
  const pot = document.getElementById('drawinglotsPot');
  const lot = document.getElementById('drawinglotsLot');

  if (pot) {
    // 页面初始化时触发淡入
    pot.classList.add('show');

    pot.addEventListener('click', () => {
      // 先移除再强制重绘触发 shake
      pot.classList.remove('shake');
      void pot.offsetWidth; // 强制重绘
      pot.classList.add('shake');

      setTimeout(() => {
        pot.classList.remove('shake');
        if (lot) lot.classList.add('show');
      }, 2000);
    });
  }

  if (lot) {
    lot.addEventListener('click', () => {
      navigateToPage('interpretation');
      setProgress(80);
    });
  }
}

// Interpretation 页面
function initInterpretationPage() {
  const button = document.getElementById('interpretationButton');
  if (button) {
    button.addEventListener('click', () => {
      showMangaContent();
    });
  }
}

function showMangaContent() {
  const container = document.querySelector('.interpretation-container');
  const result = interpretationResult;

  if (!container) return;

  // 清除现有内容并加入漫画与箭头
  container.innerHTML = `
    <div class="manga-container">
      <img src="ArtAsset/Interpretation/Interpretation${result}Manga1.png" class="manga-item">
      <img src="ArtAsset/Interpretation/Interpretation${result}Manga2.png" class="manga-item">
      <img src="ArtAsset/Interpretation/Interpretation${result}Manga3.png" class="manga-item">
      <img src="ArtAsset/Interpretation/Interpretation${result}Manga4.png" class="manga-item">
    </div>
    <img src="ArtAsset/Interpretation/Interpretation${result}MangaText.png" class="manga-text">
    <img src="ArtAsset/Interpretation/InterpretationArrow.png" class="interpretation-arrow" id="interpretationArrow">
  `;

  // 添加箭头点击事件
  const arrow = document.getElementById('interpretationArrow');
  if (arrow) {
    arrow.addEventListener('click', () => {
      navigateToPage('ending');
      setProgress(100);
    });
  }
}

// Ending 页面
function initEndingPage() {
  const replayButton = document.getElementById('endingReplay');

  if (replayButton) {
    replayButton.addEventListener('click', () => {
      // 重置所有状态
      currentPage = 'start';
      clickedItems = [];
      interpretationResult = '';
      navigateToPage('start');
      setProgress(0);
    });
  }
}
