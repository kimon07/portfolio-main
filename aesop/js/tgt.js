const slider = document.querySelector('.tgt-img');

/* 제품 목록 / 최근 본 제품 안내 전환 */
const together = slider?.closest('.together');
const viewButtons = together?.querySelectorAll('[data-tgt-view]');

if (viewButtons?.length) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'tgt-empty';
    emptyMessage.textContent = '아직 최근에 본 제품이 없습니다.';
    emptyMessage.hidden = true;
    emptyMessage.setAttribute('role', 'status');
    slider.after(emptyMessage);

    viewButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const showRecent = button.dataset.tgtView === 'recent';
            slider.hidden = showRecent;
            emptyMessage.hidden = !showRecent;

            viewButtons.forEach((item) => {
                const selected = item === button;
                item.setAttribute('aria-pressed', String(selected));
                item.closest('li').classList.toggle('tgt-underline', selected);
                item.closest('li').classList.toggle('tgt-color', !selected);
            });
        });
    });
}

let isDown = false;
let startX = 0;
let startScrollLeft = 0;
let moved = false;

slider.addEventListener('pointerdown', (e) => {
    isDown = true;
    moved = false;

    startX = e.clientX;
    startScrollLeft = slider.scrollLeft;

    slider.setPointerCapture(e.pointerId);
});

slider.addEventListener('pointermove', (e) => {
    if(!isDown) return;

    const moveX = e.clientX - startX;

    if(Math.abs(moveX) > 5){
        moved = true;
    }

    slider.scrollLeft = startScrollLeft - moveX;
});

slider.addEventListener('pointerup', () => {
    isDown = false;
});

slider.addEventListener('pointercancel', () => {
    isDown = false;
});

/* 드래그 후 링크가 눌리는 것 방지 */
slider.addEventListener('click', (e) => {
    if(moved){
        e.preventDefault();
    }
});
