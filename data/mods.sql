CREATE DATABASE IF NOT EXISTS mywintercar_mods CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mywintercar_mods;

CREATE TABLE IF NOT EXISTS mods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    description TEXT,
    price VARCHAR(50),
    image VARCHAR(255),
    in_stock BOOLEAN DEFAULT TRUE,
    rating DECIMAL(2,1) DEFAULT 0.0,
    date_added DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE INDEX idx_title ON mods(title);
CREATE INDEX idx_author ON mods(author);
CREATE INDEX idx_date ON mods(date_added);

INSERT INTO mods (title, author, description, price, image, in_stock, rating, date_added) VALUES
('Realistic Winter Physics', 'FrostMods', 'Полная переработка физики скольжения. Теперь машину заносит как настоящую на льду.', 'Бесплатно', 'https://via.placeholder.com/300x200/1e3a5a/ffffff?text=Physics', TRUE, 4.8, '2025-11-15'),
('Satsuma Widebody Kit', 'TuningPro', 'Расширители арок, сплиттеры и кастомный капот для вашего Сатсумы.', '250 ₽', 'https://via.placeholder.com/300x200/4a2d4d/ffffff?text=Body+Kit', TRUE, 4.9, '2025-10-20'),
('Heavy Snowfall Overhaul', 'WeatherMan', 'Зима становится суровой: видимость падает до 5 метров, дороги заметает за минуты.', 'Бесплатно', 'https://via.placeholder.com/300x200/7a6d4d/ffffff?text=Snow', FALSE, 4.5, '2025-12-01'),
('Dashboard Computer', 'TechGear', 'Бортовой компьютер с расходом топлива, температурой масла и навигацией.', '500 ₽', 'https://via.placeholder.com/300x200/2d3748/ffffff?text=Dashboard', TRUE, 4.7, '2025-09-05');