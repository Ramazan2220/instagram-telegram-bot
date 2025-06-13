#!/usr/bin/env python3
"""
Базовый файл для тестирования модулей profile_setup
Предоставляет общие функции и выбор тестового аккаунта
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database.db_manager import init_db, get_instagram_accounts
from instagram.client import get_instagram_client

def load_working_accounts():
    """Загружает список рабочих аккаунтов из файла валидации"""
    import glob
    
    # Ищем последний файл с рабочими аккаунтами
    working_files = glob.glob("working_accounts_*.txt")
    if working_files:
        latest_file = max(working_files)
        try:
            working_ids = []
            with open(latest_file, 'r', encoding='utf-8') as f:
                for line in f:
                    if line.strip() and not line.startswith('#'):
                        account_id = line.split(':')[0]
                        if account_id.isdigit():
                            working_ids.append(int(account_id))
            return working_ids
        except Exception as e:
            print(f"⚠️ Ошибка при чтении файла рабочих аккаунтов: {e}")
    
    return []

def get_test_account():
    """Получает тестовый аккаунт из базы данных (только валидные)"""
    init_db()
    accounts = get_instagram_accounts()
    
    if not accounts:
        print("❌ Нет аккаунтов в базе данных!")
        print("Сначала добавьте аккаунт через бота.")
        return None
    
    # Пытаемся загрузить список рабочих аккаунтов
    working_ids = load_working_accounts()
    
    if working_ids:
        print(f"\n🔍 Найден список из {len(working_ids)} проверенных рабочих аккаунтов")
        # Фильтруем только рабочие аккаунты
        working_accounts = [acc for acc in accounts if acc.id in working_ids]
        
        if working_accounts:
            print("✅ Показываем только РАБОЧИЕ аккаунты:")
            accounts = working_accounts
            # Если только один рабочий аккаунт — выбираем его автоматически
            if len(accounts) == 1:
                selected_account = accounts[0]
                print(f"✅ Автоматически выбран единственный рабочий аккаунт: {selected_account.username}")
                return selected_account
        else:
            print("⚠️ Ни один из проверенных аккаунтов не найден в базе")
            print("Показываем все аккаунты")
    else:
        print("⚠️ Файл с проверенными аккаунтами не найден")
        print("Рекомендуется сначала запустить: python test_accounts_validation.py")
        
        proceed = input("Продолжить с непроверенными аккаунтами? (y/n): ").lower()
        if proceed != 'y':
            print("❌ Тестирование отменено. Сначала проверьте аккаунты.")
            return None
    
    print("\n📋 Доступные аккаунты:")
    for i, account in enumerate(accounts, 1):
        status = "✅ Проверен" if account.id in working_ids else ("✅ Активен" if account.is_active else "❌ Неактивен")
        print(f"{i}. {account.username} - {status}")
    
    while True:
        try:
            choice = input(f"\nВыберите аккаунт для тестирования (1-{len(accounts)}): ")
            account_index = int(choice) - 1
            if 0 <= account_index < len(accounts):
                selected_account = accounts[account_index]
                print(f"✅ Выбран аккаунт: {selected_account.username}")
                return selected_account
            else:
                print("❌ Неверный выбор. Попробуйте еще раз.")
        except ValueError:
            print("❌ Введите корректный номер.")
        except KeyboardInterrupt:
            print("\n🛑 Тестирование отменено.")
            return None

def test_instagram_connection(account):
    """Проверяет подключение к Instagram для аккаунта"""
    print(f"\n🔗 Проверка подключения к Instagram для {account.username}...")
    
    try:
        client = get_instagram_client(account.id)
        if client:
            print("✅ Подключение к Instagram успешно!")
            return client
        else:
            print("❌ Не удалось получить клиент Instagram.")
            return None
    except Exception as e:
        print(f"❌ Ошибка подключения: {e}")
        return None

def format_result(success, message, operation):
    """Форматирует результат операции"""
    if success:
        print(f"✅ {operation}: {message}")
    else:
        print(f"❌ {operation}: {message}")
    return success

if __name__ == "__main__":
    print("🧪 Базовый модуль для тестирования profile_setup")
    account = get_test_account()
    if account:
        client = test_instagram_connection(account)
        if client:
            print(f"🎯 Готов к тестированию с аккаунтом: {account.username}")
        else:
            print("❌ Невозможно продолжить без подключения к Instagram.") 