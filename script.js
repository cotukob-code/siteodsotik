// JavaScript для плавной прокрутки к секциям
// Эта функциональность уже реализована через onclick в HTML

document.addEventListener('DOMContentLoaded', function() {
    // Добавляем плавную прокрутку для всех ссылок с атрибутом scroll-to
    document.querySelectorAll('[onclick*="scrollIntoView"]').forEach(link => {
        // Уже обработано через onclick в HTML
    });
});