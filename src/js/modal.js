document.addEventListener('DOMContentLoaded', function () {

    // モーダルを開く関数
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        const overlay = document.querySelector('.modal-overlay');

        if (modal && overlay) {
            modal.classList.add('show');
            overlay.classList.add('show');
            document.body.classList.add('modal-open');
        }
    }

    // モーダルを閉じる関数
    function closeModal() {
        const modals = document.querySelectorAll('.modal');
        const overlay = document.querySelector('.modal-overlay');

        modals.forEach(function (modal) {
            modal.classList.remove('show');
        });

        if (overlay) {
            overlay.classList.remove('show');
        }

        document.body.classList.remove('modal-open');
    }

    // トリガーボタンにイベントリスナーを追加
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const modalId = button.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // オーバーレイと閉じるボタンで閉じる
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(function (btn) {
        btn.addEventListener('click', closeModal);
    });

    // エスケープキーで閉じる
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
