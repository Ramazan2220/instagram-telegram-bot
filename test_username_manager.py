#!/usr/bin/env python3
"""
Тест модуля profile_setup/username_manager.py
Тестирует изменение имени пользователя Instagram
"""

import sys
import random
import string
from test_profile_setup_base import get_test_account, test_instagram_connection, format_result
from instagram.profile_manager import ProfileManager
from database.db_manager import get_instagram_account

def test_current_username(account):
    """Получает и показывает текущее имя пользователя"""
    print(f"\n👤 Получение текущего имени пользователя для аккаунта ID: {account.id}...")
    
    try:
        profile_manager = ProfileManager(account.id)
        profile_info = profile_manager.get_profile_info()
        
        if profile_info:
            current_username = getattr(profile_info, 'username', '') or account.username
            print(f"📋 Текущее имя пользователя: '{current_username}'")
            return current_username
        else:
            print("❌ Не удалось получить информацию о профиле")
            return None
    except Exception as e:
        print(f"❌ Ошибка при получении информации о профиле: {e}")
        return None

def test_update_username(account, new_username):
    """Тестирует обновление имени пользователя"""
    print(f"\n🔄 Тестирование изменения имени пользователя на: '{new_username}'...")
    
    try:
        profile_manager = ProfileManager(account.id)
        success, result = profile_manager.update_username(new_username)
        
        return format_result(success, result, "Изменение имени пользователя")
    except Exception as e:
        return format_result(False, str(e), "Изменение имени пользователя")

def generate_test_username(base_username, suffix_length=4):
    """Генерирует тестовое имя пользователя на основе существующего"""
    # Удаляем существующий суффикс, если есть
    if '_test' in base_username:
        base_username = base_username.split('_test')[0]
    
    # Генерируем случайный суффикс
    suffix = ''.join(random.choices(string.digits, k=suffix_length))
    
    # Создаем новое имя
    test_username = f"{base_username}_test{suffix}"
    
    # Проверяем длину (Instagram ограничивает до 30 символов)
    if len(test_username) > 30:
        # Обрезаем базовое имя, чтобы поместиться в лимит
        max_base_length = 30 - len(f"_test{suffix}")
        base_username = base_username[:max_base_length]
        test_username = f"{base_username}_test{suffix}"
    
    return test_username

def check_username_in_database(account_id, expected_username):
    """Проверяет, что username правильно сохранен в базе данных"""
    print(f"\n🗄️ Проверка базы данных...")
    
    try:
        account = get_instagram_account(account_id)
        if account:
            db_username = account.username
            print(f"📋 Username в базе данных: '{db_username}'")
            
            if db_username == expected_username:
                print("✅ Верификация БД: Username правильно сохранен в базе данных!")
                return True
            else:
                print(f"❌ Верификация БД: Ожидали '{expected_username}', в БД '{db_username}'")
                return False
        else:
            print("❌ Аккаунт не найден в базе данных")
            return False
    except Exception as e:
        print(f"❌ Ошибка при проверке базы данных: {e}")
        return False

def main():
    print("🧪 ТЕСТ МОДУЛЯ: profile_setup/username_manager.py")
    print("="*50)
    
    # Получаем тестовый аккаунт
    account = get_test_account()
    if not account:
        return
    
    # Проверяем подключение
    client = test_instagram_connection(account)
    if not client:
        return
    
    # Показываем текущее имя пользователя
    current_username = test_current_username(account)
    if current_username is None:
        return
    
    print("\n" + "="*50)
    print("🎯 ТЕСТИРОВАНИЕ ИЗМЕНЕНИЯ ИМЕНИ ПОЛЬЗОВАТЕЛЯ")
    print("="*50)
    
    print("⚠️ ВНИМАНИЕ: Изменение имени пользователя - это серьезная операция!")
    print("Instagram имеет ограничения на частоту изменения имени пользователя.")
    print("Рекомендуется тестировать осторожно.\n")
    
    print("Выберите тест:")
    print("1. Сгенерировать тестовое имя пользователя автоматически")
    print("2. Ввести свое тестовое имя пользователя")
    print("3. Полный тест (изменить + вернуть обратно)")
    
    try:
        choice = input("\nВыберите тест (1-3, Enter для пропуска): ").strip()
        
        if choice == "":
            print("\n⏭️ Тест пропущен пользователем")
            return
        elif choice == "1":
            # Генерируем тестовое имя автоматически
            test_username = generate_test_username(current_username)
            print(f"\n🧪 Тест: автоматически сгенерированное имя")
            print(f"📝 Новое имя: '{test_username}'")
            
            confirm = input(f"\n⚠️ Изменить имя пользователя с '{current_username}' на '{test_username}'? (y/n): ").lower()
            if confirm != 'y':
                print("❌ Тест отменен пользователем")
                return
            
            # Выполняем тест
            if test_update_username(account, test_username):
                print(f"\n✅ Тест УСПЕШНО - Имя пользователя изменено")
                
                # Проверяем результат
                print("\n🔍 Проверка изменений...")
                updated_username = test_current_username(account)
                
                if updated_username == test_username:
                    print("✅ Верификация: Имя пользователя успешно обновлено в Instagram!")
                    # Дополнительная проверка базы данных
                    check_username_in_database(account.id, test_username)
                else:
                    print(f"⚠️ Верификация:")
                    print(f"   Ожидали: '{test_username}'")
                    print(f"   Получили: '{updated_username}'")
                
                # Предлагаем вернуть оригинальное имя
                restore = input(f"\n🔄 Вернуть оригинальное имя '{current_username}'? (y/n): ").lower()
                if restore == 'y':
                    if test_update_username(account, current_username):
                        print("✅ Оригинальное имя пользователя восстановлено")
                    else:
                        print("❌ Не удалось восстановить оригинальное имя пользователя")
                        print(f"⚠️ Текущее имя осталось: '{test_username}'")
            else:
                print(f"\n❌ Тест ОШИБКА - Не удалось изменить имя пользователя")
        
        elif choice == "2":
            # Пользователь вводит свое имя
            test_username = input("Введите новое имя пользователя для тестирования: ").strip()
            
            if not test_username:
                print("❌ Имя пользователя не может быть пустым")
                return
            
            if len(test_username) > 30:
                print("❌ Имя пользователя слишком длинное (максимум 30 символов)")
                return
            
            print(f"\n🧪 Тест: пользовательское имя")
            print(f"📝 Новое имя: '{test_username}'")
            
            confirm = input(f"\n⚠️ Изменить имя пользователя с '{current_username}' на '{test_username}'? (y/n): ").lower()
            if confirm != 'y':
                print("❌ Тест отменен пользователем")
                return
            
            # Выполняем тест
            if test_update_username(account, test_username):
                print(f"\n✅ Тест УСПЕШНО - Имя пользователя изменено")
                
                # Проверяем результат
                print("\n🔍 Проверка изменений...")
                updated_username = test_current_username(account)
                
                if updated_username == test_username:
                    print("✅ Верификация: Имя пользователя успешно обновлено в Instagram!")
                    # Дополнительная проверка базы данных
                    check_username_in_database(account.id, test_username)
                else:
                    print(f"⚠️ Верификация:")
                    print(f"   Ожидали: '{test_username}'")
                    print(f"   Получили: '{updated_username}'")
            else:
                print(f"\n❌ Тест ОШИБКА - Не удалось изменить имя пользователя")
        
        elif choice == "3":
            # Полный тест с возвратом
            test_username = generate_test_username(current_username)
            print(f"\n🧪 Полный тест: изменение + возврат имени пользователя")
            print(f"📝 Тестовое имя: '{test_username}'")
            print(f"📝 Оригинальное имя: '{current_username}'")
            
            confirm = input(f"\n⚠️ Выполнить полный тест? (y/n): ").lower()
            if confirm != 'y':
                print("❌ Тест отменен пользователем")
                return
            
            # Этап 1: Изменяем на тестовое имя
            print("\n📝 Этап 1: Изменение на тестовое имя")
            if test_update_username(account, test_username):
                print("✅ Имя пользователя изменено на тестовое")
                
                # Этап 2: Возвращаем оригинальное имя
                print("\n🔄 Этап 2: Возврат оригинального имени")
                if test_update_username(account, current_username):
                    print("✅ Оригинальное имя пользователя восстановлено")
                    print("\n🎉 Полный тест УСПЕШНО завершен!")
                else:
                    print("❌ Не удалось восстановить оригинальное имя")
                    print(f"⚠️ Аккаунт остался с именем: '{test_username}'")
            else:
                print("❌ Не удалось изменить имя на тестовое")
        
        else:
            print("❌ Неверный выбор")
            return
            
    except ValueError:
        print("❌ Неверный ввод")
    except KeyboardInterrupt:
        print("\n🛑 Тестирование отменено")
    
    print("\n" + "="*50)
    print("🏁 ТЕСТИРОВАНИЕ ЗАВЕРШЕНО")
    print("="*50)
    
    # Финальная проверка текущего имени
    final_username = test_current_username(account)
    if final_username:
        print(f"🔍 Финальное имя пользователя: '{final_username}'")

if __name__ == "__main__":
    main() 