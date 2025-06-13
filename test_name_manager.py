#!/usr/bin/env python3
"""
Тест модуля profile_setup/name_manager.py
Тестирует изменение имени профиля Instagram
"""

from test_profile_setup_base import get_test_account, test_instagram_connection, format_result
from instagram.profile_manager import ProfileManager

def test_current_name(account):
    """Получает и показывает текущее имя профиля"""
    print(f"\n📝 Получение текущего имени профиля для {account.username}...")
    
    try:
        profile_manager = ProfileManager(account.id)
        profile_info = profile_manager.get_profile_info()
        
        if profile_info:
            current_name = getattr(profile_info, 'full_name', 'Не указано')
            print(f"📋 Текущее имя профиля: '{current_name}'")
            return current_name
        else:
            print("❌ Не удалось получить информацию о профиле")
            return None
    except Exception as e:
        print(f"❌ Ошибка при получении информации о профиле: {e}")
        return None

def test_update_name(account, new_name):
    """Тестирует обновление имени профиля"""
    print(f"\n🔄 Тестирование изменения имени на: '{new_name}'...")
    
    try:
        profile_manager = ProfileManager(account.id)
        success, result = profile_manager.update_profile_name(new_name)
        
        return format_result(success, result, "Изменение имени профиля")
    except Exception as e:
        return format_result(False, str(e), "Изменение имени профиля")

def main():
    print("🧪 ТЕСТ МОДУЛЯ: profile_setup/name_manager.py")
    print("="*50)
    
    # Получаем тестовый аккаунт
    account = get_test_account()
    if not account:
        return
    
    # Проверяем подключение
    client = test_instagram_connection(account)
    if not client:
        return
    
    # Показываем текущее имя
    current_name = test_current_name(account)
    if current_name is None:
        return
    
    print("\n" + "="*50)
    print("🎯 ТЕСТИРОВАНИЕ ИЗМЕНЕНИЯ ИМЕНИ")
    print("="*50)
    
    # Тест 1: Изменение на новое имя
    test_name = input("\nВведите новое имя для тестирования (Enter для пропуска): ").strip()
    
    if test_name:
        if test_update_name(account, test_name):
            print("\n✅ Тест 1: УСПЕШНО - Имя изменено")
            
            # Проверяем результат
            print("\n🔍 Проверка изменений...")
            updated_name = test_current_name(account)
            
            if updated_name == test_name:
                print("✅ Верификация: Имя успешно обновлено в Instagram!")
            else:
                print(f"⚠️ Верификация: Ожидали '{test_name}', получили '{updated_name}'")
            
            # Предлагаем вернуть оригинальное имя (опционально)
            if current_name and current_name != test_name:
                restore = input(f"\n🔄 Вернуть оригинальное имя '{current_name}'? (y/n): ").lower()
                if restore == 'y':
                    print(f"🔄 Возвращение к оригинальному имени: '{current_name}'")
                    if test_update_name(account, current_name):
                        print("✅ Тест 2: УСПЕШНО - Имя возвращено")
                    else:
                        print("❌ Тест 2: ОШИБКА - Не удалось вернуть имя")
                else:
                    print("✅ Имя оставлено измененным")
        else:
            print("\n❌ Тест 1: ОШИБКА - Не удалось изменить имя")
    else:
        print("\n⏭️ Тест пропущен пользователем")
    
    print("\n" + "="*50)
    print("🏁 ТЕСТИРОВАНИЕ ЗАВЕРШЕНО")
    print("="*50)

if __name__ == "__main__":
    main() 