// next.html
function initializeNext() {
    let selectedSeason = '';
    document.querySelectorAll('.select-box button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.select-box button').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            selectedSeason = this.getAttribute('data-season');
        });
    });
    document.querySelector('.deco-next').addEventListener('click', function() {
        if (selectedSeason) {
            const pages = {
                'spring': 'deco_spring.html',
                'summer': 'deco_summer.html',
                'autumn': 'deco_autumn.html',
                'winter': 'deco_winter.html'
            };
            
            loadPage(pages[selectedSeason], function() {
                console.log('페이지 로드 완료:', selectedSeason);
            });
        } else {
            alert('계절을 선택해주세요.');
        }
    });
}
// deco.html
function initializeDeco() {

    const svgContainer = document.getElementById('svgContainer');
    const svgPalette = document.getElementById('svgPalette');
    const completeButton = document.getElementById('completeButton');
    const saveButton = document.getElementById('saveButton');
    const shareButton = document.getElementById('shareButton');
    const colorOptions = document.getElementById('colorOptions');
    const fistButton = document.getElementById('fistButton');

    const decoTitle = document.querySelectorAll('.deco-title');
    const weSolevkContainer = document.querySelector('.we-solvek');
    const lastTxt = document.querySelector('.last-txt');
    const btnList = document.querySelector('.btn-list');

    let draggingElement = null;
    let offset = { x: 0, y: 0 };
    let currentScale = 1;
    let startDistance = 0;
    let isCompleted = false;

    // 배경색 변경 함수
    function changeBackgroundColor(color) {
        svgContainer.style.backgroundColor = color;
    }

    // 색상 옵션 이벤트 리스너
    colorOptions.addEventListener('click', (e) => {
        if (e.target.classList.contains('colorOption')) {
            const color = e.target.getAttribute('data-color');
            changeBackgroundColor(color);
        }
    });

    function handleDragStart(e) {
        if (e.target.closest('.draggable')) {
            draggingElement = e.target.closest('.draggable');
            const rect = draggingElement.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);

            offset = {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        }
    }

    function handleDragMove(e) {
        if (draggingElement) {
            e.preventDefault(); // Prevent scrolling on mobile
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);

            const containerRect = svgContainer.getBoundingClientRect();
            let x = clientX - containerRect.left - offset.x;
            let y = clientY - containerRect.top - offset.y;

            // Get the dimensions of the dragging element
            const elementRect = draggingElement.getBoundingClientRect();
            const elementWidth = elementRect.width;
            const elementHeight = elementRect.height;

            // Constrain the position within the container
            x = Math.max(0, Math.min(x, containerRect.width - elementWidth));
            y = Math.max(0, Math.min(y, containerRect.height - elementHeight));

            draggingElement.style.left = `${x}px`;
            draggingElement.style.top = `${y}px`;
        }
    }

    function handleDragMove(e) {
        if (draggingElement) {
            e.preventDefault(); // Prevent scrolling on mobile
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);

            const containerRect = svgContainer.getBoundingClientRect();
            let x = clientX - containerRect.left - offset.x;
            let y = clientY - containerRect.top - offset.y;

            // Get the dimensions of the dragging element
            const elementRect = draggingElement.getBoundingClientRect();
            const elementWidth = elementRect.width;
            const elementHeight = elementRect.height;

            // Constrain the position within the container
            x = Math.max(0, Math.min(x, containerRect.width - elementWidth));
            y = Math.max(0, Math.min(y, containerRect.height - elementHeight));

            draggingElement.style.left = `${x}px`;
            draggingElement.style.top = `${y}px`;
        }
    }


    function handleDragEnd() {
        draggingElement = null;
    }

    // 핀치 줌 시작
    function handlePinchStart(e) {
        if (e.touches.length === 2) {
            startDistance = getDistance(e.touches[0], e.touches[1]);
        }
    }

    // 핀치 줌 진행
    function handlePinchMove(e) {
        if (e.touches.length === 2) {
            const currentDistance = getDistance(e.touches[0], e.touches[1]);
            const scale = currentDistance / startDistance;

            // 스케일 제한 (예: 0.5 ~ 3)
            currentScale = Math.min(Math.max(currentScale * scale, 0.5), 3);

            // 선택된 SVG 요소에 스케일 적용
            if (draggingElement) {
                draggingElement.style.transform = `scale(${currentScale})`;
            }

            startDistance = currentDistance;
        }
    }

    // 두 터치 포인트 사이의 거리 계산
    function getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Mouse events
    svgContainer.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);

    // Touch events
    svgContainer.addEventListener('touchstart', handleDragStart, { passive: false });
    document.addEventListener('touchmove', handleDragMove, { passive: false });
    document.addEventListener('touchend', handleDragEnd);

    // 핀치 줌 이벤트
    svgContainer.addEventListener('touchstart', handlePinchStart, { passive: false });
    svgContainer.addEventListener('touchmove', handlePinchMove, { passive: false });



    // Mouse events
    svgContainer.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);

    // Touch events
    svgContainer.addEventListener('touchstart', handleDragStart, { passive: false });
    document.addEventListener('touchmove', handleDragMove, { passive: false });
    document.addEventListener('touchend', handleDragEnd);

    function svgToPng(svgElement, width, height) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            // SVG를 이미지로 변환
            const svgString = new XMLSerializer().serializeToString(svgElement);
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
        });
    }

    async function generateCompositePng() {
        const canvas = document.createElement('canvas');
        canvas.width = svgContainer.offsetWidth;
        canvas.height = svgContainer.offsetHeight;
        const ctx = canvas.getContext('2d');

        // 배경색 적용
        ctx.fillStyle = svgContainer.style.backgroundColor || '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const svgs = svgContainer.getElementsByClassName('svgImage');
        for (const svgDiv of svgs) {
            const svgElement = svgDiv.querySelector('svg');
            const rect = svgDiv.getBoundingClientRect();
            const containerRect = svgContainer.getBoundingClientRect();

            // 상대적 위치 계산
            const x = rect.left - containerRect.left;
            const y = rect.top - containerRect.top;

            const pngDataUrl = await svgToPng(svgElement, svgElement.width.baseVal.value, svgElement.height.baseVal.value);
            const img = new Image();
            await new Promise((resolve) => {
                img.onload = resolve;
                img.src = pngDataUrl;
            });
            ctx.drawImage(img, x, y);
        }

        return canvas.toDataURL('image/png');
    }

    svgPalette.addEventListener('click', (e) => {
        if (e.target.closest('svg')) {
            const svgElement = e.target.closest('svg');
            const newSvg = svgElement.cloneNode(true);
            const wrapper = document.createElement('div');
            wrapper.className = 'svgImage draggable';
            wrapper.style.position = 'absolute';
            wrapper.style.left = '5.0rem'; 
            wrapper.style.top = '5.0rem'; 
            wrapper.appendChild(newSvg);
            svgContainer.appendChild(wrapper);
        }
    });

    const removeButton = document.getElementById('removeButton');

    removeButton.addEventListener('click', () => {
        if (!isCompleted) {
            const svgImages = svgContainer.querySelectorAll('.svgImage');
            svgImages.forEach((wrapper) => {
                wrapper.remove();
            });
            changeBackgroundColor('#FFFFFF'); // 배경색 초기화
        }
    });


    // 완성하기 버튼 이벤트 리스너
    completeButton.addEventListener('click', () => {
        isCompleted = true;

        // 편집 기능 비활성화
        svgContainer.removeEventListener('mousedown', handleDragStart);
        svgContainer.removeEventListener('touchstart', handleDragStart);
        svgContainer.style.height = 'calc(100% - 25rem)';
        weSolevkContainer.classList.add('open');
        lastTxt.classList.add('open');


        // decoTitle.classList.add('off');
        svgPalette.style.display = 'none';
        colorOptions.style.display = 'none';
        btnList.style.display = 'none';
        decoTitle.forEach( () => {
            decoTitle.forEach( (item) => {
                item.classList.add('off');
            });
        });

        const deco = document.querySelectorAll('.deco');
        deco.forEach((item) => {
            item.style.minHeight = '700px';
        });

        // 편집 기능 비활성화
        disableEditing();

         // Save the current SVG container state to localStorage
        const svgData = svgContainer.innerHTML;
        localStorage.setItem('savedSvg', svgData);

        // Disable editing
        disableEditing();

        // Optionally, navigate to last.html
        // window.location.href = 'last.html';
    });

    // 편집 기능 비활성화 함수
    function disableEditing() {
        svgPalette.style.pointerEvents = 'none';
        colorOptions.style.pointerEvents = 'none';
        removeButton.style.display = 'none';
        completeButton.style.display = 'none';
        saveButton.style.display = 'block';
        shareButton.style.display = 'block';
        fistButton.style.display = 'block';

        svgContainer.removeEventListener('mousedown', handleDragStart);
        svgContainer.removeEventListener('touchstart', handleDragStart);
    }

    function loadSavedSvg() {
        const savedSvg = localStorage.getItem('savedSvg');
        if (savedSvg) {
            const svgContainer = document.getElementById('svgContainer');
            svgContainer.innerHTML = savedSvg;
        }
    }
    
    // Call loadSavedSvg when last.html is loaded
    if (window.location.pathname.endsWith('last.html')) {
        loadSavedSvg();
    }

    // 저장 버튼 이벤트 리스너
    function saveLastbtn() {
        saveButton.addEventListener('click', async () => {
            if (!isCompleted) return;
            try {
                const pngDataUrl = await generateCompositePng();
                const link = document.createElement('a');
                link.href = pngDataUrl;
                link.download = 'composed_image.png';
                link.click();
            } catch (error) {
                console.error('Error saving PNG:', error);
                alert('PNG 저장 중 오류가 발생했습니다.');
            }
        });
    
    // 공유 버튼 이벤트 리스너
    shareButton.addEventListener('click', async () => {
        if (!isCompleted) return;
        try {
            const pngDataUrl = await generateCompositePng();
            const blob = await (await fetch(pngDataUrl)).blob();
            const file = new File([blob], 'composed_image.png', { type: 'image/png' });

            if (navigator.share) {
                navigator.share({
                    files: [file],
                    title: 'Composed Image',
                    text: 'Check out my composed image!'
                }).then(() => console.log('Shared successfully'))
                    .catch((error) => console.log('Error sharing:', error));
            } else {
                alert('Web Share API is not supported in your browser.');
            }
        } catch (error) {
            console.error('Error sharing PNG:', error);
            alert('PNG 공유 중 오류가 발생했습니다.');
        }
    });
    }
    saveLastbtn();
    // // 초기 버튼 상태 설정
    // saveButton.style.display = 'none';
    // shareButton.style.display = 'none';

    // 초기 배경색 설정
    changeBackgroundColor('#FFFFFF');
}

