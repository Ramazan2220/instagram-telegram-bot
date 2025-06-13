#!/usr/bin/env python3
"""
Тест модуля profile_setup/links_manager.py
Тестирует изменение ссылок в профиле Instagram
"""

from test_profile_setup_base import get_test_account, test_instagram_connection, format_result
from instagram.profile_manager import ProfileManager

def test_current_links(account):
    """Получает и показывает текущие ссылки профиля"""
    print(f"\n🔗 Получение текущих ссылок для {account.username}...")
    
    try:
        profile_manager = ProfileManager(account.id)
        current_link = profile_manager.get_profile_links()
        
        link_text = current_link if current_link else "Не указана"
        print(f"📋 Текущая ссылка: {link_text}")
        return current_link or ""
    except Exception as e:
        print(f"❌ Ошибка при получении ссылок профиля: {e}")
        return None

def test_update_links(account, new_link):
    """Тестирует обновление ссылки профиля"""
    print(f"\n🔄 Тестирование изменения ссылки на: '{new_link}'...")
    
    try:
        profile_manager = ProfileManager(account.id)
        success, result = profile_manager.update_profile_links(new_link)
        
        return format_result(success, result, "Изменение ссылки профиля")
    except Exception as e:
        return format_result(False, str(e), "Изменение ссылки профиля")

def test_clear_links(account):
    """Тестирует очистку ссылки профиля"""
    print(f"\n🧹 Тестирование очистки ссылки...")
    
    try:
        profile_manager = ProfileManager(account.id)
        success, result = profile_manager.update_profile_links("")
        
        return format_result(success, result, "Очистка ссылки профиля")
    except Exception as e:
        return format_result(False, str(e), "Очистка ссылки профиля")

def validate_url(url):
    """Простая валидация URL"""
    if not url:
        return True  # Пустая ссылка допустима
    
    # Убираем протокол для проверки
    clean_url = url.replace("https://", "").replace("http://", "")
    
    # Базовая проверка формата
    if "." not in clean_url:
        return False
    
    return True

def main():
    print("🧪 ТЕСТ МОДУЛЯ: profile_setup/links_manager.py")
    print("="*50)
    
    # Получаем тестовый аккаунт
    account = get_test_account()
    if not account:
        return
    
    # Проверяем подключение
    client = test_instagram_connection(account)
    if not client:
        return
    
    # Показываем текущие ссылки
    current_link = test_current_links(account)
    if current_link is None:
        return
    
    print("\n" + "="*50)
    print("🎯 ТЕСТИРОВАНИЕ ИЗМЕНЕНИЯ ССЫЛОК")
    print("="*50)
    
    # Предлагаем тестовые варианты ссылок
    test_links = [
        "example.com",
        "https://github.com/test",
        "https://www.youtube.com/channel/test",
        "t.me/testchannel", 
        ""  # Пустая ссылка для теста очистки
    ]
    
    print("\nВыберите тест:")
    print("1. Простая ссылка (example.com)")
    print("2. GitHub профиль")
    print("3. YouTube канал")
    print("4. Telegram канал")
    print("5. Очистка ссылки")
    print("6. Ввести свою ссылку")
    
    try:
        choice = input("\nВыберите тест (1-6, Enter для пропуска): ").strip()
        
        if choice == "":
            print("\n⏭️ Тест пропущен пользователем")
            return
        elif choice in ["1", "2", "3", "4", "5"]:
            test_link = test_links[int(choice) - 1]
            test_names = ["простая", "GitHub", "YouTube", "Telegram", "очистка"]
            test_name = test_names[int(choice) - 1]
        elif choice == "6":
            test_link = input("Введите ссылку для тестирования: ").strip()
            test_name = "пользовательская"
            
            # Валидация ссылки
            if not validate_url(test_link):
                print("⚠️ Внимание: Ссылка может быть невалидной")
        else:
            print("❌ Неверный выбор")
            return
        
        print(f"\n🧪 Тест: {test_name} ссылка")
        print(f"🔗 Содержимое: '{test_link}'")
        
        # Выполняем тест
        if test_update_links(account, test_link):
            print(f"\n✅ Тест УСПЕШНО - Ссылка изменена")
            
            # Проверяем результат
            print("\n🔍 Проверка изменений...")
            updated_link = test_current_links(account)
            
            if updated_link == test_link:
                print("✅ Верификация: Ссылка успешно обновлена в Instagram!")
            else:
                print(f"⚠️ Верификация:")
                print(f"   Ожидали: '{test_link}'")
                print(f"   Получили: '{updated_link}'")
            
            # Предлагаем вернуть оригинальную ссылку
            if current_link != test_link:
                restore = input(f"\n🔄 Вернуть оригинальную ссылку? (y/n): ").lower()
                if restore == 'y':
                    if test_update_links(account, current_link):
                        print("✅ Оригинальная ссылка восстановлена")
                    else:
                        print("❌ Не удалось восстановить оригинальную ссылку")
        else:
            print(f"\n❌ Тест ОШИБКА - Не удалось изменить ссылку")
            
    except ValueError:
        print("❌ Неверный ввод")
    except KeyboardInterrupt:
        print("\n🛑 Тестирование отменено")
    
    print("\n" + "="*50)
    print("🏁 ТЕСТИРОВАНИЕ ЗАВЕРШЕНО")
    print("="*50)
    
    print("\n💡 ВАЖНО:")
    print("• Instagram поддерживает только одну ссылку в профиле")
    print("• Некоторые ссылки могут требовать верификации")
    print("• Изменения могут быть не сразу видны")

if __name__ == "__main__":
    main() 