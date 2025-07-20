# -*- coding: utf-8 -*-

"""
Пример конфигурационного файла для Instagram Telegram Bot
Скопируйте этот файл как config.py и заполните своими данными
"""

# Telegram Bot настройки
TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"  # Получите от @BotFather
ADMIN_USER_IDS = [123456789]  # Ваш Telegram user ID

# База данных
DATABASE_URL = "sqlite:///instagram.db"  # или PostgreSQL URL

# Instagram API настройки (опционально)
INSTAGRAM_USERNAME = "your_instagram_username"
INSTAGRAM_PASSWORD = "your_instagram_password"

# Прокси настройки (опционально)
DEFAULT_PROXY = None  # или "http://user:pass@proxy.com:8080"

# Пути к файлам
ACCOUNTS_PATH = "data/accounts"
DEVICES_PATH = "devices"
MEDIA_PATH = "media"
LOGS_PATH = "data/logs"

# Настройки прогрева аккаунтов
WARMUP_SETTINGS = {
    "min_delay": 30,      # Минимальная задержка между действиями (сек)
    "max_delay": 180,     # Максимальная задержка между действиями (сек)
    "daily_limit": 100,   # Дневной лимит действий
}

# Email настройки для верификации (опционально)
EMAIL_SETTINGS = {
    "imap_server": "imap.gmail.com",
    "imap_port": 993,
    "smtp_server": "smtp.gmail.com", 
    "smtp_port": 587,
}

# API ключи (если используются)
OPENAI_API_KEY = "your_openai_api_key_here"  # Для AI функций
ANTICAPTCHA_API_KEY = "your_anticaptcha_key_here"  # Для решения капчи

# Настройки безопасности
MAX_ACCOUNTS_PER_PROXY = 5
MAX_ACTIONS_PER_HOUR = 60
BAN_PAUSE_HOURS = 48

# Режим отладки
DEBUG = False 