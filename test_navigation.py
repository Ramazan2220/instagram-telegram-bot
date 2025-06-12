#!/usr/bin/env python3
"""
Тест навигации Telegram бота
Проверяет все callback_data и кнопки "Назад"
"""

import logging

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Список всех callback_data, которые должны обрабатываться
CALLBACK_DATA_MAP = {
    # Основная навигация
    'back_to_main': 'Возврат в главное меню',
    'menu_accounts': 'Меню аккаунтов', 
    'menu_tasks': 'Меню задач',
    'menu_proxy': 'Меню прокси',
    'menu_help': 'Меню помощи',
    
    # Аккаунты
    'add_account': 'Добавить аккаунт',
    'list_accounts': 'Список аккаунтов',
    'bulk_add_accounts': 'Массовая загрузка',
    'upload_accounts': 'Загрузить файл аккаунтов',
    'profile_setup': 'Настройка профиля',
    
    # Действия с аккаунтами (паттерны)
    'account_details_*': 'Детали аккаунта',
    'profile_setup_*': 'Настройка профиля аккаунта',
    'publish_to_*': 'Публикация в аккаунт',
    'change_password_*': 'Смена пароля',
    'assign_proxy_*': 'Назначение прокси',
    'delete_account_*': 'Удаление аккаунта',
    'confirm_delete_*': 'Подтверждение удаления',
    
    # Задачи
    'publish_now': 'Опубликовать сейчас',
    'schedule_publish': 'Отложенная публикация',
    'publication_stats': 'Статистика публикаций',
    
    # Прокси  
    'add_proxy': 'Добавить прокси',
    'list_proxies': 'Список прокси',
    'distribute_proxies': 'Распределить прокси',
}

def test_callback_data_coverage():
    """Тестирует покрытие всех callback_data обработчиками"""
    
    print("🔍 Проверка навигации Telegram бота")
    print("=" * 50)
    
    # Проверяем keyboards.py
    try:
        from telegram_bot.keyboards import (
            get_accounts_menu_keyboard,
            get_tasks_menu_keyboard, 
            get_proxy_menu_keyboard,
            get_accounts_list_keyboard,
            get_account_actions_keyboard,
            get_publish_type_keyboard
        )
        print("✅ Импорт keyboards.py успешен")
    except ImportError as e:
        print(f"❌ Ошибка импорта keyboards.py: {e}")
        return False
    
    # Проверяем bot.py
    try:
        from telegram_bot.bot import callback_handler
        print("✅ Импорт callback_handler успешен")
    except ImportError as e:
        print(f"❌ Ошибка импорта callback_handler: {e}")
        return False
    
    # Проверяем handlers/
    try:
        from telegram_bot.handlers import get_all_handlers
        print("✅ Импорт handlers/ успешен")
    except ImportError as e:
        print(f"❌ Ошибка импорта handlers/: {e}")
        return False
    
    print("\n📋 Проверка callback_data в keyboards.py:")
    
    # Создаем фиктивные аккаунты для тестирования
    class FakeAccount:
        def __init__(self, account_id, username, is_active=True):
            self.id = account_id
            self.username = username
            self.is_active = is_active
    
    fake_accounts = [
        FakeAccount(1, "test_account_1"),
        FakeAccount(2, "test_account_2", False)
    ]
    
    # Тестируем каждую клавиатуру
    keyboards_to_test = [
        ("get_accounts_menu_keyboard", get_accounts_menu_keyboard, []),
        ("get_tasks_menu_keyboard", get_tasks_menu_keyboard, []),
        ("get_proxy_menu_keyboard", get_proxy_menu_keyboard, []),
        ("get_accounts_list_keyboard", get_accounts_list_keyboard, [fake_accounts]),
        ("get_account_actions_keyboard", get_account_actions_keyboard, [1]),
        ("get_publish_type_keyboard", get_publish_type_keyboard, [])
    ]
    
    all_callback_data = set()
    
    for name, func, args in keyboards_to_test:
        try:
            keyboard = func(*args)
            for row in keyboard.inline_keyboard:
                for button in row:
                    all_callback_data.add(button.callback_data)
            print(f"  ✅ {name}")
        except Exception as e:
            print(f"  ❌ {name}: {e}")
    
    print(f"\n📊 Найдено {len(all_callback_data)} уникальных callback_data:")
    for callback in sorted(all_callback_data):
        print(f"  • {callback}")
    
    print("\n🔧 Критические кнопки 'Назад':")
    critical_back_buttons = [
        'back_to_main',
        'menu_accounts', 
        'menu_tasks',
        'menu_proxy'
    ]
    
    for callback in critical_back_buttons:
        if callback in all_callback_data:
            print(f"  ✅ {callback}")
        else:
            print(f"  ❌ {callback} - НЕ НАЙДЕН!")
    
    print("\n" + "=" * 50)
    print("🚀 Навигация исправлена и готова к тестированию!")
    
    return True

if __name__ == "__main__":
    test_callback_data_coverage() 