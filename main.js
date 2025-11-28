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
    case 'instruction': initInstructionPage(); break;  // 新增的
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

  // 先清空body内容，防止旧页面残留导致闪现
  currentBody.innerHTML = '';

  // 退出动画
  currentBody.classList.add('page-transition-out');

  setTimeout(() => {
    // 加载新页面内容
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

        case 'instruction':
      newContent = `
        <div class="instruction-container">
          <img src="ArtAsset/Instruction/InstructionBackground.png" class="instruction-background">
          <img src="ArtAsset/Instruction/InstructionWelcome.png" class="instruction-welcome">
          <img src="ArtAsset/Instruction/InstructionText.png" class="instruction-text">
          <img src="ArtAsset/Instruction/InstructionHintText.png" class="instruction-hint-text">
        </div>
      `;
      document.body.className = 'instruction-page';  
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
      <img src="ArtAsset/Interpretation/InterpretationButton.png" 
           class="interpretation-button" id="interpretationButton">
      <img src="ArtAsset/Interpretation/InterpretationDownload.png" 
           class="interpretation-download" id="saveButton">
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
    // 构建完整页面内容（固定元素 + 页面特定内容）
  const fullHTML = `
    <!-- 页面顶部提示文字 -->
    <div class="page-hints-container">
      <span class="page-hint-item" id="hint-incense">Choose an incense</span>
      <span class="page-hint-item" id="hint-temple">Walk through the temple</span>
      <span class="page-hint-item" id="hint-draw">Draw your fortune</span>
      <div class="hint-divider"></div>
      <span class="page-hint-item" id="hint-poem">Read the poem</span>
      <span class="page-hint-item" id="hint-comic">Comic interpretation</span>
    </div>
    
    <!-- 全局进度条 -->
    <div class="progress-wrap">
      <div class="progress-bar" id="progressBar"></div>
    </div>
    
    <!-- 页面特定内容 -->
    ${newContent}
  `;

    // 构建完整页面内容（固定元素 + 页面特定内容）
    // 用新内容替换主体，并确保包含固定元素
  document.body.innerHTML = 
    '<!-- 页面顶部提示文字 -->' +
    '<div class="page-hints-container">' +
    '  <span class="page-hint-item" id="hint-incense">Choose an incense</span>' +
    '  <span class="page-hint-item" id="hint-temple">Walk through the temple</span>' +
    '  <span class="page-hint-item" id="hint-draw">Draw your fortune</span>' +
    '  <div class="hint-divider"></div>' +
    '  <span class="page-hint-item" id="hint-poem">Read the poem</span>' +
    '  <span class="page-hint-item" id="hint-comic">Comic interpretation</span>' +
    '</div>' +
    
    '<!-- 全局进度条 -->' +
    '<div class="progress-wrap">' +
    '  <div class="progress-bar" id="progressBar"></div>' +
    '</div>' +
    
    '<!-- 页面特定内容 -->' +
    newContent;

  // 设置进度条进度
  const progressByPage = {
    start: 14.29,
    instruction: 28.57,
    incenseoffering: 42.86,
    building: 57.14,
    drawinglots: 71.43,
    interpretation: 85.71,
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
      navigateToPage('instruction');  // 改成跳转到 instruction
      setProgress(10);  // 进度条改为10%
    });
  }
}

// Instruction 页面
function initInstructionPage() {
  const container = document.querySelector('.instruction-container');
  const welcome = document.querySelector('.instruction-welcome');
  const text = document.querySelector('.instruction-text');
  const hintText = document.querySelector('.instruction-hint-text');

  if (!container) return;

  // 初始状态设置
  welcome.style.opacity = '0';
  welcome.style.transform = 'translateY(100px)';
  text.style.opacity = '0';
  hintText.style.opacity = '0';

  // 1秒后：Welcome 图片从下往上移动并弹跳
  setTimeout(() => {
    welcome.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)'; // 弹跳缓动
    welcome.style.opacity = '1';
    welcome.style.transform = 'translateY(-50%)'; // 移动到垂直居中
  }, 1000);

  // Welcome 动画完成后：InstructionText 淡入
  setTimeout(() => {
    text.style.transition = 'opacity 1s ease-in';
    text.style.opacity = '1';
  }, 2000);

  // 3秒后：InstructionHintText 从右下角淡入
  setTimeout(() => {
    hintText.style.transition = 'opacity 0.8s ease-in';
    hintText.style.opacity = '1';
  }, 5000);

  // 点击任意位置进入下一个页面
  container.addEventListener('click', () => {
    navigateToPage('incenseoffering');
    setProgress(20);
  }, { once: true }); // 只触发一次
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
  const buildingMains = document.querySelectorAll('.building-main'); // 新增：获取所有建筑图片
  let clickedCount = 0;

  // 新增：为建筑图片添加hover放大效果
  buildingMains.forEach(main => {
    main.style.transition = 'transform 0.3s ease';
    main.addEventListener('mouseenter', () => {
      main.style.transform = 'scale(1.1)';
    });
    main.addEventListener('mouseleave', () => {
      main.style.transform = 'scale(1)';
    });
  });

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
  
  // 获取提示文字元素
  const poemHint = document.getElementById('hint-poem');
  const comicHint = document.getElementById('hint-comic');
  
  if (poemHint) poemHint.classList.add('glow');
  if (comicHint) {
    comicHint.style.display = 'inline-block'; // 确保显示
    comicHint.classList.remove('glow');       // 确保不发光
  }

  if (button) {
    button.addEventListener('click', () => {
      showMangaContent();
    });
  }
}

//Interpretation页面的漫画解读部分
function showMangaContent() {
  const container = document.querySelector('.interpretation-container');
  const result = interpretationResult;

  if (!container) return;

  // 清空容器，只保留背景
  container.innerHTML = '';

    // 切换提示文字状态："Read the poem"变暗，"Comic interpretation"发光
  const poemHint = document.getElementById('hint-poem');
  const comicHint = document.getElementById('hint-comic');

  if (poemHint) poemHint.classList.remove('glow');   // 移除发光
  if (comicHint) {
    comicHint.classList.add('glow');                  // 添加发光
  }

  // 创建漫画容器
  const mangaContainer = document.createElement('div');
  mangaContainer.className = 'manga-container';

  // 创建4张漫画图（初始都隐藏）
  for (let i = 1; i <= 4; i++) {
    const img = document.createElement('img');
    img.src = `ArtAsset/Interpretation/Interpretation${result}Manga${i}.png`;
    img.className = 'manga-item';
    img.id = `manga-${i}`; // 给每张图一个ID，方便控制
    mangaContainer.appendChild(img);
  }

  // 创建提示图（右下角）
  const hintImg = document.createElement('img');
  hintImg.src = 'ArtAsset/Interpretation/InterpretationMangaHint.png';
  hintImg.className = 'interpretation-manga-hint';
  hintImg.id = 'mangaHint';

  // 创建文字图（左下角，初始隐藏）
  const textImg = document.createElement('img');
  textImg.src = `ArtAsset/Interpretation/Interpretation${result}MangaText.png`;
  textImg.className = 'manga-text';
  textImg.style.opacity = '0'; // 初始透明

  // 创建箭头（右下角，初始隐藏）
  const arrowImg = document.createElement('img');
  arrowImg.src = 'ArtAsset/Interpretation/InterpretationArrow.png';
  arrowImg.className = 'interpretation-arrow';
  arrowImg.id = 'interpretationArrow';
  arrowImg.style.opacity = '0'; // 初始透明

  // 将所有元素添加到容器
  container.appendChild(mangaContainer);
  container.appendChild(hintImg);
  container.appendChild(textImg);
  container.appendChild(arrowImg);

  // 设置点击事件：每点击一次显示一张漫画
  let currentMangaIndex = 1; // 记录当前要显示第几张
  const totalMangas = 4;

  container.addEventListener('click', function handleClick(e) {
    // 如果还有漫画没显示
    if (currentMangaIndex <= totalMangas) {
      const mangaImg = document.getElementById(`manga-${currentMangaIndex}`);
      if (mangaImg) {
        mangaImg.classList.add('show'); // 显示当前漫画
        currentMangaIndex++;

        // 如果全部显示完了
        if (currentMangaIndex > totalMangas) {
          // 隐藏提示图
          hintImg.classList.add('hide');
          
          // 1秒后显示文字图
          setTimeout(() => {
            textImg.style.opacity = '1';
          }, 1000);

          // 2秒后显示箭头
          setTimeout(() => {
            arrowImg.style.opacity = '1';
          }, 2000);

          // 移除点击事件，防止重复触发
          container.removeEventListener('click', handleClick);
        }
      }
    }
  });

  // 箭头点击事件：跳转到Ending
  arrowImg.addEventListener('click', (e) => {
    e.stopPropagation(); // 阻止事件冒泡，避免触发container的点击
    navigateToPage('ending');
    setProgress(100);
  });
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
