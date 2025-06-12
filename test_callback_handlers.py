#!/usr/bin/env python3
"""
Тест для проверки callback handlers в Telegram боте
"""

import sys
import logging
import sys
sys.path.append('.')
from telegram_bot import handlers
from telegram_bot.keyboards import get_accounts_menu_keyboard, get_main_menu_keyboard

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def test_keyboard_imports():
    """Тест импорта клавиатур"""
    try:
        # Тестируем основные клавиатуры
        main_keyboard = get_main_menu_keyboard()
        accounts_keyboard = get_accounts_menu_keyboard()
        
        logger.info("✅ Импорт клавиатур успешен")
        logger.info(f"✅ Главное меню: {type(main_keyboard)}")
        logger.info(f"✅ Меню аккаунтов: {type(accounts_keyboard)}")
        
        return True
    except Exception as e:
        logger.error(f"❌ Ошибка импорта клавиатур: {e}")
        return False

def test_callback_handler_import():
    """Тест импорта callback_handler"""
    try:
        # Проверяем, что функция импортируется
        callback_handler = getattr(handlers, 'callback_handler', None)
        assert callable(callback_handler), "callback_handler должен быть функцией"
        
        logger.info("✅ Импорт callback_handler успешен")
        return True
    except Exception as e:
        logger.error(f"❌ Ошибка импорта callback_handler: {e}")
        return False

def test_states_import():
    """Тест импорта состояний"""
    try:
        from telegram_bot.states import (
            WAITING_ACCOUNT_INFO, WAITING_ACCOUNTS_FILE,
            WAITING_COOKIES_INFO, WAITING_NEW_PASSWORD
        )
        
        logger.info("✅ Импорт состояний успешен")
        logger.info(f"✅ WAITING_ACCOUNT_INFO: {WAITING_ACCOUNT_INFO}")
        logger.info(f"✅ WAITING_ACCOUNTS_FILE: {WAITING_ACCOUNTS_FILE}")
        
        return True
    except Exception as e:
        logger.error(f"❌ Ошибка импорта состояний: {e}")
        return False

def test_db_functions_import():
    """Тест импорта функций базы данных"""
    try:
        from database.db_manager import (
            get_instagram_accounts, delete_instagram_account,
            get_proxies, assign_proxy_to_account
        )
        
        logger.info("✅ Импорт функций БД успешен")
        return True
    except Exception as e:
        logger.error(f"❌ Ошибка импорта функций БД: {e}")
        return False

def main():
    """Основная функция теста"""
    logger.info("🚀 Запуск тестов callback handlers...")
    
    tests = [
        ("Импорт клавиатур", test_keyboard_imports),
        ("Импорт callback_handler", test_callback_handler_import),
        ("Импорт состояний", test_states_import),
        ("Импорт функций БД", test_db_functions_import),
    ]
    
    failed_tests = []
    
    for test_name, test_func in tests:
        logger.info(f"\n📋 Тест: {test_name}")
        try:
            if test_func():
                logger.info(f"✅ {test_name} - ПРОЙДЕН")
            else:
                logger.error(f"❌ {test_name} - ПРОВАЛЕН")
                failed_tests.append(test_name)
        except Exception as e:
            logger.error(f"❌ {test_name} - ОШИБКА: {e}")
            failed_tests.append(test_name)
    
    # Итоги
    logger.info(f"\n📊 РЕЗУЛЬТАТЫ ТЕСТОВ:")
    logger.info(f"✅ Успешно: {len(tests) - len(failed_tests)}/{len(tests)}")
    
    if failed_tests:
        logger.error(f"❌ Провалено: {len(failed_tests)}/{len(tests)}")
        logger.error(f"❌ Провалены тесты: {failed_tests}")
        return False
    else:
        logger.info("🎉 Все тесты пройдены успешно!")
        return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 