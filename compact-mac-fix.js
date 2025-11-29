// compat-mac-fix.js - Mac/Safari 自动修复补丁
(function() {
    // 检测 Mac 或 Safari
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (!isMac && !isSafari) return; // 不是 Mac/Safari 就跳过
    
    console.log('[Mac/Safari Fix] 检测到 Mac 或 Safari 浏览器，正在应用修复...');
    
    // 添加标记类名
    document.documentElement.classList.add('mac-safari-env');
    
    // 等待 DOM 加载完成
    document.addEventListener('DOMContentLoaded', function() {
        
        // 修复 1: 动态加载兼容性 CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './compat-mac-fix.css';
        link.type = 'text/css';
        document.head.appendChild(link);
        
        // 修复 2: 等待图片加载完成后再显示页面（防止布局抖动）
        document.body.style.visibility = 'hidden';
        
        const images = Array.from(document.querySelectorAll('img'));
        let loadedCount = 0;
        
        const checkAllLoaded = () => {
            loadedCount++;
            if (loadedCount >= images.length) {
                setTimeout(() => {
                    document.body.style.visibility = 'visible';
                    console.log('[Mac/Safari Fix] 所有图片加载完成，页面已显示');
                }, 200); // 稍延迟确保渲染完成
            }
        };
        
        images.forEach(img => {
            if (img.complete) {
                checkAllLoaded();
            } else {
                img.addEventListener('load', checkAllLoaded);
                img.addEventListener('error', checkAllLoaded); // 错误也计数
            }
        });
        
        // 超时保险：3 秒后强制显示
        setTimeout(() => {
            document.body.style.visibility = 'visible';
            console.log('[Mac/Safari Fix] 超时保险触发，页面已显示');
        }, 3000);
    });
})();