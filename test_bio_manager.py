#!/usr/bin/env python3
"""
Тест модуля profile_setup/bio_manager.py
Тестирует изменение биографии профиля Instagram
"""

from test_profile_setup_base import get_test_account, test_instagram_connection, format_result
from instagram.profile_manager import ProfileManager

def test_current_bio(account):
    """Получает и показывает текущую биографию профиля"""
    print(f"\n📝 Получение текущей биографии для {account.username}...")
    
    try:
        profile_manager = ProfileManager(account.id)
        profile_info = profile_manager.get_profile_info()
        
        if profile_info:
            current_bio = getattr(profile_info, 'biography', '') or 'Не указана'
            print(f"📋 Текущая биография: '{current_bio}'")
            return current_bio if current_bio != 'Не указана' else ''
        else:
            print("❌ Не удалось получить информацию о профиле")
            return None
    except Exception as e:
        print(f"❌ Ошибка при получении информации о профиле: {e}")
        return None

def test_update_bio(account, new_bio):
    """Тестирует обновление биографии профиля"""
    print(f"\n🔄 Тестирование изменения биографии на: '{new_bio}'...")
    
    try:
        profile_manager = ProfileManager(account.id)
        success, result = profile_manager.update_biography(new_bio)
        
        return format_result(success, result, "Изменение биографии")
    except Exception as e:
        return format_result(False, str(e), "Изменение биографии")

def test_clear_bio(account):
    """Тестирует очистку биографии профиля"""
    print(f"\n🧹 Тестирование очистки биографии...")
    
    try:
        profile_manager = ProfileManager(account.id)
        success, result = profile_manager.update_biography("")
        
        return format_result(success, result, "Очистка биографии")
    except Exception as e:
        return format_result(False, str(e), "Очистка биографии")

def main():
    print("🧪 ТЕСТ МОДУЛЯ: profile_setup/bio_manager.py")
    print("="*50)
    
    # Получаем тестовый аккаунт
    account = get_test_account()
    if not account:
        return
    
    # Проверяем подключение
    client = test_instagram_connection(account)
    if not client:
        return
    
    # Показываем текущую биографию
    current_bio = test_current_bio(account)
    if current_bio is None:
        return
    
    print("\n" + "="*50)
    print("🎯 ТЕСТИРОВАНИЕ ИЗМЕНЕНИЯ БИОГРАФИИ")
    print("="*50)
    
    # Предлагаем тестовые варианты биографии
    test_bios = [
        "🤖 Test Bio #1 | Автоматический тест",
        "✨ Creative Content Creator ✨\n📱 Digital Marketing\n🌟 Follow for more!",
        "Тестовая биография на русском языке 🇷🇺",
        ""  # Пустая биография для теста очистки
    ]
    
    print("\nВыберите тест:")
    print("1. Простая тестовая биография")
    print("2. Многострочная биография с эмодзи")
    print("3. Биография на русском языке")
    print("4. Очистка биографии")
    print("5. Ввести свою биографию")
    
    try:
        choice = input("\nВыберите тест (1-5, Enter для пропуска): ").strip()
        
        if choice == "":
            print("\n⏭️ Тест пропущен пользователем")
            return
        elif choice in ["1", "2", "3", "4"]:
            test_bio = test_bios[int(choice) - 1]
            test_name = ["простая", "многострочная", "русская", "очистка"][int(choice) - 1]
        elif choice == "5":
            test_bio = input("Введите биографию для тестирования: ")
            test_name = "пользовательская"
        else:
            print("❌ Неверный выбор")
            return
        
        print(f"\n🧪 Тест: {test_name} биография")
        print(f"📝 Содержимое: '{test_bio}'")
        
        # Выполняем тест
        if test_update_bio(account, test_bio):
            print(f"\n✅ Тест УСПЕШНО - Биография изменена")
            
            # Проверяем результат
            print("\n🔍 Проверка изменений...")
            updated_bio = test_current_bio(account)
            
            if updated_bio == test_bio:
                print("✅ Верификация: Биография успешно обновлена в Instagram!")
            else:
                print(f"⚠️ Верификация:")
                print(f"   Ожидали: '{test_bio}'")
                print(f"   Получили: '{updated_bio}'")
            
            # Предлагаем вернуть оригинальную биографию
            if current_bio != test_bio:
                restore = input(f"\n🔄 Вернуть оригинальную биографию? (y/n): ").lower()
                if restore == 'y':
                    if test_update_bio(account, current_bio):
                        print("✅ Оригинальная биография восстановлена")
                    else:
                        print("❌ Не удалось восстановить оригинальную биографию")
        else:
            print(f"\n❌ Тест ОШИБКА - Не удалось изменить биографию")
            
    except ValueError:
        print("❌ Неверный ввод")
    except KeyboardInterrupt:
        print("\n🛑 Тестирование отменено")
    
    print("\n" + "="*50)
    print("🏁 ТЕСТИРОВАНИЕ ЗАВЕРШЕНО")
    print("="*50)

if __name__ == "__main__":
    main() 